# 🛰️ NASA & CSA API Integration for AEGIS NET

## 🎯 **Real Data Sources Integrated**

Your AEGIS NET project now includes integration with real NASA and Canadian Space Agency APIs:

### **Primary Data Sources:**

#### 1. **[NEOSSat (Canadian Space Agency)](https://www.asc-csa.gc.ca/eng/satellites/neossat/)**
- **Endpoint**: `/api/neossat`
- **Data**: Real asteroid observations from space-based telescope
- **Capabilities**: 24/7 asteroid surveillance, space debris monitoring
- **API**: [NEOSSat Open Data](https://donnees-data.asc-csa.gc.ca/en/dataset/9ae3e718-8b6d-40b7-8aa4-858f00e84b30)

#### 2. **[NASA Near Earth Object API](https://api.nasa.gov/)**
- **Endpoint**: `/api/asteroids`
- **Data**: Real-time asteroid and comet data
- **Rate Limit**: 1000 requests/hour (free tier)
- **Sources**: NASA NEO API + JPL Small Body Database

#### 3. **[NASA Eyes on Asteroids](https://eyes.nasa.gov/apps/asteroids/)**
- **Endpoint**: `/api/nasa-eyes`
- **Data**: Real-time visualization and tracking data
- **Features**: 3D orbital visualization, close approach tracking

#### 4. **[JPL Small Body Database](https://ssd.jpl.nasa.gov/tools/sbdb_query.html)**
- **Integration**: Combined with NASA NEO API
- **Data**: Detailed orbital elements and physical properties

## 🚀 **How to Use Real NASA Data**

### **1. Get Your Free NASA API Key**
```bash
# Visit: https://api.nasa.gov/
# Request your free API key (1000 requests/hour)
# Add to .env file:
NASA_API_KEY=your_actual_api_key_here
```

### **2. Test Real Data APIs**
```bash
# Test asteroid data with real NASA API
curl "http://localhost:3000/api/asteroids?trajectory=true"

# Test NEOSSat observations
curl "http://localhost:3000/api/neossat?type=asteroid&limit=10"

# Test NASA Eyes data
curl "http://localhost:3000/api/nasa-eyes?hazard_only=true"
```

### **3. API Documentation**
- **Live Docs**: http://localhost:3000/api/docs
- **Interactive Testing**: All endpoints include example requests

## 📊 **Real Data Features**

### **AEGIS COMMAND Dashboard**
- ✅ **Real asteroid data** from NASA NEO API
- ✅ **Live NEOSSat observations** from Canadian Space Agency
- ✅ **Impact predictions** using real orbital data
- ✅ **Space debris tracking** from NEOSSat
- ✅ **Close approach monitoring** from NASA Eyes

### **AEGIS GUIDE Interface**
- ✅ **Real-time risk assessment** based on actual asteroid data
- ✅ **Personalized safety instructions** using real impact calculations
- ✅ **Live evacuation routes** optimized with real traffic data
- ✅ **Emergency contacts** from real resource databases

## 🔧 **API Endpoints Available**

| Endpoint | Method | Description | Data Source |
|----------|--------|-------------|-------------|
| `/api/asteroids` | GET | Real asteroid data | NASA NEO API + JPL SBDB |
| `/api/neossat` | GET | Space telescope observations | Canadian Space Agency |
| `/api/nasa-eyes` | GET | Real-time tracking data | NASA Eyes on Asteroids |
| `/api/ai/predictions` | POST | AI impact predictions | FastAPI AI Service |
| `/api/resources` | GET | Emergency resources | MongoDB |
| `/api/health` | GET | System health check | All services |

## 🛡️ **Fallback System**

The system includes intelligent fallbacks:
- **No API Key**: Uses mock data (perfect for demos)
- **API Unavailable**: Graceful degradation to cached data
- **Rate Limited**: Automatic retry with exponential backoff
- **Network Issues**: Falls back to local mock data

## 🎯 **Perfect for Hackathon Demo**

### **Demo Scenarios:**
1. **With NASA API Key**: Show real asteroid data
2. **Without API Key**: Show mock data (still impressive)
3. **Mixed Mode**: Real data for some, mock for others

### **Demo Script:**
```bash
# 1. Show real NASA asteroid data
curl http://localhost:3000/api/asteroids

# 2. Show NEOSSat space observations
curl http://localhost:3000/api/neossat?type=asteroid

# 3. Show NASA Eyes hazard data
curl http://localhost:3000/api/nasa-eyes?hazard_only=true

# 4. Show API documentation
open http://localhost:3000/api/docs
```

## 📈 **Data Sources Summary**

### **NASA APIs (Free Tier)**
- **Near Earth Object API**: Asteroid and comet data
- **Asteroid API**: Detailed asteroid information
- **JPL Small Body Database**: Orbital elements
- **NASA Eyes**: Real-time visualization data

### **Canadian Space Agency**
- **NEOSSat**: Space-based asteroid surveillance
- **CADC Archive**: Open astronomical data
- **FITS Images**: Raw telescope data
- **Astrometric Data**: Precise position measurements

### **Additional Sources**
- **USGS Earthquake Data**: For impact seismic effects
- **National Map**: For geographic data
- **Traffic APIs**: For evacuation route optimization

## 🔄 **Real-Time Updates**

The system supports:
- **Live asteroid tracking** with orbital updates
- **Real-time impact probability** calculations
- **Dynamic evacuation routes** based on current conditions
- **Live resource availability** from emergency services
- **Continuous risk assessment** updates

## 🎨 **UI Integration**

The real data seamlessly integrates with:
- **Interactive Leaflet maps** showing real asteroid positions
- **Color-coded risk levels** based on actual impact probability
- **Real-time countdown timers** to close approaches
- **Live resource allocation** based on actual capacity
- **Dynamic safety instructions** based on real threat levels

## 🚀 **Next Steps**

1. **Get NASA API Key**: Sign up at https://api.nasa.gov/
2. **Test Real Data**: Use the provided curl commands
3. **Explore Documentation**: Visit http://localhost:3000/api/docs
4. **Demo Preparation**: Practice with both real and mock data modes

## 📞 **Support**

- **API Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health
- **NASA API Info**: https://api.nasa.gov/
- **NEOSSat Info**: https://www.asc-csa.gc.ca/eng/satellites/neossat/

---

**Your AEGIS NET system now has real NASA and Canadian Space Agency data integration! 🛰️**

Perfect for demonstrating real-world emergency response capabilities at the NASA Space Apps Challenge 2025.
