'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Database, 
  Globe, 
  Satellite, 
  Eye, 
  Zap,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

interface ApiData {
  asteroids?: any
  neossat?: any
  nasaEyes?: any
  resources?: any
  health?: any
}

interface ApiStatus {
  name: string
  endpoint: string
  status: 'loading' | 'success' | 'error'
  lastUpdated: string
  data?: any
  error?: string
}

export default function ApiDataPage() {
  const [apiData, setApiData] = useState<ApiData>({})
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const apiEndpoints = [
    {
      name: 'NASA Asteroids',
      endpoint: '/api/asteroids',
      icon: <Globe className="h-5 w-5" />,
      description: 'Real-time asteroid data from NASA NEO API'
    },
    {
      name: 'NEOSSat Observations',
      endpoint: '/api/neossat',
      icon: <Satellite className="h-5 w-5" />,
      description: 'Canadian Space Agency satellite observations'
    },
    {
      name: 'NASA Eyes Data',
      endpoint: '/api/nasa-eyes',
      icon: <Eye className="h-5 w-5" />,
      description: 'Real-time visualization data from NASA Eyes'
    },
    {
      name: 'Emergency Resources',
      endpoint: '/api/resources',
      icon: <Database className="h-5 w-5" />,
      description: 'Shelters, hospitals, and evacuation centers'
    },
    {
      name: 'AI Predictions',
      endpoint: '/api/ai/predictions',
      icon: <Zap className="h-5 w-5" />,
      description: 'AI-powered impact predictions'
    },
    {
      name: 'System Health',
      endpoint: '/api/health',
      icon: <CheckCircle className="h-5 w-5" />,
      description: 'Overall system health check'
    }
  ]

  const fetchApiData = async () => {
    setIsLoading(true)
    const newApiStatuses: ApiStatus[] = []

    for (const api of apiEndpoints) {
      const status: ApiStatus = {
        name: api.name,
        endpoint: api.endpoint,
        status: 'loading',
        lastUpdated: new Date().toISOString()
      }

      try {
        const response = await fetch(api.endpoint)
        const data = await response.json()
        
        if (response.ok && data.success) {
          status.status = 'success'
          status.data = data
          setApiData(prev => ({ ...prev, [api.name.toLowerCase().replace(/\s+/g, '')]: data }))
        } else {
          status.status = 'error'
          status.error = data.error || 'API request failed'
        }
      } catch (error) {
        status.status = 'error'
        status.error = error instanceof Error ? error.message : 'Network error'
      }

      newApiStatuses.push(status)
    }

    setApiStatuses(newApiStatuses)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchApiData()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'loading':
        return 'default'
      case 'success':
        return 'low'
      case 'error':
        return 'high'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API Data Dashboard</h1>
          <p className="text-gray-400">Real-time data from NASA, CSA, and other sources</p>
        </div>
        <Button onClick={fetchApiData} disabled={isLoading} className="bg-nasa-orange hover:bg-nasa-orange/90">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh All APIs
        </Button>
      </div>

      {/* API Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apiEndpoints.map((api, index) => {
          const status = apiStatuses.find(s => s.name === api.name)
          return (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {api.icon}
                    <CardTitle className="text-white text-lg">{api.name}</CardTitle>
                  </div>
                  {status && getStatusIcon(status.status)}
                </div>
                <CardDescription className="text-gray-400 text-sm">
                  {api.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Status</span>
                    <Badge variant={status ? getStatusColor(status.status) : 'default'}>
                      {status?.status || 'Unknown'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Endpoint</span>
                    <code className="text-xs bg-slate-700 px-2 py-1 rounded">
                      {api.endpoint}
                    </code>
                  </div>
                  {status?.error && (
                    <Alert variant="destructive" className="mt-2">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        {status.error}
                      </AlertDescription>
                    </Alert>
                  )}
                  {status?.data && (
                    <div className="text-xs text-gray-400">
                      Last updated: {new Date(status.lastUpdated).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Data Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asteroid Data */}
        {apiData.asteroids && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                NASA Asteroid Data
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time asteroid information from NASA NEO API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white font-mono">{apiData.asteroids.data.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Diameter:</span>
                  <span className="text-white">{apiData.asteroids.data.diameter}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Velocity:</span>
                  <span className="text-white">{apiData.asteroids.data.velocity} km/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Impact Probability:</span>
                  <Badge variant={apiData.asteroids.data.impactProbability > 0.1 ? 'high' : 'medium'}>
                    {(apiData.asteroids.data.impactProbability * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Blast Radius:</span>
                  <span className="text-white">{apiData.asteroids.data.blastRadius} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tsunami Risk:</span>
                  <Badge variant={apiData.asteroids.data.tsunamiRisk ? 'high' : 'low'}>
                    {apiData.asteroids.data.tsunamiRisk ? 'YES' : 'NO'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Source:</span>
                  <span className="text-green-400">{apiData.asteroids.source}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* NEOSSat Data */}
        {apiData.neossat && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Satellite className="h-5 w-5 mr-2" />
                NEOSSat Observations
              </CardTitle>
              <CardDescription className="text-gray-400">
                Canadian Space Agency satellite data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Observations:</span>
                  <span className="text-white">{apiData.neossat.data.total_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mission Status:</span>
                  <Badge variant="low">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Altitude:</span>
                  <span className="text-white">800 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Orbital Period:</span>
                  <span className="text-white">100 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Source:</span>
                  <span className="text-blue-400">{apiData.neossat.source}</span>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  Recent observations include asteroids, comets, satellites, and space debris
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* NASA Eyes Data */}
        {apiData.nasaEyes && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                NASA Eyes Data
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time visualization and tracking data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Asteroids Tracked:</span>
                  <span className="text-white">{apiData.nasaEyes.data.total_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Source:</span>
                  <span className="text-purple-400">{apiData.nasaEyes.source}</span>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  Includes orbital data, close approach information, and hazard assessments
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources Data */}
        {apiData.resources && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Emergency Resources
              </CardTitle>
              <CardDescription className="text-gray-400">
                Available shelters, hospitals, and evacuation centers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Resources:</span>
                  <span className="text-white">{apiData.resources.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Source:</span>
                  <span className="text-orange-400">{apiData.resources.source}</span>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  Includes shelters, hospitals, and evacuation centers with real-time capacity data
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Raw Data View */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Raw API Responses</CardTitle>
          <CardDescription className="text-gray-400">
            JSON data from all API endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto max-h-96">
            {JSON.stringify(apiData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
