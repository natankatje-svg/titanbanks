# Telegram → Claude Code Bridge

A small polling daemon that turns the TitanBot Telegram chat into a remote-control
interface for Claude Code running on this machine.

## How it works

1. `scripts/tg-bridge.py` long-polls Telegram for new messages.
2. For each new message from the allowed chat (`715863505`), it invokes
   `claude -p --continue --permission-mode bypassPermissions` with the message
   text as the prompt and the TitanBanks project as cwd.
3. The reply is posted back to Telegram.
4. The most-recent claude session in this directory is continued, so context
   builds up over time (same as opening Claude Code yourself).

## Start it

**Foreground (good for first test):**
```bash
cd C:/Users/natan/TitanBanks
python scripts/tg-bridge.py
```

**Background (detached, no console window):**
```cmd
scripts\start-tg-bridge.bat
```

You'll get a Telegram message: `🤖 TitanBanks bridge is live.` once it's connected.

## Stop it

- Send `/stop` via Telegram, **or**
- Close the terminal window, **or**
- Kill the `python.exe` / `pythonw.exe` process in Task Manager.

## Built-in commands

| Command | What it does |
|---|---|
| `/help` | Show the help text |
| `/status` | Recent git commits + uncommitted changes |
| `/log` | Last 15 lines of the bridge log |
| `/stop` | Stop the bridge daemon |

Everything else is passed verbatim to Claude as a prompt.

## State files

- `scripts/.tg-state/offset.txt` — Telegram update offset (so we don't reprocess)
- `scripts/.tg-state/bridge.log` — running log
- `scripts/.tg-state/running` — PID of the running daemon (deleted on clean exit)

## Auto-start on Windows boot

To have the bridge start automatically when you log in:

1. `Win + R` → `shell:startup` → press Enter
2. Right-click → New → Shortcut → browse to `C:\Users\natan\TitanBanks\scripts\start-tg-bridge.bat`
3. Name the shortcut "TitanBanks TG Bridge"

Or use Task Scheduler for more control (run at logon, restart on failure).

## Safety notes

- The bridge uses `--permission-mode bypassPermissions`, which lets Claude
  execute file edits, bash commands, deploys, etc. **without prompting**.
  Only run this on a machine you control.
- The bot token is hard-coded as a default. Override via `TG_BOT_TOKEN` env
  if you ever rotate it.
- Only messages from `ALLOWED_CHAT_ID` (715863505) are processed.
  Anyone DM'ing the bot from a different account gets silently ignored.
- Each Claude invocation has a `--max-budget-usd 5` cap as a sanity guard.
