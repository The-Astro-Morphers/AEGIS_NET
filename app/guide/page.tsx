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
  Navigation,
  Search,
  Edit
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
  const [isLoading, setIsLoading] = useState(false)
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showLocationSearch, setShowLocationSearch] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)

  // Check if Google Maps API is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        setGoogleMapsLoaded(true)
        console.log('Google Maps API loaded successfully')
      } else {
        console.log('Google Maps API not yet loaded')
      }
    }

    // Check immediately
    checkGoogleMaps()

    // Check every 500ms for up to 10 seconds
    const interval = setInterval(() => {
      checkGoogleMaps()
      if (googleMapsLoaded) {
        clearInterval(interval)
      }
    }, 500)

    // Clear interval after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval)
      if (!googleMapsLoaded) {
        console.warn('Google Maps API failed to load within 10 seconds')
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [googleMapsLoaded])

  // Search for location using Google Places API
  const searchLocation = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    try {
      // Try Google Places API first if loaded
      if (googleMapsLoaded && typeof window !== 'undefined' && window.google && window.google.maps) {
        console.log('Using Google Places API for search:', query)
        const service = new window.google.maps.places.PlacesService(document.createElement('div'))
        
        const request = {
          query: query,
          fields: ['name', 'formatted_address', 'geometry', 'place_id']
        }

        service.textSearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            console.log('Google Places API results:', results.length, 'results found')
            const formattedResults = results.map(place => ({
              address: place.name || place.formatted_address,
              latitude: place.geometry?.location?.lat() || 0,
              longitude: place.geometry?.location?.lng() || 0,
              formatted_address: place.formatted_address || place.name,
              place_id: place.place_id
            }))
            setSearchResults(formattedResults)
          } else {
            console.warn('Google Places API error:', status)
            // Fallback to mock data
            setSearchResults(getMockResults(query))
          }
          setIsSearching(false)
        })
      } else {
        // Fallback to mock data if Google Maps API not loaded
        console.log('Google Maps API not available, using mock data')
        setSearchResults(getMockResults(query))
        setIsSearching(false)
      }
    } catch (error) {
      console.error('Error searching location:', error)
      setSearchResults(getMockResults(query))
      setIsSearching(false)
    }
  }

  // Mock results fallback
  const getMockResults = (query: string) => {
    const mockResults = [
      {
        address: '123 Main St, New York, NY 10001',
        latitude: 40.7128,
        longitude: -74.0060,
        formatted_address: '123 Main St, New York, NY 10001, USA',
        place_id: 'mock_1'
      },
      {
        address: '456 Broadway, New York, NY 10013',
        latitude: 40.7589,
        longitude: -73.9851,
        formatted_address: '456 Broadway, New York, NY 10013, USA',
        place_id: 'mock_2'
      },
      {
        address: '789 5th Ave, New York, NY 10022',
        latitude: 40.7505,
        longitude: -73.9934,
        formatted_address: '789 5th Ave, New York, NY 10022, USA',
        place_id: 'mock_3'
      }
    ]

    // Filter results based on query
    return mockResults.filter(result =>
      result.address.toLowerCase().includes(query.toLowerCase()) ||
      result.formatted_address.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Get location using IP-based geolocation as fallback
  const getLocationByIP = async () => {
    try {
      console.log('Trying IP-based geolocation...')
      const response = await fetch('https://ipapi.co/json/')
      if (!response.ok) throw new Error('IP geolocation failed')
      
      const data = await response.json()
      console.log('IP geolocation data:', data)
      
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        address: `${data.city}, ${data.region}, ${data.country_name}`,
        source: 'ip'
      }
    } catch (error) {
      console.error('IP geolocation error:', error)
      throw new Error('Unable to determine location. Please search for your address manually.')
    }
  }

  // Use current location
  const useCurrentLocation = async () => {
    setIsLoading(true)
    setLocationPermission('pending')
    setError(null)

    try {
      let locationData: any = null

      // First try browser geolocation
      if (typeof window !== 'undefined' && navigator.geolocation) {
        try {
          console.log('Trying browser geolocation...')
          console.log('Protocol:', window.location.protocol)
          console.log('Hostname:', window.location.hostname)
          
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                console.log('Location access granted:', pos)
                resolve(pos)
              }, 
              (error) => {
                console.error('Geolocation error details:', {
                  code: error.code,
                  message: error.message,
                  PERMISSION_DENIED: error.PERMISSION_DENIED,
                  POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
                  TIMEOUT: error.TIMEOUT
                })
                
                switch (error.code) {
                  case error.PERMISSION_DENIED:
                    reject(new Error('Location access denied by user'))
                    break
                  case error.POSITION_UNAVAILABLE:
                    reject(new Error('Location information unavailable'))
                    break
                  case error.TIMEOUT:
                    reject(new Error('Location request timed out'))
                    break
                  default:
                    reject(new Error('Unknown geolocation error: ' + error.message))
                    break
                }
              },
              {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000
              }
            )
          })

          locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Current Location (GPS)',
            source: 'gps'
          }
        } catch (geoError) {
          console.log('Browser geolocation failed, trying IP-based fallback...')
          locationData = await getLocationByIP()
        }
      } else {
        console.log('Browser geolocation not available, trying IP-based fallback...')
        locationData = await getLocationByIP()
      }

      const { latitude, longitude, address, source } = locationData
      
      // Mock location data - in real implementation, this would come from APIs
      const mockLocationData: LocationData = {
        latitude,
        longitude,
        address: address || 'Current Location',
        riskLevel: 'medium', // This would be calculated based on distance to impact zone
        distanceToImpact: 15.2, // km
        estimatedArrival: '2024-12-15T14:30:00Z'
      }

      setLocation(mockLocationData)
      setLocationPermission('granted')
      setShowLocationSearch(false)

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
    } catch (error: any) {
      console.error('Error getting location:', error)
      setLocationPermission('denied')
      
      // Show more specific error message
      if (error.message.includes('Unable to determine location')) {
        setError('Unable to determine your location automatically. Please search for your address manually using the search box above.')
      } else if (error.message.includes('denied')) {
        setError('Location access was denied. We\'ll try to use your approximate location based on your internet connection instead.')
        // Try IP-based location as fallback
        try {
          const ipLocation = await getLocationByIP()
          const { latitude, longitude, address } = ipLocation
          const mockLocationData: LocationData = {
            latitude,
            longitude,
            address: address || 'Approximate Location',
            riskLevel: 'medium',
            distanceToImpact: 15.2,
            estimatedArrival: '2024-12-15T14:30:00Z'
          }
          setLocation(mockLocationData)
          setLocationPermission('granted')
          setShowLocationSearch(false)
          setError(null)
          
          // Generate safety instructions
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
          return
        } catch (ipError) {
          console.error('IP location also failed:', ipError)
        }
      } else if (error.message.includes('unavailable')) {
        setError('Location services are unavailable. Please check your device settings or search for your address manually.')
      } else {
        setError('Failed to get location: ' + error.message + '. Please search for your address manually.')
      }
    }
    setIsLoading(false)
  }

  // Select location from search results
  const selectLocation = (result: any) => {
    const locationData: LocationData = {
      latitude: result.latitude,
      longitude: result.longitude,
      address: result.formatted_address,
      riskLevel: 'medium', // This would be calculated based on distance to impact zone
      distanceToImpact: 15.2, // km
      estimatedArrival: '2024-12-15T14:30:00Z'
    }

    setLocation(locationData)
    setShowLocationSearch(false)
    setSearchQuery('')
    setSearchResults([])

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
  }

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

  if (showLocationSearch) {
    return (
      <div className="space-y-6">
        {/* Location Search Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Location</h1>
          <p className="text-gray-600">Enter your address or use your current location to get personalized safety guidance</p>
        </div>

        {/* Location Search Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Location Search</CardTitle>
            <CardDescription className="text-center">
              Search by street address, city, state, or ZIP code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Address Search */}
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-700">
                Enter Address
              </label>
              <div className="flex space-x-2">
                <input
                  id="address"
                  type="text"
                  placeholder="e.g., 123 Main St, New York, NY 10001"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      searchLocation(searchQuery)
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emergency-low focus:border-transparent"
                />
                <Button 
                  onClick={() => searchLocation(searchQuery)}
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-emergency-low hover:bg-emergency-low/90"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search Results</label>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => selectLocation(result)}
                      className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{result.address}</p>
                          <p className="text-xs text-gray-500">{result.formatted_address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

                {/* Current Location Button */}
                <Button
                  onClick={useCurrentLocation}
                  className="w-full bg-emergency-low hover:bg-emergency-low/90"
                  disabled={isLoading}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {isLoading ? 'Getting Location...' : 'Use My Current Location'}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  We'll try GPS first, then use your approximate location based on your internet connection
                </p>
                
                {/* Google Maps API Status */}
                <div className="text-xs text-center">
                  {googleMapsLoaded ? (
                    <span className="text-green-600">✓ Google Maps API loaded - Enhanced search available</span>
                  ) : (
                    <span className="text-yellow-600">⏳ Loading Google Maps API...</span>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Location Error</AlertTitle>
                    <AlertDescription>
                      <p>{error}</p>
                      <Button
                        onClick={() => setError(null)}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        Dismiss
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Location Permission Status */}
                {locationPermission === 'denied' && !error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Location Access Denied</AlertTitle>
                    <AlertDescription>
                      <div className="space-y-2">
                        <p>Location access was denied. This could be because:</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>You clicked "Block" when prompted for location access</li>
                          <li>Your browser has location services disabled</li>
                          <li>You're using an insecure connection (HTTP instead of HTTPS)</li>
                          <li>Your device's location services are turned off</li>
                        </ul>
                        <p className="text-sm">
                          <strong>Solutions:</strong> Check your browser's location settings,
                          ensure you're using HTTPS, or search for your address manually above.
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

            {locationPermission === 'pending' && (
              <Alert>
                <Navigation className="h-4 w-4" />
                <AlertTitle>Requesting Location Access</AlertTitle>
                <AlertDescription>
                  Please allow location access in your browser to get personalized safety guidance.
                  If you don't see a permission prompt, check your browser's address bar for a location icon.
                </AlertDescription>
              </Alert>
            )}

            {/* Retry Button for Denied Access */}
            {locationPermission === 'denied' && (
              <div className="space-y-2">
                <Button
                  onClick={useCurrentLocation}
                  variant="outline"
                  className="w-full"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Retry Location Access
                </Button>
                
                {/* Debug Information */}
                <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
                  <strong>Debug Info:</strong><br/>
                  • Browser: {typeof navigator !== 'undefined' ? 'Supported' : 'Not supported'}<br/>
                  • Geolocation API: {typeof navigator?.geolocation !== 'undefined' ? 'Available' : 'Not available'}<br/>
                  • Protocol: {typeof window !== 'undefined' ? window.location.protocol : 'Unknown'}<br/>
                  • Host: {typeof window !== 'undefined' ? window.location.host : 'Unknown'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Example Addresses */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-lg">Example Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => {
                  setSearchQuery('123 Main St, New York, NY 10001')
                  searchLocation('123 Main St, New York, NY 10001')
                }}
                className="p-2 text-left text-emergency-low hover:bg-gray-50 rounded"
              >
                123 Main St, New York, NY 10001
              </button>
              <button
                onClick={() => {
                  setSearchQuery('456 Broadway, New York, NY 10013')
                  searchLocation('456 Broadway, New York, NY 10013')
                }}
                className="p-2 text-left text-emergency-low hover:bg-gray-50 rounded"
              >
                456 Broadway, New York, NY 10013
              </button>
              <button
                onClick={() => {
                  setSearchQuery('789 5th Ave, New York, NY 10022')
                  searchLocation('789 5th Ave, New York, NY 10022')
                }}
                className="p-2 text-left text-emergency-low hover:bg-gray-50 rounded"
              >
                789 5th Ave, New York, NY 10022
              </button>
              <button
                onClick={() => {
                  setSearchQuery('New York, NY')
                  searchLocation('New York, NY')
                }}
                className="p-2 text-left text-emergency-low hover:bg-gray-50 rounded"
              >
                New York, NY
              </button>
            </div>
          </CardContent>
        </Card>
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
      {/* Location Header with Change Button */}
      {location && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Safety Guidance</h1>
            <p className="text-gray-600">Personalized instructions for your location</p>
          </div>
          <Button
            onClick={() => setShowLocationSearch(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Change Location</span>
          </Button>
        </div>
      )}

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
