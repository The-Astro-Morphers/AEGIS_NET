'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Car, 
  Building2, 
  Activity,
  Clock,
  Target
} from 'lucide-react'

// Dynamically import the map component to avoid SSR issues
const CommandMap = dynamic(() => import('@/components/command/CommandMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-slate-800 rounded-lg flex items-center justify-center">
      <div className="text-gray-400">Loading map...</div>
    </div>
  )
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

export default function CommandDashboard() {
  const [asteroidData, setAsteroidData] = useState<AsteroidData | null>(null)
  const [resources, setResources] = useState<ResourceData[]>([])
  const [selectedResource, setSelectedResource] = useState<ResourceData | null>(null)

  // Fetch real data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch asteroid data from NASA API
        const asteroidResponse = await fetch('/api/asteroids')
        if (asteroidResponse.ok) {
          const asteroidResult = await asteroidResponse.json()
          if (asteroidResult.success) {
            setAsteroidData(asteroidResult.data)
          }
        }

        // Fetch resource data
        const resourceResponse = await fetch('/api/resources')
        if (resourceResponse.ok) {
          const resourceResult = await resourceResponse.json()
          if (resourceResult.success) {
            setResources(resourceResult.data)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback to mock data if APIs fail
        setAsteroidData({
          id: '2024-AB1',
          name: 'Asteroid 2024-AB1',
          diameter: 150,
          velocity: 15.2,
          impactProbability: 0.15,
          impactTime: '2024-12-15T14:30:00Z',
          blastRadius: 25,
          tsunamiRisk: true,
          debrisDispersion: 50
        })

        setResources([
          {
            id: 'shelter-1',
            type: 'shelter',
            name: 'Downtown Emergency Shelter',
            capacity: 500,
            currentOccupancy: 120,
            location: [40.7128, -74.0060],
            status: 'available'
          },
          {
            id: 'hospital-1',
            type: 'hospital',
            name: 'Metropolitan General Hospital',
            capacity: 800,
            currentOccupancy: 650,
            location: [40.7589, -73.9851],
            status: 'available'
          },
          {
            id: 'evac-1',
            type: 'evacuation_center',
            name: 'Central Park Evacuation Center',
            capacity: 2000,
            currentOccupancy: 0,
            location: [40.7829, -73.9654],
            status: 'available'
          }
        ])
      }
    }

    fetchData()
  }, [])

  const getRiskLevel = (probability: number) => {
    if (probability > 0.1) return { level: 'HIGH', variant: 'high' as const }
    if (probability > 0.05) return { level: 'MEDIUM', variant: 'medium' as const }
    return { level: 'LOW', variant: 'low' as const }
  }

  const riskLevel = asteroidData ? getRiskLevel(asteroidData.impactProbability) : null

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {asteroidData && (
        <Alert variant="emergency" className="border-emergency-high">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Asteroid Impact Alert</AlertTitle>
          <AlertDescription>
            {asteroidData.name} detected with {asteroidData.impactProbability * 100}% impact probability. 
            Estimated impact: {new Date(asteroidData.impactTime).toLocaleString()}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Map and Resources */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Real-time Impact Zone
              </CardTitle>
              <CardDescription className="text-gray-400">
                Live visualization of impact predictions and resource allocation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommandMap 
                asteroidData={asteroidData}
                resources={resources}
                onResourceSelect={setSelectedResource}
              />
            </CardContent>
          </Card>

          {/* Resource Allocation */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Resource Allocation
              </CardTitle>
              <CardDescription className="text-gray-400">
                Drag and drop resources to optimize evacuation response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedResource?.id === resource.id
                        ? 'border-nasa-orange bg-nasa-orange/10'
                        : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedResource(resource)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{resource.name}</h4>
                      <Badge variant={resource.status === 'available' ? 'low' : 'medium'}>
                        {resource.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span>{resource.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Occupancy:</span>
                        <span>{resource.currentOccupancy}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-nasa-orange h-2 rounded-full"
                          style={{ width: `${(resource.currentOccupancy / resource.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Analytics and Controls */}
        <div className="space-y-6">
          {/* Impact Assessment */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Impact Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {asteroidData && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Risk Level</span>
                    <Badge variant={riskLevel?.variant}>
                      {riskLevel?.level}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Diameter</span>
                    <span className="text-white">{asteroidData.diameter}m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Velocity</span>
                    <span className="text-white">{asteroidData.velocity} km/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Blast Radius</span>
                    <span className="text-white">{asteroidData.blastRadius} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tsunami Risk</span>
                    <Badge variant={asteroidData.tsunamiRisk ? 'high' : 'low'}>
                      {asteroidData.tsunamiRisk ? 'YES' : 'NO'}
                    </Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Evacuation Routes */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Evacuation Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Route A</span>
                    <Badge variant="low">OPTIMAL</Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div>Distance: 15.2 km</div>
                    <div>ETA: 25 min</div>
                    <div>Traffic: Light</div>
                  </div>
                </div>
                <div className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Route B</span>
                    <Badge variant="medium">MODERATE</Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div>Distance: 18.7 km</div>
                    <div>ETA: 35 min</div>
                    <div>Traffic: Medium</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-emergency-high/10 border border-emergency-high/20 rounded-lg">
                  <div className="text-emergency-high font-semibold mb-1">IMMEDIATE ACTION</div>
                  <div className="text-sm text-gray-300">
                    Evacuate Zone 1 (0-10km) within 2 hours
                  </div>
                </div>
                <div className="p-3 bg-emergency-medium/10 border border-emergency-medium/20 rounded-lg">
                  <div className="text-emergency-medium font-semibold mb-1">PREPARATION</div>
                  <div className="text-sm text-gray-300">
                    Prepare Zone 2 (10-25km) for potential evacuation
                  </div>
                </div>
                <div className="p-3 bg-emergency-low/10 border border-emergency-low/20 rounded-lg">
                  <div className="text-emergency-low font-semibold mb-1">MONITORING</div>
                  <div className="text-sm text-gray-300">
                    Continue tracking trajectory updates
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" variant="emergency">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Issue Evacuation Order
            </Button>
            <Button className="w-full" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Update Timeline
            </Button>
            <Button className="w-full" variant="outline">
              <Building2 className="h-4 w-4 mr-2" />
              Resource Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
