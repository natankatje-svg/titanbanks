#!/usr/bin/env python3
"""
Telegram → Claude Code bridge daemon.

Polls Telegram every POLL_INTERVAL seconds. Each new message from the
allowed chat triggers a headless `claude -p` invocation with project CWD.
The reply is posted back to Telegram, chunked if > 4000 chars.

Run:
    python scripts/tg-bridge.py           # foreground
    nohup python scripts/tg-bridge.py &   # background (Unix)
    pythonw scripts/tg-bridge.py          # detached (Windows)

Stop:
    Ctrl+C, or send "/stop" via Telegram.
"""
from __future__ import annotations

import json
import os
import shutil
import signal
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

# ─────────────────────────────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────────────────────────────
BOT_TOKEN = os.environ.get(
    "TG_BOT_TOKEN",
    "8659987983:AAHPzsL9OiQxQfH4lvRzwc7utk7L-PqF8jI",
)
ALLOWED_CHAT_ID = int(os.environ.get("TG_ALLOWED_CHAT_ID", "715863505"))
POLL_INTERVAL = float(os.environ.get("TG_POLL_INTERVAL", "5"))
CLAUDE_TIMEOUT = int(os.environ.get("TG_CLAUDE_TIMEOUT", "1800"))  # 30 min max per request

PROJECT_DIR = Path(__file__).resolve().parent.parent  # TitanBanks/
STATE_DIR = PROJECT_DIR / "scripts" / ".tg-state"
STATE_DIR.mkdir(parents=True, exist_ok=True)
OFFSET_FILE = STATE_DIR / "offset.txt"
LOG_FILE = STATE_DIR / "bridge.log"
RUNNING_FILE = STATE_DIR / "running"

TG_API = f"https://api.telegram.org/bot{BOT_TOKEN}"


def _resolve_claude_cli() -> str | None:
    """Find the claude binary, handling Windows .cmd extension and npm global bin."""
    # 1. shutil.which respects PATHEXT on Windows (.cmd/.bat/.exe)
    found = shutil.which("claude")
    if found:
        return found
    # 2. Common Windows npm-global locations
    candidates = [
        Path(os.environ.get("APPDATA", "")) / "npm" / "claude.cmd",
        Path(os.environ.get("APPDATA", "")) / "npm" / "claude.bat",
        Path(os.environ.get("USERPROFILE", "")) / "AppData" / "Roaming" / "npm" / "claude.cmd",
        Path("C:/Users") / os.environ.get("USERNAME", "") / "AppData/Roaming/npm/claude.cmd",
    ]
    for c in candidates:
        if c.is_file():
            return str(c)
    return None


CLAUDE_BIN = _resolve_claude_cli()

# ─────────────────────────────────────────────────────────────────────
# Logging
# ─────────────────────────────────────────────────────────────────────
def log(msg: str) -> None:
    line = f"[{datetime.now().isoformat(timespec='seconds')}] {msg}"
    print(line, flush=True)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


# ─────────────────────────────────────────────────────────────────────
# Telegram API
# ─────────────────────────────────────────────────────────────────────
def tg_request(method: str, params: dict | None = None, timeout: int = 35) -> dict:
    data = urllib.parse.urlencode(params or {}).encode("utf-8")
    url = f"{TG_API}/{method}"
    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def get_updates(offset: int) -> list:
    """Long-poll Telegram for new messages."""
    res = tg_request("getUpdates", {"offset": offset, "timeout": 25}, timeout=30)
    if not res.get("ok"):
        log(f"getUpdates err: {res}")
        return []
    return res["result"]


def send_message(text: str, reply_to: int | None = None, parse_mode: str = "") -> None:
    """Send a Telegram message, chunking if needed."""
    MAX = 3800
    chunks = [text[i : i + MAX] for i in range(0, len(text), MAX)] or [""]
    for i, chunk in enumerate(chunks):
        params = {"chat_id": ALLOWED_CHAT_ID, "text": chunk}
        if parse_mode:
            params["parse_mode"] = parse_mode
        if reply_to and i == 0:
            params["reply_to_message_id"] = str(reply_to)
        try:
            res = tg_request("sendMessage", params)
            if not res.get("ok"):
                log(f"sendMessage err: {res}")
        except Exception as e:
            log(f"sendMessage exception: {e}")


# ─────────────────────────────────────────────────────────────────────
# Offset persistence
# ─────────────────────────────────────────────────────────────────────
def read_offset() -> int:
    if not OFFSET_FILE.exists():
        return 0
    try:
        return int(OFFSET_FILE.read_text().strip())
    except Exception:
        return 0


def save_offset(offset: int) -> None:
    OFFSET_FILE.write_text(str(offset))


# ─────────────────────────────────────────────────────────────────────
# Claude invocation
# ─────────────────────────────────────────────────────────────────────
def run_claude(prompt: str) -> tuple[str, int]:
    """Invoke claude -p with project CWD. Returns (stdout, exit_code)."""
    if not CLAUDE_BIN:
        return (
            "❌ `claude` CLI niet gevonden. Probeer in terminal: `where claude`. "
            "Verwacht in `%APPDATA%\\npm\\claude.cmd`.",
            127,
        )
    cmd = [
        CLAUDE_BIN,
        "-p",
        "--continue",
        "--permission-mode",
        "bypassPermissions",
        "--max-budget-usd",
        "5",
        "--output-format",
        "text",
        prompt,
    ]
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(PROJECT_DIR),
            capture_output=True,
            text=True,
            timeout=CLAUDE_TIMEOUT,
            encoding="utf-8",
            errors="replace",
            # On Windows, .cmd files require shell-style invocation. shutil.which
            # already returns the correct path, but subprocess.run() on Windows
            # handles .cmd transparently when the path has .cmd extension.
        )
        return proc.stdout.strip() or proc.stderr.strip(), proc.returncode
    except subprocess.TimeoutExpired:
        return f"⏱ Claude timeout na {CLAUDE_TIMEOUT}s. Probeer kortere taak.", 124
    except FileNotFoundError as e:
        return f"❌ `claude` CLI niet gevonden ({CLAUDE_BIN}). Error: {e}", 127
    except Exception as e:
        return f"❌ Claude error: {e}", 1


# ─────────────────────────────────────────────────────────────────────
# Built-in commands (handled in-bridge, niet door claude)
# ─────────────────────────────────────────────────────────────────────
def handle_builtin(text: str) -> str | None:
    cmd = text.strip().lower()
    if cmd in ("/help", "help"):
        return (
            "TitanBanks Telegram Bridge\n\n"
            "Stuur normaal Nederlands. Ik geef het door aan Claude Code in de project-map.\n\n"
            "Speciaal:\n"
            "/status — wat staat er nu live + welke files recent gewijzigd\n"
            "/log — laatste 10 regels uit bridge.log\n"
            "/stop — bridge stoppen (handmatig herstarten nodig)\n"
            "/help — deze tekst"
        )
    if cmd == "/status":
        try:
            r = subprocess.run(
                ["git", "log", "-3", "--oneline"],
                cwd=str(PROJECT_DIR),
                capture_output=True,
                text=True,
            )
            r2 = subprocess.run(
                ["git", "status", "--short"],
                cwd=str(PROJECT_DIR),
                capture_output=True,
                text=True,
            )
            return f"Recent commits:\n{r.stdout}\n\nWorking tree:\n{r2.stdout[:1500] or '(clean)'}"
        except Exception as e:
            return f"status error: {e}"
    if cmd == "/log":
        if not LOG_FILE.exists():
            return "Bridge.log is leeg."
        lines = LOG_FILE.read_text(encoding="utf-8").splitlines()
        return "\n".join(lines[-15:])
    if cmd == "/stop":
        log("/stop received — exiting")
        send_message("🛑 Bridge stopt. Herstart met `python scripts/tg-bridge.py`.")
        RUNNING_FILE.unlink(missing_ok=True)
        sys.exit(0)
    return None


# ─────────────────────────────────────────────────────────────────────
# Message handler
# ─────────────────────────────────────────────────────────────────────
def handle_message(msg: dict) -> None:
    from_id = msg.get("from", {}).get("id")
    if from_id != ALLOWED_CHAT_ID:
        log(f"Skip msg from non-allowed chat {from_id}")
        return
    text = (msg.get("text") or "").strip()
    if not text:
        return
    msg_id = msg.get("message_id")
    log(f"← #{msg_id}: {text[:120]}")

    # Built-in commands handled locally
    builtin = handle_builtin(text)
    if builtin is not None:
        send_message(builtin, reply_to=msg_id)
        return

    # Otherwise: forward to Claude
    send_message(f"⏳ Aan het werk…", reply_to=msg_id)
    t0 = time.time()
    reply, exit_code = run_claude(text)
    dur = time.time() - t0

    status = "✓" if exit_code == 0 else f"⚠ exit {exit_code}"
    header = f"{status}  klaar in {dur:.0f}s"
    send_message(f"{header}\n\n{reply}", reply_to=msg_id)
    log(f"→ #{msg_id}: exit={exit_code} dur={dur:.0f}s reply_len={len(reply)}")


# ─────────────────────────────────────────────────────────────────────
# Main loop
# ─────────────────────────────────────────────────────────────────────
def main() -> None:
    RUNNING_FILE.write_text(str(os.getpid()))
    log(f"Bridge gestart, pid={os.getpid()}, project={PROJECT_DIR}")
    log(f"Claude CLI: {CLAUDE_BIN or 'NOT FOUND'}")
    welcome = (
        "🤖 TitanBanks bridge is live. Stuur een instructie en Claude voert het uit.\n"
        "Type /help voor commando's."
    )
    if not CLAUDE_BIN:
        welcome += (
            "\n\n⚠ Claude CLI niet gevonden in PATH. Bridge accepteert wel berichten, "
            "maar kan niet doorzetten naar Claude tot dit is opgelost."
        )
    send_message(welcome)

    offset = read_offset()
    while True:
        try:
            updates = get_updates(offset)
            for u in updates:
                offset = u["update_id"] + 1
                save_offset(offset)
                msg = u.get("message") or u.get("edited_message") or {}
                if msg and not msg.get("from", {}).get("is_bot"):
                    handle_message(msg)
        except urllib.error.URLError as e:
            log(f"Network error: {e} — retry in {POLL_INTERVAL}s")
            time.sleep(POLL_INTERVAL)
        except KeyboardInterrupt:
            log("Interrupt — shutting down")
            send_message("🛑 Bridge gestopt (Ctrl+C).")
            break
        except Exception as e:
            log(f"Loop error: {e!r}")
            time.sleep(POLL_INTERVAL)
        # Short pause between long-polls in case server returns empty
        time.sleep(0.5)

    RUNNING_FILE.unlink(missing_ok=True)


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception as e:
        log(f"Fatal: {e!r}")
        send_message(f"🛑 Bridge crashte: {e!r}")
        sys.exit(1)
