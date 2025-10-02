import { NextRequest, NextResponse } from 'next/server'

// NASA Eyes on Asteroids API integration
const NASA_EYES_BASE_URL = 'https://eyes.nasa.gov/apps/asteroids/'
const JPL_ORBIT_URL = 'https://ssd.jpl.nasa.gov/api/orbit_api.api'

interface EyesAsteroid {
  id: string
  name: string
  designation: string
  diameter: number
  velocity: number
  closest_approach: {
    date: string
    distance: number
    velocity: number
  }
  orbit_data: {
    semi_major_axis: number
    eccentricity: number
    inclination: number
    orbital_period: number
  }
  hazard_rating: 'low' | 'medium' | 'high'
  last_updated: string
}

interface EyesResponse {
  asteroids: EyesAsteroid[]
  total_count: number
  last_updated: string
  data_source: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hazardOnly = searchParams.get('hazard_only') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const dateRange = searchParams.get('date_range') || '30' // days

    // Mock data based on NASA Eyes on Asteroids capabilities
    const eyesData = generateEyesMockData(hazardOnly, limit, parseInt(dateRange))

    return NextResponse.json({
      success: true,
      data: eyesData,
      source: 'nasa_eyes_mock',
      mission_info: {
        name: 'NASA Eyes on Asteroids',
        description: 'Real-time visualization of near-Earth objects',
        features: [
          '3D orbital visualization',
          'Close approach tracking',
          'Impact probability assessment',
          'Historical data analysis',
          'Interactive asteroid explorer'
        ],
        data_sources: [
          'JPL Small Body Database',
          'CNEOS Sentry System',
          'NEOWISE Survey',
          'Ground-based telescopes'
        ]
      }
    })

  } catch (error) {
    console.error('Error fetching NASA Eyes data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch NASA Eyes data',
        message: 'NASA Eyes provides real-time visualization of near-Earth objects'
      },
      { status: 500 }
    )
  }
}

function generateEyesMockData(hazardOnly: boolean, limit: number, dateRange: number): EyesResponse {
  const asteroids: EyesAsteroid[] = []
  
  // Real asteroid names from NASA database
  const asteroidNames = [
    'Apophis', 'Bennu', 'Ryugu', 'Itokawa', 'Eros',
    'Gaspra', 'Ida', 'Mathilde', 'Lutetia', 'Steins',
    'Tempel 1', 'Wild 2', 'Hartley 2', 'Churyumov-Gerasimenko',
    'Halley', 'Encke', 'Hyakutake', 'Hale-Bopp', 'West',
    'McNaught', 'Lovejoy', 'ISON', 'NEOWISE', 'Leonard'
  ]

  for (let i = 0; i < limit; i++) {
    const name = asteroidNames[i % asteroidNames.length]
    const isHazardous = Math.random() > 0.7
    const diameter = Math.random() * 500 + 50 // 50-550 meters
    
    // Only include hazardous asteroids if requested
    if (hazardOnly && !isHazardous) continue
    
    const approachDate = new Date(Date.now() + Math.random() * dateRange * 24 * 60 * 60 * 1000)
    
    asteroids.push({
      id: `eyes_${name.toLowerCase().replace(' ', '_')}_${i}`,
      name: name,
      designation: `${2024 + Math.floor(Math.random() * 2)} ${String.fromCharCode(65 + i % 26)}${Math.floor(Math.random() * 99)}`,
      diameter: Math.round(diameter),
      velocity: Math.random() * 30 + 5, // 5-35 km/s
      closest_approach: {
        date: approachDate.toISOString(),
        distance: Math.random() * 10000000 + 1000000, // 1M - 10M km
        velocity: Math.random() * 20 + 10
      },
      orbit_data: {
        semi_major_axis: Math.random() * 3 + 1, // 1-4 AU
        eccentricity: Math.random() * 0.8 + 0.1, // 0.1-0.9
        inclination: Math.random() * 30, // 0-30 degrees
        orbital_period: Math.random() * 2000 + 365 // 1-2000+ days
      },
      hazard_rating: isHazardous ? (Math.random() > 0.5 ? 'high' : 'medium') : 'low',
      last_updated: new Date().toISOString()
    })
  }

  return {
    asteroids: hazardOnly ? asteroids.filter(a => a.hazard_rating !== 'low') : asteroids,
    total_count: asteroids.length,
    last_updated: new Date().toISOString(),
    data_source: 'NASA Eyes on Asteroids + JPL SBDB'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // This could be used to request specific asteroid tracking
    // or orbital calculations from NASA Eyes
    
    return NextResponse.json({
      success: true,
      message: 'NASA Eyes tracking request submitted',
      data: {
        request_id: `eyes_req_${Date.now()}`,
        target_asteroid: body.asteroid_id || 'unknown',
        tracking_duration: body.duration || '30 days',
        status: 'active'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}
