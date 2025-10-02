// MongoDB initialization script for AEGIS NET
db = db.getSiblingDB('aegis_net');

// Create collections
db.createCollection('asteroids');
db.createCollection('resources');
db.createCollection('predictions');
db.createCollection('evacuation_routes');
db.createCollection('users');

// Create indexes for better performance
db.asteroids.createIndex({ "id": 1 }, { unique: true });
db.asteroids.createIndex({ "impact_time": 1 });
db.asteroids.createIndex({ "impact_probability": -1 });

db.resources.createIndex({ "type": 1 });
db.resources.createIndex({ "status": 1 });
db.resources.createIndex({ "location": "2dsphere" });

db.predictions.createIndex({ "asteroid_id": 1 });
db.predictions.createIndex({ "created_at": -1 });

db.evacuation_routes.createIndex({ "route_id": 1 }, { unique: true });
db.evacuation_routes.createIndex({ "safety_score": -1 });

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });

// Insert initial data
db.resources.insertMany([
  {
    id: 'shelter-1',
    type: 'shelter',
    name: 'Downtown Emergency Shelter',
    capacity: 500,
    currentOccupancy: 120,
    location: { type: 'Point', coordinates: [-74.0060, 40.7128] },
    status: 'available',
    address: '123 Main St, New York, NY 10001',
    phone: '(555) 123-4567',
    facilities: ['Food', 'Water', 'Medical', 'WiFi'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'hospital-1',
    type: 'hospital',
    name: 'Metropolitan General Hospital',
    capacity: 800,
    currentOccupancy: 650,
    location: { type: 'Point', coordinates: [-73.9851, 40.7589] },
    status: 'available',
    address: '456 Health Ave, New York, NY 10002',
    phone: '(555) 987-6543',
    facilities: ['Emergency Room', 'Surgery', 'ICU', 'Pharmacy'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'evac-1',
    type: 'evacuation_center',
    name: 'Central Park Evacuation Center',
    capacity: 2000,
    currentOccupancy: 0,
    location: { type: 'Point', coordinates: [-73.9654, 40.7829] },
    status: 'available',
    address: '789 Park Blvd, New York, NY 10003',
    phone: '(555) 456-7890',
    facilities: ['Food', 'Water', 'Restrooms', 'Parking', 'WiFi'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample asteroid data
db.asteroids.insertOne({
  id: '2024-AB1',
  name: 'Asteroid 2024-AB1',
  diameter: 150,
  velocity: 15.2,
  impactProbability: 0.15,
  impactTime: new Date('2024-12-15T14:30:00Z'),
  blastRadius: 25,
  tsunamiRisk: true,
  debrisDispersion: 50,
  trajectory: [
    { lat: 40.7128, lng: -74.0060, time: 0 },
    { lat: 40.7589, lng: -73.9851, time: 1 },
    { lat: 40.7829, lng: -73.9654, time: 2 }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample evacuation routes
db.evacuation_routes.insertMany([
  {
    route_id: 'route-1',
    name: 'Primary Evacuation Route',
    waypoints: [
      { lat: 40.7128, lng: -74.0060 },
      { lat: 40.7589, lng: -73.9851 }
    ],
    distance: 15.2,
    estimatedTime: 25,
    trafficLevel: 'light',
    safetyScore: 0.9,
    capacity: 1000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    route_id: 'route-2',
    name: 'Secondary Evacuation Route',
    waypoints: [
      { lat: 40.7128, lng: -74.0060 },
      { lat: 40.7829, lng: -73.9654 }
    ],
    distance: 18.7,
    estimatedTime: 35,
    trafficLevel: 'medium',
    safetyScore: 0.7,
    capacity: 800,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('AEGIS NET database initialized successfully!');
