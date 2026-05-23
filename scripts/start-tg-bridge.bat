@echo off
REM Start TitanBanks Telegram bridge as a background process on Windows.
REM Use this to keep the bridge running after you close the terminal.

cd /d %~dp0..
echo Starting TitanBanks Telegram bridge in background...
echo Logs: scripts\.tg-state\bridge.log
echo Stop: send "/stop" via Telegram or kill the python process.
echo.

REM Use pythonw for detached process (no console window).
REM Fall back to start /B python if pythonw not available.
where pythonw >nul 2>&1
if %errorlevel%==0 (
    start "" pythonw scripts\tg-bridge.py
) else (
    start "TitanBanks TG Bridge" /MIN python scripts\tg-bridge.py
)

echo Bridge started. Check Telegram for the welcome message.
