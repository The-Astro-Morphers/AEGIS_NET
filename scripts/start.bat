@echo off
echo 🚀 Starting AEGIS NET: Asteroid Impact Response System
echo ==================================================

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo ⚠️  .env file not found. Creating from template...
    copy env.example .env
    echo 📝 Please edit .env file with your configuration before running again.
    pause
    exit /b 1
)

REM Start services with Docker Compose
echo 🐳 Starting services with Docker Compose...
docker-compose up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check service health
echo 🔍 Checking service health...

REM Check MongoDB
docker-compose exec -T mongodb mongosh --eval "db.runCommand('ping')" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB is running
) else (
    echo ❌ MongoDB is not responding
)

REM Check AI Service
curl -f http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ AI Service is running
) else (
    echo ❌ AI Service is not responding
)

REM Check Frontend
curl -f http://localhost:3000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend is running
) else (
    echo ❌ Frontend is not responding
)

echo.
echo 🎉 AEGIS NET is starting up!
echo.
echo 📱 Application URLs:
echo    Main App:        http://localhost:3000
echo    AEGIS COMMAND:   http://localhost:3000/command
echo    AEGIS GUIDE:     http://localhost:3000/guide
echo    AI Service API:  http://localhost:8000
echo    API Docs:        http://localhost:8000/docs
echo.
echo 📊 To view logs:
echo    docker-compose logs -f
echo.
echo 🛑 To stop services:
echo    docker-compose down
echo.
echo Happy hacking! 🚀
pause
