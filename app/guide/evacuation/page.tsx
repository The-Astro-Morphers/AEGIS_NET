'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Car,
  MapPin,
  Clock,
  Users,
  Shield,
  AlertTriangle,
  Navigation,
  Home,
  Building2,
  Phone,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react'

interface EvacuationRoute {
  id: string
  name: string
  distance: number
  estimatedTime: number
  trafficLevel: 'light' | 'medium' | 'heavy'
  safety: 'safe' | 'moderate' | 'risky'
  status: 'open' | 'congested' | 'closed'
  capacity: number
  currentUsage: number
  checkpoints: Array<{
    name: string
    distance: number
    services: string[]
  }>
}

interface EvacuationCenter {
  id: string
  name: string
  address: string
  capacity: number
  currentOccupancy: number
  services: string[]
  contact: string
  distance: number
  estimatedTime: number
}

export default function EvacuationPage() {
  const [routes, setRoutes] = useState<EvacuationRoute[]>([])
  const [centers, setCenters] = useState<EvacuationCenter[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvacuationData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Mock evacuation data
        const mockRoutes: EvacuationRoute[] = [
          {
            id: 'route-1',
            name: 'Highway 101 North',
            distance: 15.2,
            estimatedTime: 25,
            trafficLevel: 'light',
            safety: 'safe',
            status: 'open',
            capacity: 1000,
            currentUsage: 300,
            checkpoints: [
              { name: 'Downtown Checkpoint', distance: 5.2, services: ['Medical', 'Water', 'Restrooms'] },
              { name: 'Highway Junction', distance: 10.8, services: ['Fuel', 'Food', 'Medical'] },
              { name: 'Safe Zone Entry', distance: 15.2, services: ['Registration', 'Medical', 'Shelter'] }
            ]
          },
          {
            id: 'route-2',
            name: 'Interstate 95 South',
            distance: 18.7,
            estimatedTime: 35,
            trafficLevel: 'medium',
            safety: 'moderate',
            status: 'congested',
            capacity: 800,
            currentUsage: 600,
            checkpoints: [
              { name: 'City Limits', distance: 8.1, services: ['Water', 'Restrooms'] },
              { name: 'Highway Rest Area', distance: 14.3, services: ['Fuel', 'Food', 'Medical'] },
              { name: 'Evacuation Center', distance: 18.7, services: ['Registration', 'Shelter', 'Medical'] }
            ]
          },
          {
            id: 'route-3',
            name: 'Coastal Route East',
            distance: 22.1,
            estimatedTime: 45,
            trafficLevel: 'heavy',
            safety: 'risky',
            status: 'open',
            capacity: 500,
            currentUsage: 450,
            checkpoints: [
              { name: 'Beach Access', distance: 12.5, services: ['Water'] },
              { name: 'Mountain Pass', distance: 18.9, services: ['Fuel', 'Medical'] },
              { name: 'Safe Zone', distance: 22.1, services: ['Registration', 'Shelter'] }
            ]
          }
        ]

        const mockCenters: EvacuationCenter[] = [
          {
            id: 'center-1',
            name: 'Downtown Convention Center',
            address: '123 Convention Way, Downtown',
            capacity: 2000,
            currentOccupancy: 1200,
            services: ['Medical', 'Food', 'Water', 'Restrooms', 'Pet Care'],
            contact: '(555) 123-4567',
            distance: 15.2,
            estimatedTime: 25
          },
          {
            id: 'center-2',
            name: 'Community High School',
            address: '456 School Street, Midtown',
            capacity: 1500,
            currentOccupancy: 800,
            services: ['Medical', 'Food', 'Water', 'Restrooms'],
            contact: '(555) 234-5678',
            distance: 18.7,
            estimatedTime: 35
          },
          {
            id: 'center-3',
            name: 'Sports Complex',
            address: '789 Sports Avenue, Uptown',
            capacity: 3000,
            currentOccupancy: 500,
            services: ['Medical', 'Food', 'Water', 'Restrooms', 'Pet Care', 'Childcare'],
            contact: '(555) 345-6789',
            distance: 22.1,
            estimatedTime: 45
          }
        ]

        setRoutes(mockRoutes)
        setCenters(mockCenters)
      } catch (e: any) {
        console.error('Error fetching evacuation data:', e)
        setError(e.message || 'Failed to load evacuation information')
      }
      setIsLoading(false)
    }

    fetchEvacuationData()
  }, [])

  const getTrafficColor = (level: string) => {
    switch (level) {
      case 'light': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'heavy': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-600 bg-green-100'
      case 'moderate': return 'text-yellow-600 bg-yellow-100'
      case 'risky': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'congested': return <Activity className="h-4 w-4 text-yellow-600" />
      case 'closed': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-low mx-auto mb-4"></div>
          <p className="text-gray-600">Loading evacuation routes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evacuation Routes</h1>
          <p className="text-gray-600">Real-time evacuation information and safe routes</p>
        </div>
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Navigation className="h-4 w-4" />
          <span>Back to Guide</span>
        </Button>
      </div>

      {/* Emergency Alert */}
      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Evacuation Advisory</AlertTitle>
        <AlertDescription>
          <div className="space-y-2">
            <p>Evacuation is recommended for your area. Follow these routes to designated safe zones.</p>
            <div className="flex items-center space-x-4 text-sm">
              <span>• Bring essential documents and medications</span>
              <span>• Follow official evacuation routes only</span>
              <span>• Check in at designated checkpoints</span>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Evacuation Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Available Routes
            </CardTitle>
            <CardDescription>
              Select the safest route based on current conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routes.map((route) => (
                <div 
                  key={route.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRoute === route.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{route.name}</h4>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(route.status)}
                      <Badge variant={route.status === 'open' ? 'low' : 
                                     route.status === 'congested' ? 'medium' : 'high'}>
                        {route.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-medium">{route.distance} km</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-medium">{route.estimatedTime} min</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Traffic</p>
                      <Badge className={getTrafficColor(route.trafficLevel)}>
                        {route.trafficLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-600">Safety</p>
                      <Badge className={getSafetyColor(route.safety)}>
                        {route.safety.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Capacity Usage</span>
                      <span>{route.currentUsage}/{route.capacity}</span>
                    </div>
                    <Progress value={(route.currentUsage / route.capacity) * 100} />
                  </div>

                  {selectedRoute === route.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-medium mb-2">Checkpoints:</h5>
                      <div className="space-y-2">
                        {route.checkpoints.map((checkpoint, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div>
                              <span className="font-medium">{checkpoint.name}</span>
                              <span className="text-gray-600 ml-2">({checkpoint.distance} km)</span>
                            </div>
                            <div className="flex space-x-1">
                              {checkpoint.services.map((service, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evacuation Centers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Evacuation Centers
            </CardTitle>
            <CardDescription>
              Safe locations with essential services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {centers.map((center) => (
                <div key={center.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{center.name}</h4>
                    <Badge variant={center.currentOccupancy / center.capacity > 0.8 ? 'high' : 'low'}>
                      {Math.round((center.currentOccupancy / center.capacity) * 100)}% Full
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{center.address}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-medium">{center.distance} km</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Travel Time</p>
                      <p className="font-medium">{center.estimatedTime} min</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Capacity</p>
                      <p className="font-medium">{center.currentOccupancy}/{center.capacity}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Contact</p>
                      <p className="font-medium">{center.contact}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Occupancy</span>
                      <span>{center.currentOccupancy}/{center.capacity}</span>
                    </div>
                    <Progress value={(center.currentOccupancy / center.capacity) * 100} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Available Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {center.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Start Evacuation
        </Button>
        <Button variant="outline" className="w-full">
          <Phone className="h-4 w-4 mr-2" />
          Call Emergency Services
        </Button>
        <Button variant="outline" className="w-full">
          <Users className="h-4 w-4 mr-2" />
          Find Family Members
        </Button>
      </div>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Evacuation Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Before You Leave</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Secure your home and lock all doors</li>
                <li>• Turn off gas, water, and electricity</li>
                <li>• Take important documents and medications</li>
                <li>• Bring emergency supplies and water</li>
                <li>• Inform family of your destination</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">During Evacuation</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Follow official evacuation routes only</li>
                <li>• Stay tuned to emergency broadcasts</li>
                <li>• Check in at designated checkpoints</li>
                <li>• Help others if it's safe to do so</li>
                <li>• Keep your vehicle fueled and ready</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
