@echo off
echo 🚀 Starting AEGIS AI Service (Simple)
echo =====================================

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python 3.11+ or use Docker.
    echo.
    echo Alternative: Use Docker Desktop and run:
    echo   docker-compose up -d
    pause
    exit /b 1
)

REM Start the simple AI service
echo 🐍 Starting Python AI service on port 8000...
cd python-service
python simple-server.py
