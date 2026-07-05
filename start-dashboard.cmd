@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE_EXE%" (
  echo Bundled Codex Node.js was not found:
  echo %NODE_EXE%
  echo.
  echo Install Node.js or start this project with your own npm/pnpm setup.
  pause
  exit /b 1
)

cd /d "%PROJECT_DIR%"
"%NODE_EXE%" ".\node_modules\vite\bin\vite.js" --host 127.0.0.1
