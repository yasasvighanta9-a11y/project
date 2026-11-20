@echo off
setlocal
cd /d "%~dp0"

py --version >nul 2>nul
if not errorlevel 1 (
    start "SRKR StudyMate server" cmd /k py -m http.server 8000 --bind 127.0.0.1 --directory "%~dp0"
    goto open_browser
)

python --version >nul 2>nul
if not errorlevel 1 (
    start "SRKR StudyMate server" cmd /k python -m http.server 8000 --bind 127.0.0.1 --directory "%~dp0"
    goto open_browser
)

echo Python 3 is required to start the local website.
echo Install Python 3, then double-click start.bat again.
echo Or open index.html for the features that do not need the camera.
pause
exit /b 1

:open_browser
timeout /t 2 /nobreak >nul
start "" "http://localhost:8000"
