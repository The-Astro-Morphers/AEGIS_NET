# AEGIS NET Setup Guide

## 🚀 Quick Start (Recommended)

### 1. Prerequisites
- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Git** for cloning the repository
- **Node.js 18+** (for local development)
- **Python 3.11+** (for local development)

### 2. Clone and Setup
```bash
git clone <your-repository-url>
cd nasaProject
cp env.example .env
```

### 3. Edit Environment Variables
Open `.env` file and configure:
```env
# NASA API Configuration
NASA_API_KEY=your_nasa_api_key_here

# Database Configuration  
MONGODB_URL=mongodb://admin:aegis123@localhost:27017/aegis_net?authSource=admin

# AI Service Configuration
AI_SERVICE_URL=http://localhost:8000
```

### 4. Start with Docker Compose
```bash
# Windows
scripts/start.bat

# Linux/Mac
./scripts/start.sh

# Or manually
docker-compose up -d
```

### 5. Access the Application
- **Main App**: http://localhost:3000
- **AEGIS COMMAND**: http://localhost:3000/command
- **AEGIS GUIDE**: http://localhost:3000/guide
- **AI Service API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🛠️ Local Development Setup

### 1. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
cd python-service
pip install -r requirements.txt
cd ..
```

### 2. Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name aegis-mongodb mongo:7.0

# Or install MongoDB locally
```

### 3. Start Services
```bash
# Terminal 1: Start AI Service
cd python-service
python main.py

# Terminal 2: Start Next.js
npm run dev
```

## 📱 Application Features

### AEGIS COMMAND (Emergency Managers)
- **Real-time Dashboard**: Interactive maps with impact zones
- **AI Predictions**: Blast radius, tsunami risk, debris dispersion
- **Resource Management**: Drag-and-drop allocation system
- **Evacuation Routes**: Optimized paths with traffic data
- **Risk Assessment**: Color-coded threat levels

### AEGIS GUIDE (Public Users)
- **Personalized Safety**: Location-based instructions
- **Risk Assessment**: High/Medium/Low with visual indicators
- **Multi-language**: English, Spanish, French support
- **Emergency Contacts**: Local services and family contacts
- **Evacuation Guidance**: Step-by-step instructions

## 🔧 API Endpoints

### Next.js API Routes
- `GET /api/asteroids` - Fetch asteroid data from NASA
- `GET /api/resources` - Get emergency resources
- `POST /api/ai/predictions` - Generate AI predictions
- `GET /api/health` - System health check

### FastAPI AI Service
- `POST /predict` - Generate impact predictions
- `GET /health` - Service health check
- `GET /docs` - Interactive API documentation

## 🗄️ Database Collections

### MongoDB Collections
- **asteroids**: Impact data and trajectories
- **resources**: Shelters, hospitals, evacuation centers
- **predictions**: Cached AI predictions
- **evacuation_routes**: Optimized evacuation paths
- **users**: User management (future feature)

## 🌍 Internationalization

### Supported Languages
- **English** (en) - Default
- **Spanish** (es) - Español
- **French** (fr) - Français

### Adding New Languages
1. Create new folder in `public/locales/`
2. Copy `en/common.json` structure
3. Translate all strings
4. Update `LanguageSwitcher.tsx`

## 🎨 Customization

### Color Themes
Edit `tailwind.config.js` to modify:
- Emergency colors (high/medium/low risk)
- NASA brand colors
- Component variants

### Adding New Components
1. Create component in `components/ui/`
2. Follow shadcn/ui patterns
3. Add to `tailwind.config.js` if needed
4. Export from component index

## 🚀 Deployment

### Production with Docker
```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale frontend=3
```

### Environment Variables for Production
```env
NODE_ENV=production
NASA_API_KEY=your_production_api_key
MONGODB_URL=your_production_mongodb_url
AI_SERVICE_URL=your_production_ai_service_url
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Docker Services Not Starting
```bash
# Check Docker status
docker info

# Restart Docker Desktop
# Check port conflicts
netstat -an | grep :3000
```

#### 2. MongoDB Connection Issues
```bash
# Check MongoDB container
docker-compose logs mongodb

# Test connection
docker-compose exec mongodb mongosh --eval "db.runCommand('ping')"
```

#### 3. AI Service Not Responding
```bash
# Check AI service logs
docker-compose logs ai-service

# Test endpoint
curl http://localhost:8000/health
```

#### 4. Frontend Build Errors
```bash
# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run lint
```

### Performance Optimization

#### 1. Database Indexes
```javascript
// MongoDB indexes for better performance
db.asteroids.createIndex({ "impact_time": 1 })
db.resources.createIndex({ "location": "2dsphere" })
```

#### 2. Caching
- Redis for API response caching
- Next.js image optimization
- Static generation for public pages

#### 3. Monitoring
- Health check endpoints
- Log aggregation
- Performance metrics

## 📞 Support

### Getting Help
1. Check the logs: `docker-compose logs -f`
2. Review API documentation: http://localhost:8000/docs
3. Check GitHub issues
4. Contact the development team

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🎯 Hackathon Tips

### Quick Demo Setup
1. Use mock data (no NASA API key needed)
2. Focus on UI/UX demonstrations
3. Show real-time map updates
4. Demonstrate multi-language support
5. Highlight AI prediction features

### Presentation Points
- **Real-time Impact Visualization**: Show map with blast zones
- **AI-Powered Predictions**: Demonstrate risk assessment
- **Public Safety Interface**: Show personalized guidance
- **Multi-language Support**: Switch between languages
- **Resource Management**: Drag-and-drop allocation

### Technical Highlights
- **Next.js 14** with App Router
- **FastAPI** microservice architecture
- **MongoDB** with geospatial queries
- **Leaflet.js** for interactive maps
- **Docker** containerization
- **TypeScript** for type safety

---

**Happy Hacking! 🚀**
