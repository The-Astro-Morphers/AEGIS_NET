'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  AlertTriangle, 
  Clock, 
  Users, 
  Car, 
  Phone,
  Home,
  Building2,
  Heart,
  Shield,
  Navigation
} from 'lucide-react'

interface LocationData {
  latitude: number
  longitude: number
  address: string
  riskLevel: 'low' | 'medium' | 'high'
  distanceToImpact: number
  estimatedArrival: string
}

interface SafetyInstructions {
  immediate: string[]
  preparation: string[]
  evacuation: string[]
  emergencyContacts: Array<{
    name: string
    number: string
    type: 'emergency' | 'shelter' | 'hospital'
  }>
}

export default function GuidePage() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [safetyInstructions, setSafetyInstructions] = useState<SafetyInstructions | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending')

  // Get user's location and assess risk
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by this browser')
        }

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          })
        })

        const { latitude, longitude } = position.coords
        
        // Mock location data - in real implementation, this would come from APIs
        const mockLocationData: LocationData = {
          latitude,
          longitude,
          address: 'New York, NY, USA', // This would be reverse geocoded
          riskLevel: 'medium', // This would be calculated based on distance to impact zone
          distanceToImpact: 15.2, // km
          estimatedArrival: '2024-12-15T14:30:00Z'
        }

        setLocation(mockLocationData)
        setLocationPermission('granted')

        // Generate personalized safety instructions based on location
        const instructions: SafetyInstructions = {
          immediate: [
            'Stay indoors and away from windows',
            'Listen to local emergency broadcasts',
            'Prepare emergency supplies (water, food, medications)',
            'Charge all electronic devices'
          ],
          preparation: [
            'Pack essential documents and medications',
            'Prepare a 72-hour emergency kit',
            'Identify multiple evacuation routes',
            'Inform family members of your location'
          ],
          evacuation: [
            'Follow designated evacuation routes',
            'Avoid bridges and overpasses if possible',
            'Keep gas tank at least half full',
            'Bring pets and essential supplies'
          ],
          emergencyContacts: [
            { name: 'Emergency Services', number: '911', type: 'emergency' },
            { name: 'Local Shelter', number: '(555) 123-4567', type: 'shelter' },
            { name: 'Nearest Hospital', number: '(555) 987-6543', type: 'hospital' },
            { name: 'Family Emergency Contact', number: '(555) 555-5555', type: 'emergency' }
          ]
        }

        setSafetyInstructions(instructions)
        setIsLoading(false)
      } catch (error) {
        console.error('Error getting location:', error)
        setLocationPermission('denied')
        setIsLoading(false)
      }
    }

    getLocation()
  }, [])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'emergency-high'
      case 'medium': return 'emergency-medium'
      case 'low': return 'emergency-low'
      default: return 'gray'
    }
  }

  const getRiskVariant = (risk: string) => {
    switch (risk) {
      case 'high': return 'high' as const
      case 'medium': return 'medium' as const
      case 'low': return 'low' as const
      default: return 'default' as const
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-low mx-auto mb-4"></div>
          <p className="text-gray-600">Getting your location and assessing risk...</p>
        </div>
      </div>
    )
  }

  if (locationPermission === 'denied') {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Location Access Required</AlertTitle>
          <AlertDescription>
            To provide personalized safety instructions, we need access to your location. 
            Please enable location services and refresh the page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Location and Risk Assessment */}
      {location && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Your Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{location.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Distance to Impact Zone</p>
                <p className="font-medium">{location.distanceToImpact} km</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Impact Time</p>
                <p className="font-medium">{new Date(location.estimatedArrival).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Risk Level</span>
                <Badge variant={getRiskVariant(location.riskLevel)}>
                  {location.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-${getRiskColor(location.riskLevel)} bg-${getRiskColor(location.riskLevel)}/5`}>
                <p className="text-sm">
                  {location.riskLevel === 'high' && 'You are in a high-risk zone. Immediate evacuation recommended.'}
                  {location.riskLevel === 'medium' && 'You are in a medium-risk zone. Prepare for potential evacuation.'}
                  {location.riskLevel === 'low' && 'You are in a low-risk zone. Monitor the situation and stay informed.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Safety Instructions */}
      {safetyInstructions && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Immediate Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-emergency-high">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Immediate Actions
              </CardTitle>
              <CardDescription>
                Do these right now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {safetyInstructions.immediate.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emergency-high rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Preparation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-emergency-medium">
                <Home className="h-5 w-5 mr-2" />
                Preparation
              </CardTitle>
              <CardDescription>
                Get ready for evacuation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {safetyInstructions.preparation.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emergency-medium rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Evacuation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-emergency-low">
                <Car className="h-5 w-5 mr-2" />
                Evacuation
              </CardTitle>
              <CardDescription>
                When leaving the area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {safetyInstructions.evacuation.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emergency-low rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Emergency Contacts */}
      {safetyInstructions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>
              Important numbers for your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {safetyInstructions.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center mb-2">
                    {contact.type === 'emergency' && <AlertTriangle className="h-4 w-4 text-emergency-high mr-2" />}
                    {contact.type === 'shelter' && <Building2 className="h-4 w-4 text-emergency-medium mr-2" />}
                    {contact.type === 'hospital' && <Heart className="h-4 w-4 text-emergency-low mr-2" />}
                    <span className="font-medium text-sm">{contact.name}</span>
                  </div>
                  <a 
                    href={`tel:${contact.number}`}
                    className="text-lg font-mono text-blue-600 hover:text-blue-800"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" className="bg-emergency-high hover:bg-emergency-high/90">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Emergency Alert
        </Button>
        <Button size="lg" variant="outline">
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
        <Button size="lg" variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Find Shelter
        </Button>
        <Button size="lg" variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Check Status
        </Button>
      </div>
    </div>
  )
}
