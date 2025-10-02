import { NextRequest, NextResponse } from 'next/server'

interface PredictionRequest {
  asteroidData: {
    diameter: number
    velocity: number
    impactLocation: [number, number]
    impactTime: string
  }
  userLocation?: [number, number]
}

interface PredictionResponse {
  blastRadius: number
  tsunamiRisk: boolean
  debrisDispersion: number
  evacuationRoutes: Array<{
    id: string
    name: string
    distance: number
    estimatedTime: number
    trafficLevel: 'light' | 'medium' | 'heavy'
    safety: 'safe' | 'moderate' | 'risky'
  }>
  riskAssessment: {
    level: 'low' | 'medium' | 'high'
    factors: string[]
    recommendations: string[]
  }
  resourceAllocation: {
    sheltersNeeded: number
    hospitalsNeeded: number
    evacuationCentersNeeded: number
    estimatedEvacuees: number
  }
}

export async function GET(request: NextRequest) {
  try {
    // For GET requests, return mock predictions data
    const mockPredictions: PredictionResponse = {
      blastRadius: 25,
      tsunamiRisk: true,
      debrisDispersion: 50,
      evacuationRoutes: [
        {
          id: 'route-1',
          name: 'Highway 101 North',
          distance: 15.2,
          estimatedTime: 25,
          trafficLevel: 'light',
          safety: 'safe'
        },
        {
          id: 'route-2',
          name: 'Interstate 95 South',
          distance: 18.7,
          estimatedTime: 35,
          trafficLevel: 'medium',
          safety: 'moderate'
        }
      ],
      riskAssessment: {
        level: 'high',
        factors: ['Large blast radius', 'Tsunami risk'],
        recommendations: ['Immediate evacuation required', 'Evacuate to higher ground']
      },
      resourceAllocation: {
        sheltersNeeded: 50,
        hospitalsNeeded: 25,
        evacuationCentersNeeded: 12,
        estimatedEvacuees: 25000
      }
    }

    return NextResponse.json({
      success: true,
      data: mockPredictions,
      source: 'mock'
    })

  } catch (error) {
    console.error('Error fetching predictions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch predictions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PredictionRequest = await request.json()
    
    // Validate required fields
    if (!body.asteroidData) {
      return NextResponse.json(
        { success: false, error: 'Asteroid data is required' },
        { status: 400 }
      )
    }

    const { asteroidData, userLocation } = body

    // In production, this would call the FastAPI microservice
    // For now, we'll simulate AI predictions
    const predictions = await generateAIPredictions(asteroidData, userLocation)

    return NextResponse.json({
      success: true,
      data: predictions,
      source: 'ai_simulation'
    })

  } catch (error) {
    console.error('Error generating AI predictions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate predictions' },
      { status: 500 }
    )
  }
}

async function generateAIPredictions(
  asteroidData: PredictionRequest['asteroidData'],
  userLocation?: [number, number]
): Promise<PredictionResponse> {
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const { diameter, velocity, impactLocation } = asteroidData

  // Calculate blast radius based on asteroid size and velocity
  const blastRadius = Math.sqrt(diameter * velocity) * 0.5 // Simplified formula
  
  // Determine tsunami risk (coastal areas)
  const isCoastal = impactLocation[1] > -80 && impactLocation[1] < -70 // NYC area
  const tsunamiRisk = isCoastal && diameter > 100

  // Calculate debris dispersion
  const debrisDispersion = blastRadius * 2

  // Generate evacuation routes
  const evacuationRoutes = [
    {
      id: 'route-1',
      name: 'Primary Evacuation Route',
      distance: 15.2,
      estimatedTime: 25,
      trafficLevel: 'light' as const,
      safety: 'safe' as const
    },
    {
      id: 'route-2',
      name: 'Secondary Evacuation Route',
      distance: 18.7,
      estimatedTime: 35,
      trafficLevel: 'medium' as const,
      safety: 'moderate' as const
    },
    {
      id: 'route-3',
      name: 'Alternative Route',
      distance: 22.1,
      estimatedTime: 45,
      trafficLevel: 'heavy' as const,
      safety: 'risky' as const
    }
  ]

  // Risk assessment
  let riskLevel: 'low' | 'medium' | 'high' = 'low'
  const factors: string[] = []
  const recommendations: string[] = []

  if (blastRadius > 20) {
    riskLevel = 'high'
    factors.push('Large blast radius')
    recommendations.push('Immediate evacuation required')
  } else if (blastRadius > 10) {
    riskLevel = 'medium'
    factors.push('Moderate blast radius')
    recommendations.push('Prepare for evacuation')
  } else {
    factors.push('Small blast radius')
    recommendations.push('Monitor situation')
  }

  if (tsunamiRisk) {
    riskLevel = 'high'
    factors.push('Tsunami risk')
    recommendations.push('Evacuate to higher ground')
  }

  if (velocity > 20) {
    factors.push('High velocity impact')
    recommendations.push('Seek immediate shelter')
  }

  // Resource allocation estimates
  const estimatedEvacuees = Math.min(blastRadius * 1000, 100000) // Rough estimate
  const sheltersNeeded = Math.ceil(estimatedEvacuees / 500)
  const hospitalsNeeded = Math.ceil(estimatedEvacuees / 1000)
  const evacuationCentersNeeded = Math.ceil(estimatedEvacuees / 2000)

  return {
    blastRadius: Math.round(blastRadius * 10) / 10,
    tsunamiRisk,
    debrisDispersion: Math.round(debrisDispersion * 10) / 10,
    evacuationRoutes,
    riskAssessment: {
      level: riskLevel,
      factors,
      recommendations
    },
    resourceAllocation: {
      sheltersNeeded,
      hospitalsNeeded,
      evacuationCentersNeeded,
      estimatedEvacuees
    }
  }
}

