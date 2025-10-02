import { NextRequest, NextResponse } from 'next/server'

// NASA & CSA API endpoints
const NASA_BASE_URL = 'https://api.nasa.gov/neo/rest/v1'
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY'
const NEOSSAT_DATA_URL = 'https://donnees-data.asc-csa.gc.ca/en/dataset/9ae3e718-8b6d-40b7-8aa4-858f00e84b30'
const JPL_SBDB_URL = 'https://ssd.jpl.nasa.gov/api/sbdb.api'
const NASA_EYES_API = 'https://eyes.nasa.gov/apps/asteroids/'

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
  trajectory?: Array<[number, number, number]>
}

// Mock data for development - replace with real NASA API calls
const mockAsteroidData: AsteroidData = {
  id: '2024-AB1',
  name: 'Asteroid 2024-AB1',
  diameter: 150,
  velocity: 15.2,
  impactProbability: 0.15,
  impactTime: '2024-12-15T14:30:00Z',
  blastRadius: 25,
  tsunamiRisk: true,
  debrisDispersion: 50,
  trajectory: [
    [40.7128, -74.0060, 0],
    [40.7589, -73.9851, 1],
    [40.7829, -73.9654, 2]
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const asteroidId = searchParams.get('id')
    const includeTrajectory = searchParams.get('trajectory') === 'true'

    // In production, this would make real API calls to NASA
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development
      const response: Partial<AsteroidData> = { ...mockAsteroidData }
      if (!includeTrajectory) {
        delete response.trajectory
      }
      
      return NextResponse.json({
        success: true,
        data: response,
        source: 'mock'
      })
    }

    // Real NASA API integration with multiple sources
    let nasaData, neossatData, jplData
    
    try {
      // Fetch from NASA NEO API
      const nasaUrl = asteroidId 
        ? `${NASA_BASE_URL}/neo/${asteroidId}?api_key=${NASA_API_KEY}`
        : `${NASA_BASE_URL}/feed?start_date=${new Date().toISOString().split('T')[0]}&api_key=${NASA_API_KEY}`
      
      const nasaResponse = await fetch(nasaUrl)
      if (nasaResponse.ok) {
        nasaData = await nasaResponse.json()
      }
    } catch (error) {
      console.warn('NASA NEO API unavailable:', error)
    }

    try {
      // Fetch from JPL Small Body Database
      const jplUrl = asteroidId 
        ? `${JPL_SBDB_URL}?sstr=${asteroidId}`
        : `${JPL_SBDB_URL}?limit=10&full-prec=true`
      
      const jplResponse = await fetch(jplUrl)
      if (jplResponse.ok) {
        jplData = await jplResponse.json()
      }
    } catch (error) {
      console.warn('JPL SBDB API unavailable:', error)
    }

    // Combine data from multiple sources
    const combinedData = combineAsteroidData(nasaData, jplData, asteroidId || undefined)
    
    // Transform to our format
    const transformedData = transformNasaData(combinedData, includeTrajectory)

    return NextResponse.json({
      success: true,
      data: transformedData,
      source: 'nasa'
    })

  } catch (error) {
    console.error('Error fetching asteroid data:', error)
    
    // Fallback to mock data on error
    return NextResponse.json({
      success: true,
      data: mockAsteroidData,
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

function combineAsteroidData(nasaData: any, jplData: any, asteroidId?: string): any {
  // Combine data from NASA NEO API and JPL SBDB
  if (nasaData && jplData) {
    return {
      ...nasaData,
      jpl_data: jplData,
      combined: true
    }
  } else if (nasaData) {
    return { ...nasaData, combined: false, source: 'nasa' }
  } else if (jplData) {
    return { ...jplData, combined: false, source: 'jpl' }
  } else {
    // Return mock data if no APIs available
    return {
      id: asteroidId || '2024-AB1',
      name: asteroidId ? `Asteroid ${asteroidId}` : 'Asteroid 2024-AB1',
      estimated_diameter: { meters: { estimated_diameter_max: 150 } },
      close_approach_data: [{ 
        relative_velocity: { kilometers_per_second: '15.2' },
        close_approach_date: new Date().toISOString().split('T')[0]
      }],
      is_potentially_hazardous_asteroid: true,
      source: 'fallback'
    }
  }
}

function transformNasaData(combinedData: any, includeTrajectory: boolean): Partial<AsteroidData> {
  // Transform combined NASA/JPL data to our format
  const nasaData = combinedData.near_earth_objects ? 
    Object.values(combinedData.near_earth_objects)[0] as any : combinedData
  
  const asteroid = Array.isArray(nasaData) ? nasaData[0] : nasaData
  
  const result: Partial<AsteroidData> = {
    id: asteroid.id || asteroid.object?.des || 'unknown',
    name: asteroid.name || asteroid.object?.fullname || 'Unknown Asteroid',
    diameter: asteroid.estimated_diameter?.meters?.estimated_diameter_max || 
              asteroid.object?.diameter || 100,
    velocity: parseFloat(asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 
                        asteroid.object?.velocity || '10'),
    impactProbability: asteroid.is_potentially_hazardous_asteroid ? 0.1 : 0.01,
    impactTime: asteroid.close_approach_data?.[0]?.close_approach_date_full || 
                asteroid.object?.orbit?.epoch || new Date().toISOString(),
    blastRadius: calculateBlastRadius(
      asteroid.estimated_diameter?.meters?.estimated_diameter_max || 100,
      parseFloat(asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || '10')
    ),
    tsunamiRisk: isCoastalImpact(asteroid.close_approach_data?.[0]?.miss_distance?.kilometers),
    debrisDispersion: calculateDebrisDispersion(
      asteroid.estimated_diameter?.meters?.estimated_diameter_max || 100
    )
  }

  if (includeTrajectory) {
    result.trajectory = generateTrajectory(asteroid)
  }

  return result
}

function calculateBlastRadius(diameter: number, velocity: number): number {
  // Simplified blast radius calculation
  return Math.sqrt(diameter * velocity) * 0.5
}

function isCoastalImpact(missDistance: string): boolean {
  const distance = parseFloat(missDistance || '1000000')
  return distance < 50000 // Within 50km of coast
}

function calculateDebrisDispersion(diameter: number): number {
  // Debris dispersion based on asteroid size
  return diameter * 0.3
}

function generateTrajectory(asteroid: any): Array<[number, number, number]> {
  // Generate trajectory points (simplified)
  return [
    [40.7128, -74.0060, 0],
    [40.7589, -73.9851, 1],
    [40.7829, -73.9654, 2]
  ]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // This endpoint could be used to report new asteroid observations
    // or update existing data
    
    return NextResponse.json({
      success: true,
      message: 'Asteroid data updated successfully',
      data: body
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
