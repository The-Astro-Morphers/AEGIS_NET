# 🛡️ AEGIS NET - Asteroid Impact Response System

[![NASA Space Apps Challenge 2025](https://img.shields.io/badge/NASA-Space%20Apps%202025-blue)](https://www.spaceappschallenge.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)](https://tailwindcss.com/)

> **AEGIS NET** is a dual-interface emergency response platform designed for asteroid impact scenarios, featuring real-time data visualization, AI-powered decision support, and comprehensive public safety guidance.

## 🌟 Overview

AEGIS NET (Asteroid Emergency Guidance and Information System Network) provides two distinct interfaces:

- **🛡️ AEGIS COMMAND**: Emergency Manager Dashboard with real-time monitoring, AI decision support, and resource allocation
- **👥 AEGIS GUIDE**: Public Safety Interface with personalized safety instructions, risk assessment, and multi-language support

## ✨ Key Features

### 🎯 Impact Prediction & Analysis
- **AI-powered models** predict blast radius, tsunami risk, and debris dispersion
- **Real-time trajectory tracking** using NASA JPL/CNEOS data
- **3D visualization** with React Three Fiber and WebGL fallbacks
- **Multiple impact scenarios** with time travel simulation

### 🗺️ Real-time Mapping & Visualization
- **Interactive maps** with Leaflet.js showing impact zones
- **Resource allocation** with drag-and-drop interface
- **Evacuation routes** optimized for real-time traffic
- **Emergency shelters** with live capacity tracking

### 🤖 AI-Powered Decision Support
- **Advanced AI models** for impact assessment
- **Automated recommendations** for evacuation and resource deployment
- **Machine learning predictions** for optimal response strategies
- **Real-time data analysis** from multiple NASA APIs

### 🌍 Public Safety Interface
- **Multi-language support** (English, Spanish, French)
- **Personalized safety instructions** based on location
- **Emergency contacts** and shelter information
- **Preparation guides** and evacuation procedures

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB (optional, for data persistence)

### Installation

1. **Clone the repository**
```bash
https://github.com/The-Astro-Morphers/AEGIS_NET.git
cd AEGIS_NET
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# NASA API Keys (optional)
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key

# MongoDB (optional)
MONGODB_URI=mongodb://localhost:27017/aegis-net

# Other configurations
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Start the development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nasaProject/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── asteroids/            # NASA asteroid data
│   │   ├── ai/                   # AI prediction models
│   │   ├── resources/            # Resource management
│   │   └── health/               # Health checks
│   ├── command/                  # AEGIS COMMAND interface
│   │   ├── dashboard/            # Main dashboard
│   │   ├── simulator/            # Impact simulator
│   │   ├── mitigation/           # Mitigation testing
│   │   ├── analytics/            # Data analytics
│   │   └── ai-models/            # AI model management
│   ├── guide/                    # AEGIS GUIDE interface
│   │   ├── emergency-contacts/   # Emergency contacts
│   │   ├── shelters/             # Emergency shelters
│   │   ├── preparation/          # Preparation tips
│   │   └── evacuation/           # Evacuation routes
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── 3d/                       # 3D visualization components
│   ├── ai/                       # AI-related components
│   ├── command/                  # Command interface components
│   ├── communication/            # Communication systems
│   └── ui/                       # UI components
├── lib/                          # Utility libraries
├── public/                       # Static assets
│   └── locales/                  # Internationalization files
└── python-service/               # Python backend services
    ├── main.py                   # FastAPI application
    └── requirements.txt          # Python dependencies
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **React Three Fiber** - 3D graphics with Three.js
- **Leaflet.js** - Interactive maps
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

### Backend & APIs
- **FastAPI** - Python web framework
- **MongoDB** - NoSQL database
- **NASA APIs** - Real-time space data
- **OpenStreetMap** - Map data and tiles

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Fast package manager
- **Docker** - Containerization

## 🌐 Available Scripts

```bash
# Development
pnpm dev                    # Start development server
pnpm dev:command           # Start command interface on port 3001
pnpm dev:guide             # Start guide interface on port 3002

# Production
pnpm build                 # Build for production
pnpm start                 # Start production server

# Code Quality
pnpm lint                  # Run ESLint
pnpm type-check            # Run TypeScript compiler

# Python Service
python python-service/main.py  # Start FastAPI backend
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_NASA_API_KEY` | NASA API key for asteroid data | Optional |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/aegis-net` |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3000` |

### NASA API Integration

The system integrates with multiple NASA APIs:
- **CNEOS API** - Near-Earth object data
- **JPL API** - Asteroid trajectory information
- **NASA Eyes** - Visualization data

## 📱 Mobile Responsiveness

AEGIS NET is fully responsive with:
- **Mobile-first design** using TailwindCSS
- **Touch-friendly interfaces** for emergency situations
- **Offline capabilities** for critical functions
- **Progressive Web App** features

### Mobile Navigation
- **Hamburger menus** for desktop
- **Bottom navigation** with "More" button for mobile
- **Expandable sections** for additional navigation items
- **Active state indicators** for current page

## 🌍 Internationalization

Supports multiple languages:
- 🇺🇸 English (default)
- 🇪🇸 Spanish
- 🇫🇷 French

Language files are located in `public/locales/` and can be easily extended.

## 🚨 Emergency Features

### Real-time Monitoring
- **Live asteroid tracking** with NASA data
- **Impact zone visualization** with blast radius
- **Tsunami risk assessment** for coastal areas
- **Debris dispersion modeling**

### Resource Management
- **Emergency shelter tracking** with live capacity
- **Resource allocation** with drag-and-drop
- **Evacuation route optimization** 
- **Communication system** for alerts

### Public Safety
- **Personalized risk assessment** based on location
- **Emergency contact directory** with priority levels
- **Preparation checklists** and timelines
- **Multi-language safety instructions**

## 🔒 Security & Privacy

- **No personal data collection** without consent
- **Secure API communications** with HTTPS
- **Environment variable protection** for sensitive data
- **Rate limiting** on API endpoints

## 🤝 Contributing

We welcome contributions to AEGIS NET! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use TailwindCSS for styling
- Write responsive components
- Include proper error handling
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA** for providing asteroid data APIs
- **Space Apps Challenge** for the inspiration
- **OpenStreetMap** for map data
- **Three.js** and **React Three Fiber** for 3D visualization
- **TailwindCSS** for the design system

## 📞 Support

For support, email support@aegis-net.org or join our Discord community.

## 🔮 Future Roadmap

- [ ] **Mobile app** development (React Native)
- [ ] **Real-time notifications** via WebSocket
- [ ] **Machine learning models** for improved predictions
- [ ] **Integration with emergency services** APIs
- [ ] **Voice commands** for accessibility
- [ ] **Offline mode** with service workers
- [ ] **Multi-tenant architecture** for different regions

---

**Built with ❤️ for NASA Space Apps Challenge 2025**

*Protecting Earth from asteroid impacts, one line of code at a time.*
