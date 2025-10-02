'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface AsteroidData {
  id: string
  name: string
  diameter: number
  velocity: number
  impactProbability: number
  impactTime: string
  blastRadius: number
  tsunamiRisk: boolean
  debrisDispersion: number
}

interface ResourceData {
  id: string
  type: 'shelter' | 'hospital' | 'evacuation_center'
  name: string
  capacity: number
  currentOccupancy: number
  location: [number, number]
  status: 'available' | 'full' | 'evacuated'
}

interface CommandMapProps {
  asteroidData: AsteroidData | null
  resources: ResourceData[]
  onResourceSelect: (resource: ResourceData) => void
}

// Custom icons for different resource types
const createCustomIcon = (type: string, status: string) => {
  const color = status === 'available' ? '#10b981' : status === 'full' ? '#f59e0b' : '#dc2626'
  const icon = type === 'shelter' ? '🏠' : type === 'hospital' ? '🏥' : '🚌'
  
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      border: 2px solid white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">${icon}</div>`,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}

// Component to handle map updates when asteroid data changes
function MapUpdater({ asteroidData }: { asteroidData: AsteroidData | null }) {
  const map = useMap()

  useEffect(() => {
    if (asteroidData) {
      // Center map on impact location (using NYC as example)
      const impactLocation: [number, number] = [40.7128, -74.0060]
      map.setView(impactLocation, 10)
    }
  }, [asteroidData, map])

  return null
}

export default function CommandMap({ asteroidData, resources, onResourceSelect }: CommandMapProps) {
  const mapRef = useRef<L.Map>(null)

  // Default center (NYC)
  const defaultCenter: [number, number] = [40.7128, -74.0060]
  const defaultZoom = 10

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater asteroidData={asteroidData} />

        {/* Impact Zone Circles */}
        {asteroidData && (
          <>
            {/* Blast Radius */}
            <Circle
              center={defaultCenter}
              radius={asteroidData.blastRadius * 1000} // Convert km to meters
              pathOptions={{
                color: '#dc2626',
                fillColor: '#dc2626',
                fillOpacity: 0.2,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-red-600">Blast Radius</h3>
                  <p>{asteroidData.blastRadius} km</p>
                  <p className="text-sm text-gray-600">Immediate destruction zone</p>
                </div>
              </Popup>
            </Circle>

            {/* Debris Dispersion */}
            <Circle
              center={defaultCenter}
              radius={asteroidData.debrisDispersion * 1000}
              pathOptions={{
                color: '#f59e0b',
                fillColor: '#f59e0b',
                fillOpacity: 0.1,
                weight: 2,
                dashArray: '5, 5'
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-amber-600">Debris Dispersion</h3>
                  <p>{asteroidData.debrisDispersion} km</p>
                  <p className="text-sm text-gray-600">Potential debris impact zone</p>
                </div>
              </Popup>
            </Circle>

            {/* Tsunami Risk Zone (if applicable) */}
            {asteroidData.tsunamiRisk && (
              <Circle
                center={[40.7128, -74.0060]} // Coastal area
                radius={100000} // 100km radius
                pathOptions={{
                  color: '#0ea5e9',
                  fillColor: '#0ea5e9',
                  fillOpacity: 0.15,
                  weight: 2,
                  dashArray: '10, 10'
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-blue-600">Tsunami Risk Zone</h3>
                    <p>100 km coastal area</p>
                    <p className="text-sm text-gray-600">Potential tsunami impact</p>
                  </div>
                </Popup>
              </Circle>
            )}

            {/* Impact Point Marker */}
            <Marker position={defaultCenter}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-red-600">Impact Point</h3>
                  <p><strong>Asteroid:</strong> {asteroidData.name}</p>
                  <p><strong>Diameter:</strong> {asteroidData.diameter}m</p>
                  <p><strong>Velocity:</strong> {asteroidData.velocity} km/s</p>
                  <p><strong>Probability:</strong> {(asteroidData.impactProbability * 100).toFixed(1)}%</p>
                  <p><strong>Impact Time:</strong> {new Date(asteroidData.impactTime).toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Resource Markers */}
        {resources.map((resource) => (
          <Marker
            key={resource.id}
            position={resource.location}
            icon={createCustomIcon(resource.type, resource.status)}
            eventHandlers={{
              click: () => onResourceSelect(resource)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{resource.name}</h3>
                <p><strong>Type:</strong> {resource.type.replace('_', ' ')}</p>
                <p><strong>Capacity:</strong> {resource.capacity}</p>
                <p><strong>Occupancy:</strong> {resource.currentOccupancy}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    resource.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : resource.status === 'full'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {resource.status}
                  </span>
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(resource.currentOccupancy / resource.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {((resource.currentOccupancy / resource.capacity) * 100).toFixed(1)}% occupied
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
