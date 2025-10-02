import { NextRequest, NextResponse } from 'next/server'

interface ResourceData {
  id: string
  type: 'shelter' | 'hospital' | 'evacuation_center'
  name: string
  capacity: number
  currentOccupancy: number
  location: [number, number]
  status: 'available' | 'full' | 'evacuated'
  address: string
  phone: string
  facilities: string[]
  lastUpdated: string
}

// Mock resource data - in production, this would come from MongoDB
const mockResources: ResourceData[] = [
  {
    id: 'shelter-1',
    type: 'shelter',
    name: 'Downtown Emergency Shelter',
    capacity: 500,
    currentOccupancy: 120,
    location: [40.7128, -74.0060],
    status: 'available',
    address: '123 Main St, New York, NY 10001',
    phone: '(555) 123-4567',
    facilities: ['Food', 'Water', 'Medical', 'WiFi'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'hospital-1',
    type: 'hospital',
    name: 'Metropolitan General Hospital',
    capacity: 800,
    currentOccupancy: 650,
    location: [40.7589, -73.9851],
    status: 'available',
    address: '456 Health Ave, New York, NY 10002',
    phone: '(555) 987-6543',
    facilities: ['Emergency Room', 'Surgery', 'ICU', 'Pharmacy'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'evac-1',
    type: 'evacuation_center',
    name: 'Central Park Evacuation Center',
    capacity: 2000,
    currentOccupancy: 0,
    location: [40.7829, -73.9654],
    status: 'available',
    address: '789 Park Blvd, New York, NY 10003',
    phone: '(555) 456-7890',
    facilities: ['Food', 'Water', 'Restrooms', 'Parking', 'WiFi'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'shelter-2',
    type: 'shelter',
    name: 'Brooklyn Community Center',
    capacity: 300,
    currentOccupancy: 45,
    location: [40.6782, -73.9442],
    status: 'available',
    address: '321 Community St, Brooklyn, NY 11201',
    phone: '(555) 234-5678',
    facilities: ['Food', 'Water', 'Restrooms', 'WiFi'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'hospital-2',
    type: 'hospital',
    name: 'Queens Medical Center',
    capacity: 600,
    currentOccupancy: 580,
    location: [40.7282, -73.7949],
    status: 'available',
    address: '654 Medical Dr, Queens, NY 11375',
    phone: '(555) 345-6789',
    facilities: ['Emergency Room', 'Surgery', 'ICU', 'Pharmacy', 'Laboratory'],
    lastUpdated: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius') || '50' // km

    let filteredResources = [...mockResources]

    // Filter by type
    if (type && ['shelter', 'hospital', 'evacuation_center'].includes(type)) {
      filteredResources = filteredResources.filter(r => r.type === type)
    }

    // Filter by status
    if (status && ['available', 'full', 'evacuated'].includes(status)) {
      filteredResources = filteredResources.filter(r => r.status === status)
    }

    // Filter by location (if coordinates provided)
    if (lat && lng) {
      const userLat = parseFloat(lat)
      const userLng = parseFloat(lng)
      const radiusKm = parseFloat(radius)

      filteredResources = filteredResources.filter(resource => {
        const distance = calculateDistance(
          userLat, userLng,
          resource.location[0], resource.location[1]
        )
        return distance <= radiusKm
      })
    }

    return NextResponse.json({
      success: true,
      data: filteredResources,
      count: filteredResources.length,
      source: 'mock'
    })

  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['type', 'name', 'capacity', 'location', 'address', 'phone']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create new resource
    const newResource: ResourceData = {
      id: `resource-${Date.now()}`,
      type: body.type,
      name: body.name,
      capacity: body.capacity,
      currentOccupancy: body.currentOccupancy || 0,
      location: body.location,
      status: body.status || 'available',
      address: body.address,
      phone: body.phone,
      facilities: body.facilities || [],
      lastUpdated: new Date().toISOString()
    }

    // In production, save to MongoDB
    mockResources.push(newResource)

    return NextResponse.json({
      success: true,
      data: newResource,
      message: 'Resource created successfully'
    })

  } catch (error) {
    console.error('Error creating resource:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Resource ID is required' },
        { status: 400 }
      )
    }

    // Find and update resource
    const resourceIndex = mockResources.findIndex(r => r.id === id)
    if (resourceIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      )
    }

    // Update resource
    mockResources[resourceIndex] = {
      ...mockResources[resourceIndex],
      ...updateData,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: mockResources[resourceIndex],
      message: 'Resource updated successfully'
    })

  } catch (error) {
    console.error('Error updating resource:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update resource' },
      { status: 500 }
    )
  }
}

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}
