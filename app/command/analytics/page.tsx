'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  AlertTriangle,
  Clock,
  MapPin,
  Target,
  Activity,
  Zap,
  Globe,
  Shield
} from 'lucide-react'

interface AnalyticsData {
  impactPredictions: {
    blastRadius: number
    tsunamiRisk: boolean
    debrisDispersion: number
    affectedPopulation: number
    evacuationTime: string
  }
  resourceUtilization: {
    shelters: { total: number; occupied: number; percentage: number }
    hospitals: { total: number; occupied: number; percentage: number }
    evacuationCenters: { total: number; occupied: number; percentage: number }
  }
  evacuationMetrics: {
    totalEvacuated: number
    evacuationRate: number
    averageEvacuationTime: string
    routesUtilized: number
  }
  systemPerformance: {
    apiResponseTime: number
    dataAccuracy: number
    predictionConfidence: number
    systemUptime: number
  }
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch data from multiple APIs
        const [asteroidResponse, resourcesResponse, predictionsResponse] = await Promise.all([
          fetch('/api/asteroids'),
          fetch('/api/resources'),
          fetch('/api/ai/predictions')
        ])

        const asteroidData = asteroidResponse.ok ? await asteroidResponse.json() : null
        const resourcesData = resourcesResponse.ok ? await resourcesResponse.json() : null
        const predictionsData = predictionsResponse.ok ? await predictionsResponse.json() : null

        // Combine and process data
        const processedData: AnalyticsData = {
          impactPredictions: {
            blastRadius: asteroidData?.data?.blastRadius || 25,
            tsunamiRisk: asteroidData?.data?.tsunamiRisk || true,
            debrisDispersion: asteroidData?.data?.debrisDispersion || 50,
            affectedPopulation: predictionsData?.data?.affectedPopulation || 150000,
            evacuationTime: predictionsData?.data?.evacuationTime || '2.5 hours'
          },
          resourceUtilization: {
            shelters: { total: 8, occupied: 5, percentage: 62.5 },
            hospitals: { total: 12, occupied: 9, percentage: 75 },
            evacuationCenters: { total: 15, occupied: 3, percentage: 20 }
          },
          evacuationMetrics: {
            totalEvacuated: 45000,
            evacuationRate: 65.2,
            averageEvacuationTime: '45 minutes',
            routesUtilized: 8
          },
          systemPerformance: {
            apiResponseTime: 180,
            dataAccuracy: 94.5,
            predictionConfidence: 87.3,
            systemUptime: 99.8
          }
        }

        setAnalyticsData(processedData)
      } catch (error) {
        console.error('Error fetching analytics:', error)
        // Fallback to mock data
        setAnalyticsData({
          impactPredictions: {
            blastRadius: 25,
            tsunamiRisk: true,
            debrisDispersion: 50,
            affectedPopulation: 150000,
            evacuationTime: '2.5 hours'
          },
          resourceUtilization: {
            shelters: { total: 8, occupied: 5, percentage: 62.5 },
            hospitals: { total: 12, occupied: 9, percentage: 75 },
            evacuationCenters: { total: 15, occupied: 3, percentage: 20 }
          },
          evacuationMetrics: {
            totalEvacuated: 45000,
            evacuationRate: 65.2,
            averageEvacuationTime: '45 minutes',
            routesUtilized: 8
          },
          systemPerformance: {
            apiResponseTime: 180,
            dataAccuracy: 94.5,
            predictionConfidence: 87.3,
            systemUptime: 99.8
          }
        })
      }
      setIsLoading(false)
    }

    fetchAnalytics()
  }, [])

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-500'
    if (value >= thresholds.warning) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Activity className="h-4 w-4 text-gray-500" />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nasa-orange mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400">Real-time insights and performance metrics for AEGIS NET</p>
        </div>
        <Button className="bg-nasa-orange hover:bg-nasa-orange/90">
          <BarChart3 className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Affected Population</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData?.impactPredictions.affectedPopulation.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-red-500" />
            </div>
            <div className="flex items-center mt-2">
              {getTrendIcon(150000, 145000)}
              <span className="text-sm text-gray-400 ml-1">+3.4% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Evacuation Rate</p>
                <p className="text-2xl font-bold text-green-500">
                  {analyticsData?.evacuationMetrics.evacuationRate}%
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              {getTrendIcon(65.2, 62.1)}
              <span className="text-sm text-gray-400 ml-1">+5.0% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">System Uptime</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(analyticsData?.systemPerformance.systemUptime || 0, { good: 99, warning: 95 })}`}>
                  {analyticsData?.systemPerformance.systemUptime}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-400 ml-1">All systems operational</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Prediction Confidence</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(analyticsData?.systemPerformance.predictionConfidence || 0, { good: 85, warning: 70 })}`}>
                  {analyticsData?.systemPerformance.predictionConfidence}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              {getTrendIcon(87.3, 85.1)}
              <span className="text-sm text-gray-400 ml-1">+2.6% accuracy</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Impact Predictions
            </CardTitle>
            <CardDescription className="text-gray-400">
              AI-powered impact analysis and risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Blast Radius</span>
                <span className="text-white font-semibold">
                  {analyticsData?.impactPredictions.blastRadius} km
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Debris Dispersion</span>
                <span className="text-white font-semibold">
                  {analyticsData?.impactPredictions.debrisDispersion} km
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Tsunami Risk</span>
                <Badge variant={analyticsData?.impactPredictions.tsunamiRisk ? 'high' : 'low'}>
                  {analyticsData?.impactPredictions.tsunamiRisk ? 'HIGH' : 'LOW'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Evacuation Time</span>
                <span className="text-white font-semibold">
                  {analyticsData?.impactPredictions.evacuationTime}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Resource Utilization
            </CardTitle>
            <CardDescription className="text-gray-400">
              Current capacity and usage across all facilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Shelters</span>
                  <span className="text-white font-semibold">
                    {analyticsData?.resourceUtilization.shelters.occupied}/{analyticsData?.resourceUtilization.shelters.total}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${analyticsData?.resourceUtilization.shelters.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Hospitals</span>
                  <span className="text-white font-semibold">
                    {analyticsData?.resourceUtilization.hospitals.occupied}/{analyticsData?.resourceUtilization.hospitals.total}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${analyticsData?.resourceUtilization.hospitals.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Evacuation Centers</span>
                  <span className="text-white font-semibold">
                    {analyticsData?.resourceUtilization.evacuationCenters.occupied}/{analyticsData?.resourceUtilization.evacuationCenters.total}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${analyticsData?.resourceUtilization.evacuationCenters.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              System Performance
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time system health and API performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">API Response Time</span>
                <span className={`font-semibold ${getPerformanceColor(analyticsData?.systemPerformance.apiResponseTime || 0, { good: 200, warning: 500 })}`}>
                  {analyticsData?.systemPerformance.apiResponseTime}ms
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Data Accuracy</span>
                <span className={`font-semibold ${getPerformanceColor(analyticsData?.systemPerformance.dataAccuracy || 0, { good: 90, warning: 80 })}`}>
                  {analyticsData?.systemPerformance.dataAccuracy}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Prediction Confidence</span>
                <span className={`font-semibold ${getPerformanceColor(analyticsData?.systemPerformance.predictionConfidence || 0, { good: 85, warning: 70 })}`}>
                  {analyticsData?.systemPerformance.predictionConfidence}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">System Uptime</span>
                <span className={`font-semibold ${getPerformanceColor(analyticsData?.systemPerformance.systemUptime || 0, { good: 99, warning: 95 })}`}>
                  {analyticsData?.systemPerformance.systemUptime}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Evacuation Metrics
            </CardTitle>
            <CardDescription className="text-gray-400">
              Current evacuation progress and route utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Evacuated</span>
                <span className="text-white font-semibold">
                  {analyticsData?.evacuationMetrics.totalEvacuated.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Evacuation Rate</span>
                <span className="text-green-500 font-semibold">
                  {analyticsData?.evacuationMetrics.evacuationRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Evacuation Time</span>
                <span className="text-white font-semibold">
                  {analyticsData?.evacuationMetrics.averageEvacuationTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Routes Utilized</span>
                <span className="text-white font-semibold">
                  {analyticsData?.evacuationMetrics.routesUtilized}/12
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Recommendations */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Alerts & Recommendations
          </CardTitle>
          <CardDescription className="text-gray-400">
            Critical insights and recommended actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Hospital Utilization</AlertTitle>
              <AlertDescription>
                Hospital capacity is at 75%. Consider activating additional medical facilities or redirecting non-critical patients.
              </AlertDescription>
            </Alert>
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Evacuation Progress</AlertTitle>
              <AlertDescription>
                Evacuation rate has improved by 5% in the last hour. Current rate of 65.2% is above target.
              </AlertDescription>
            </Alert>
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertTitle>System Performance</AlertTitle>
              <AlertDescription>
                All systems are operating normally. API response time is within acceptable limits at 180ms.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
