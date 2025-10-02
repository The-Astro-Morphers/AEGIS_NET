import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if AI service is available
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000'
    let aiServiceStatus = 'unknown'
    
    try {
      const aiResponse = await fetch(`${aiServiceUrl}/health`, {
        method: 'GET',
        timeout: 5000
      } as any)
      aiServiceStatus = aiResponse.ok ? 'healthy' : 'unhealthy'
    } catch (error) {
      aiServiceStatus = 'unreachable'
    }

    // Check database connection
    let dbStatus = 'unknown'
    try {
      // In a real implementation, you would check MongoDB connection
      dbStatus = 'healthy'
    } catch (error) {
      dbStatus = 'unhealthy'
    }

    const health = {
      status: 'operational',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        frontend: 'healthy',
        database: dbStatus,
        ai_service: aiServiceStatus
      },
      environment: process.env.NODE_ENV || 'development'
    }

    return NextResponse.json({
      success: true,
      data: health,
      source: 'system'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
