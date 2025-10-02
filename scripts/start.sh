#!/bin/bash

# AEGIS NET Startup Script
echo "🚀 Starting AEGIS NET: Asteroid Impact Response System"
echo "=================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your configuration before running again."
    exit 1
fi

# Start services with Docker Compose
echo "🐳 Starting services with Docker Compose..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🔍 Checking service health..."

# Check MongoDB
if docker-compose exec -T mongodb mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is not responding"
fi

# Check AI Service
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ AI Service is running"
else
    echo "❌ AI Service is not responding"
fi

# Check Frontend
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend is not responding"
fi

echo ""
echo "🎉 AEGIS NET is starting up!"
echo ""
echo "📱 Application URLs:"
echo "   Main App:        http://localhost:3000"
echo "   AEGIS COMMAND:   http://localhost:3000/command"
echo "   AEGIS GUIDE:     http://localhost:3000/guide"
echo "   AI Service API:  http://localhost:8000"
echo "   API Docs:        http://localhost:8000/docs"
echo ""
echo "📊 To view logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 To stop services:"
echo "   docker-compose down"
echo ""
echo "Happy hacking! 🚀"
