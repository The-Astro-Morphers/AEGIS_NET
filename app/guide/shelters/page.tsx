'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  MapPin, 
  Users, 
  Phone, 
  Clock, 
  Shield, 
  Car,
  Accessibility,
  Wifi,
  Coffee,
  Bed,
  AlertTriangle,
  Navigation
} from 'lucide-react'

export default function EmergencySheltersPage() {
  const emergencyShelters = [
    {
      id: 'shelter-1',
      name: 'Downtown Community Center',
      address: '123 Main Street, Downtown',
      capacity: 500,
      currentOccupancy: 120,
      status: 'available',
      amenities: ['wifi', 'food', 'medical', 'pets'],
      phone: '(555) 123-4567',
      distance: '2.3 miles',
      directions: 'Take Main Street south, turn left at City Hall'
    },
    {
      id: 'shelter-2',
      name: 'Westside High School Gymnasium',
      address: '456 Oak Avenue, Westside',
      capacity: 800,
      currentOccupancy: 450,
      status: 'moderate',
      amenities: ['wifi', 'food', 'medical', 'accessibility'],
      phone: '(555) 234-5678',
      distance: '4.1 miles',
      directions: 'Take Highway 15 north, exit at Oak Avenue'
    },
    {
      id: 'shelter-3',
      name: 'Eastside Recreation Center',
      address: '789 Pine Street, Eastside',
      capacity: 300,
      currentOccupancy: 280,
      status: 'near-capacity',
      amenities: ['wifi', 'food', 'medical'],
      phone: '(555) 345-6789',
      distance: '3.7 miles',
      directions: 'Take Pine Street east from downtown'
    },
    {
      id: 'shelter-4',
      name: 'Northside Community Church',
      address: '321 Elm Street, Northside',
      capacity: 200,
      currentOccupancy: 50,
      status: 'available',
      amenities: ['wifi', 'food'],
      phone: '(555) 456-7890',
      distance: '5.2 miles',
      directions: 'Take Elm Street north, church on the right'
    },
    {
      id: 'shelter-5',
      name: 'Southside Civic Center',
      address: '654 Maple Drive, Southside',
      capacity: 600,
      currentOccupancy: 100,
      status: 'available',
      amenities: ['wifi', 'food', 'medical', 'pets', 'accessibility'],
      phone: '(555) 567-8901',
      distance: '6.8 miles',
      directions: 'Take Maple Drive south past the mall'
    }
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default'
      case 'moderate': return 'secondary'
      case 'near-capacity': return 'destructive'
      case 'full': return 'destructive'
      default: return 'secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'AVAILABLE'
      case 'moderate': return 'MODERATE OCCUPANCY'
      case 'near-capacity': return 'NEAR CAPACITY'
      case 'full': return 'FULL'
      default: return 'UNKNOWN'
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />
      case 'food': return <Coffee className="h-4 w-4" />
      case 'medical': return <Shield className="h-4 w-4" />
      case 'pets': return <Shield className="h-4 w-4" />
      case 'accessibility': return <Accessibility className="h-4 w-4" />
      case 'bedding': return <Bed className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return 'WiFi'
      case 'food': return 'Food'
      case 'medical': return 'Medical'
      case 'pets': return 'Pet-Friendly'
      case 'accessibility': return 'Accessible'
      case 'bedding': return 'Bedding'
      default: return amenity
    }
  }

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Emergency Shelters</AlertTitle>
        <AlertDescription>
          Find nearby emergency shelters with real-time capacity and amenity information. Check status before traveling.
        </AlertDescription>
      </Alert>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Nearest Available Shelters
          </CardTitle>
          <CardDescription>
            Quick access to the closest shelters with availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyShelters
              .filter(shelter => shelter.status === 'available')
              .slice(0, 3)
              .map((shelter) => (
                <div
                  key={shelter.id}
                  className="p-4 border rounded-lg bg-green-50 border-green-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-green-800">{shelter.name}</h3>
                    <Badge variant="default" className="bg-green-600">AVAILABLE</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{shelter.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{shelter.capacity - shelter.currentOccupancy} spots available</span>
                    </div>
                    <Button size="sm" className="w-full">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* All Shelters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            All Emergency Shelters
          </CardTitle>
          <CardDescription>
            Complete list of emergency shelters with detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyShelters.map((shelter) => (
              <div
                key={shelter.id}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{shelter.name}</h3>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">{shelter.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">{shelter.phone}</span>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(shelter.status)}>
                    {getStatusText(shelter.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Capacity</div>
                      <div className="font-semibold">{shelter.capacity} people</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Current</div>
                      <div className="font-semibold">{shelter.currentOccupancy} people</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Distance</div>
                      <div className="font-semibold">{shelter.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">ETA</div>
                      <div className="font-semibold">
                        {parseFloat(shelter.distance) * 2} min
                      </div>
                    </div>
                  </div>
                </div>

                {/* Occupancy Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Occupancy</span>
                    <span>{Math.round((shelter.currentOccupancy / shelter.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        shelter.status === 'available' 
                          ? 'bg-green-500' 
                          : shelter.status === 'moderate'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${(shelter.currentOccupancy / shelter.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {shelter.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{getAmenityLabel(amenity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Shelter
                  </Button>
                </div>

                {/* Directions */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <Navigation className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Directions:</div>
                      <div className="text-sm text-gray-600">{shelter.directions}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shelter Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Shelter Guidelines
          </CardTitle>
          <CardDescription>
            Important information for shelter residents and visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">What to Bring:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Personal identification and important documents
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Medications and medical supplies
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Clothing and personal hygiene items
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Phone chargers and emergency contacts
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Baby supplies if applicable
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">Shelter Rules:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Follow staff instructions and guidelines
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Respect other residents and their belongings
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Keep noise levels appropriate for shared spaces
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Report any safety concerns to staff immediately
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  No smoking or alcohol in shelter areas
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
