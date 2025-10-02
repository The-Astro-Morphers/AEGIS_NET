"""
AEGIS NET - AI/ML Prediction Service
FastAPI microservice for asteroid impact predictions and evacuation optimization
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Tuple
import numpy as np
import math
from datetime import datetime
import uvicorn

app = FastAPI(
    title="AEGIS NET AI Service",
    description="AI/ML predictions for asteroid impact response",
    version="1.0.0"
)

# CORS middleware for Next.js integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class AsteroidData(BaseModel):
    diameter: float  # meters
    velocity: float  # km/s
    impact_location: Tuple[float, float]  # [lat, lng]
    impact_time: str
    density: Optional[float] = 3000  # kg/m³ (typical asteroid density)

class PredictionRequest(BaseModel):
    asteroid_data: AsteroidData
    user_location: Optional[Tuple[float, float]] = None
    population_density: Optional[float] = 1000  # people/km²

class BlastRadiusPrediction(BaseModel):
    blast_radius: float  # km
    thermal_radius: float  # km
    seismic_radius: float  # km
    airburst_height: float  # km

class TsunamiPrediction(BaseModel):
    tsunami_risk: bool
    wave_height: Optional[float] = None  # meters
    coastal_impact_radius: Optional[float] = None  # km

class DebrisDispersion(BaseModel):
    dispersion_radius: float  # km
    debris_size_distribution: dict
    impact_probability_map: List[List[float]]

class EvacuationRoute(BaseModel):
    route_id: str
    name: str
    waypoints: List[Tuple[float, float]]
    distance: float  # km
    estimated_time: float  # minutes
    traffic_level: str  # light, medium, heavy
    safety_score: float  # 0-1
    capacity: int  # people/hour

class RiskAssessment(BaseModel):
    risk_level: str  # low, medium, high
    risk_factors: List[str]
    recommendations: List[str]
    confidence_score: float  # 0-1

class ResourceAllocation(BaseModel):
    shelters_needed: int
    hospitals_needed: int
    evacuation_centers_needed: int
    estimated_evacuees: int
    resource_shortage_risk: str  # low, medium, high

class PredictionResponse(BaseModel):
    blast_prediction: BlastRadiusPrediction
    tsunami_prediction: TsunamiPrediction
    debris_dispersion: DebrisDispersion
    evacuation_routes: List[EvacuationRoute]
    risk_assessment: RiskAssessment
    resource_allocation: ResourceAllocation
    processing_time: float  # seconds

# AI/ML Models (simplified for hackathon)
class AsteroidImpactPredictor:
    """Simplified AI model for asteroid impact predictions"""
    
    def __init__(self):
        self.earth_radius = 6371  # km
        self.gravity = 9.81  # m/s²
    
    def calculate_blast_radius(self, diameter: float, velocity: float, density: float) -> BlastRadiusPrediction:
        """Calculate blast radius using simplified physics models"""
        
        # Convert to SI units
        diameter_m = diameter
        velocity_ms = velocity * 1000  # km/s to m/s
        
        # Calculate kinetic energy (Joules)
        mass = (4/3) * math.pi * (diameter_m/2)**3 * density
        kinetic_energy = 0.5 * mass * velocity_ms**2
        
        # Convert to TNT equivalent (1 ton TNT = 4.184e9 J)
        tnt_equivalent = kinetic_energy / (4.184e9)
        
        # Simplified blast radius calculation (scaled from nuclear weapon models)
        blast_radius = 0.1 * (tnt_equivalent ** (1/3))  # km
        
        # Thermal and seismic effects
        thermal_radius = blast_radius * 1.5
        seismic_radius = blast_radius * 2.0
        
        # Airburst height (simplified)
        airburst_height = max(0, diameter_m / 100)  # km
        
        return BlastRadiusPrediction(
            blast_radius=round(blast_radius, 2),
            thermal_radius=round(thermal_radius, 2),
            seismic_radius=round(seismic_radius, 2),
            airburst_height=round(airburst_height, 2)
        )
    
    def assess_tsunami_risk(self, impact_location: Tuple[float, float], 
                          blast_radius: float, diameter: float) -> TsunamiPrediction:
        """Assess tsunami risk based on impact location and size"""
        
        lat, lng = impact_location
        
        # Check if impact is in coastal area (simplified)
        is_coastal = self._is_coastal_location(lat, lng)
        
        if not is_coastal or diameter < 50:  # Small asteroids unlikely to cause tsunamis
            return TsunamiPrediction(tsunami_risk=False)
        
        # Simplified tsunami wave height calculation
        wave_height = min(diameter / 10, 50)  # meters, capped at 50m
        coastal_impact_radius = blast_radius * 3  # km
        
        return TsunamiPrediction(
            tsunami_risk=True,
            wave_height=round(wave_height, 1),
            coastal_impact_radius=round(coastal_impact_radius, 1)
        )
    
    def _is_coastal_location(self, lat: float, lng: float) -> bool:
        """Simplified coastal detection (for hackathon demo)"""
        # NYC area is considered coastal
        return (lat > 40.5 and lat < 41.0 and lng > -74.5 and lng < -73.5) or \
               (lat > 25.0 and lat < 30.0 and lng > -85.0 and lng < -80.0)  # Florida
    
    def calculate_debris_dispersion(self, blast_radius: float, velocity: float) -> DebrisDispersion:
        """Calculate debris dispersion patterns"""
        
        # Debris dispersion radius (simplified)
        dispersion_radius = blast_radius * 2.5
        
        # Debris size distribution (simplified)
        debris_sizes = {
            "large": 0.1,    # > 1m
            "medium": 0.3,   # 0.1-1m
            "small": 0.6     # < 0.1m
        }
        
        # Create impact probability map (simplified grid)
        grid_size = 20
        impact_map = []
        for i in range(grid_size):
            row = []
            for j in range(grid_size):
                # Distance from center
                distance = math.sqrt((i - grid_size/2)**2 + (j - grid_size/2)**2)
                # Probability decreases with distance
                probability = max(0, 1 - (distance / (grid_size/2)))
                row.append(round(probability, 3))
            impact_map.append(row)
        
        return DebrisDispersion(
            dispersion_radius=round(dispersion_radius, 2),
            debris_size_distribution=debris_sizes,
            impact_probability_map=impact_map
        )

class EvacuationOptimizer:
    """AI-powered evacuation route optimization"""
    
    def __init__(self):
        self.road_network = self._load_road_network()
    
    def _load_road_network(self) -> dict:
        """Load simplified road network (for hackathon demo)"""
        # In production, this would load real road network data
        return {
            "highways": [
                {"id": "hwy1", "capacity": 2000, "speed_limit": 100},
                {"id": "hwy2", "capacity": 1500, "speed_limit": 80},
            ],
            "streets": [
                {"id": "st1", "capacity": 500, "speed_limit": 50},
                {"id": "st2", "capacity": 300, "speed_limit": 40},
            ]
        }
    
    def optimize_routes(self, start_location: Tuple[float, float],
                       safe_zones: List[Tuple[float, float]],
                       blast_radius: float) -> List[EvacuationRoute]:
        """Optimize evacuation routes using AI algorithms"""
        
        routes = []
        
        for i, safe_zone in enumerate(safe_zones):
            # Calculate distance and route
            distance = self._calculate_distance(start_location, safe_zone)
            
            # Estimate travel time based on distance and traffic
            base_time = distance * 2  # 2 minutes per km
            traffic_factor = self._estimate_traffic_factor(distance, blast_radius)
            estimated_time = base_time * traffic_factor
            
            # Determine traffic level
            if traffic_factor < 1.2:
                traffic_level = "light"
            elif traffic_factor < 1.8:
                traffic_level = "medium"
            else:
                traffic_level = "heavy"
            
            # Calculate safety score
            safety_score = self._calculate_safety_score(start_location, safe_zone, blast_radius)
            
            # Estimate capacity
            capacity = int(1000 / traffic_factor)  # people per hour
            
            route = EvacuationRoute(
                route_id=f"route_{i+1}",
                name=f"Evacuation Route {i+1}",
                waypoints=[start_location, safe_zone],
                distance=round(distance, 2),
                estimated_time=round(estimated_time, 1),
                traffic_level=traffic_level,
                safety_score=round(safety_score, 2),
                capacity=capacity
            )
            routes.append(route)
        
        # Sort by safety score and estimated time
        routes.sort(key=lambda x: (x.safety_score, x.estimated_time), reverse=True)
        
        return routes
    
    def _calculate_distance(self, point1: Tuple[float, float], point2: Tuple[float, float]) -> float:
        """Calculate distance between two points using Haversine formula"""
        lat1, lng1 = point1
        lat2, lng2 = point2
        
        R = 6371  # Earth's radius in km
        
        dlat = math.radians(lat2 - lat1)
        dlng = math.radians(lng2 - lng1)
        
        a = (math.sin(dlat/2) * math.sin(dlat/2) +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlng/2) * math.sin(dlng/2))
        
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        distance = R * c
        
        return distance
    
    def _estimate_traffic_factor(self, distance: float, blast_radius: float) -> float:
        """Estimate traffic congestion factor"""
        # Closer to blast radius = more traffic
        if distance < blast_radius:
            return 2.5  # Heavy traffic
        elif distance < blast_radius * 2:
            return 1.8  # Medium traffic
        else:
            return 1.2  # Light traffic
    
    def _calculate_safety_score(self, start: Tuple[float, float], 
                               destination: Tuple[float, float], 
                               blast_radius: float) -> float:
        """Calculate safety score for evacuation route"""
        distance = self._calculate_distance(start, destination)
        
        # Higher score for routes that move away from blast radius
        if distance > blast_radius * 3:
            return 0.9
        elif distance > blast_radius * 2:
            return 0.7
        elif distance > blast_radius:
            return 0.5
        else:
            return 0.2

# Initialize AI models
impact_predictor = AsteroidImpactPredictor()
evacuation_optimizer = EvacuationOptimizer()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "AEGIS NET AI Service",
        "status": "operational",
        "version": "1.0.0",
        "endpoints": [
            "/predict",
            "/health",
            "/docs"
        ]
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "impact_predictor": "operational",
            "evacuation_optimizer": "operational"
        }
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_impact(request: PredictionRequest):
    """Generate AI predictions for asteroid impact"""
    
    start_time = datetime.now()
    
    try:
        # Calculate blast radius
        blast_prediction = impact_predictor.calculate_blast_radius(
            request.asteroid_data.diameter,
            request.asteroid_data.velocity,
            request.asteroid_data.density
        )
        
        # Assess tsunami risk
        tsunami_prediction = impact_predictor.assess_tsunami_risk(
            request.asteroid_data.impact_location,
            blast_prediction.blast_radius,
            request.asteroid_data.diameter
        )
        
        # Calculate debris dispersion
        debris_dispersion = impact_predictor.calculate_debris_dispersion(
            blast_prediction.blast_radius,
            request.asteroid_data.velocity
        )
        
        # Optimize evacuation routes
        safe_zones = [
            (40.7589, -73.9851),  # Safe zone 1
            (40.7829, -73.9654),  # Safe zone 2
            (40.6782, -73.9442),  # Safe zone 3
        ]
        
        evacuation_routes = evacuation_optimizer.optimize_routes(
            request.asteroid_data.impact_location,
            safe_zones,
            blast_prediction.blast_radius
        )
        
        # Risk assessment
        risk_level = "low"
        risk_factors = []
        recommendations = []
        
        if blast_prediction.blast_radius > 20:
            risk_level = "high"
            risk_factors.append("Large blast radius")
            recommendations.append("Immediate evacuation required")
        elif blast_prediction.blast_radius > 10:
            risk_level = "medium"
            risk_factors.append("Moderate blast radius")
            recommendations.append("Prepare for evacuation")
        
        if tsunami_prediction.tsunami_risk:
            risk_level = "high"
            risk_factors.append("Tsunami risk")
            recommendations.append("Evacuate to higher ground")
        
        if request.asteroid_data.velocity > 20:
            risk_factors.append("High velocity impact")
            recommendations.append("Seek immediate shelter")
        
        risk_assessment = RiskAssessment(
            risk_level=risk_level,
            risk_factors=risk_factors,
            recommendations=recommendations,
            confidence_score=0.85
        )
        
        # Resource allocation
        estimated_evacuees = min(blast_prediction.blast_radius * 1000, 100000)
        shelters_needed = max(1, int(estimated_evacuees / 500))
        hospitals_needed = max(1, int(estimated_evacuees / 1000))
        evacuation_centers_needed = max(1, int(estimated_evacuees / 2000))
        
        resource_shortage_risk = "low"
        if shelters_needed > 50 or hospitals_needed > 25:
            resource_shortage_risk = "high"
        elif shelters_needed > 25 or hospitals_needed > 15:
            resource_shortage_risk = "medium"
        
        resource_allocation = ResourceAllocation(
            shelters_needed=shelters_needed,
            hospitals_needed=hospitals_needed,
            evacuation_centers_needed=evacuation_centers_needed,
            estimated_evacuees=int(estimated_evacuees),
            resource_shortage_risk=resource_shortage_risk
        )
        
        processing_time = (datetime.now() - start_time).total_seconds()
        
        return PredictionResponse(
            blast_prediction=blast_prediction,
            tsunami_prediction=tsunami_prediction,
            debris_dispersion=debris_dispersion,
            evacuation_routes=evacuation_routes,
            risk_assessment=risk_assessment,
            resource_allocation=resource_allocation,
            processing_time=round(processing_time, 3)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/predict/{asteroid_id}")
async def get_cached_predictions(asteroid_id: str):
    """Get cached predictions for an asteroid"""
    # In production, this would fetch from a cache/database
    return {
        "asteroid_id": asteroid_id,
        "message": "Cached predictions not implemented in demo",
        "status": "use /predict endpoint for new predictions"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
