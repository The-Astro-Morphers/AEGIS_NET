'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Shield,
  AlertTriangle,
  MapPin,
  Clock,
  Users,
  Car,
  Home,
  Building2,
  Heart,
  Navigation,
  Search,
  Edit,
  Target,
  Activity,
  Zap
} from 'lucide-react'

interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical'
  riskFactors: Array<{
    id: string
    name: string
    level: 'low' | 'medium' | 'high' | 'critical'
    description: string
    impact: string
    mitigation: string
  }>
  locationData: {
    address: string
    latitude: number
    longitude: number
    distanceToImpact: number
    elevation: number
    populationDensity: number
  }
  timeToImpact: {
    hours: number
    minutes: number
    confidence: number
  }
  evacuationReadiness: {
    routesAvailable: number
    shelterCapacity: number
    transportationAccess: boolean
    medicalFacilities: number
  }
  recommendations: Array<{
    priority: 'immediate' | 'urgent' | 'preparatory'
    action: string
    timeframe: string
    description: string
  }>
}

export default function RiskAssessmentPage() {
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRiskAssessment = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Mock risk assessment data
        const mockAssessment: RiskAssessment = {
          overallRisk: 'high',
          riskFactors: [
            {
              id: 'blast-radius',
              name: 'Blast Radius Impact',
              level: 'high',
              description: 'Your location is within the predicted blast radius',
              impact: 'High risk of structural damage and injury',
              mitigation: 'Evacuate immediately to designated safe zones'
            },
            {
              id: 'tsunami-risk',
              name: 'Tsunami Risk',
              level: 'critical',
              description: 'Coastal location at risk of tsunami waves',
              impact: 'Severe flooding and wave damage expected',
              mitigation: 'Move to higher ground immediately'
            },
            {
              id: 'debris-fallout',
              name: 'Debris Fallout',
              level: 'medium',
              description: 'Risk of falling debris from impact',
              impact: 'Potential injury from falling objects',
              mitigation: 'Seek shelter in reinforced structures'
            },
            {
              id: 'air-quality',
              name: 'Air Quality',
              level: 'high',
              description: 'Dust and particulate matter in air',
              impact: 'Respiratory issues and reduced visibility',
              mitigation: 'Use protective masks and stay indoors'
            },
            {
              id: 'infrastructure',
              name: 'Infrastructure Damage',
              level: 'medium',
              description: 'Utilities and transportation may be affected',
              impact: 'Power outages and limited mobility',
              mitigation: 'Prepare backup power and alternative routes'
            }
          ],
          locationData: {
            address: '123 Main St, New York, NY 10001',
            latitude: 40.7128,
            longitude: -74.0060,
            distanceToImpact: 15.2,
            elevation: 10,
            populationDensity: 8500
          },
          timeToImpact: {
            hours: 12,
            minutes: 30,
            confidence: 85
          },
          evacuationReadiness: {
            routesAvailable: 3,
            shelterCapacity: 75,
            transportationAccess: true,
            medicalFacilities: 2
          },
          recommendations: [
            {
              priority: 'immediate',
              action: 'Evacuate to higher ground',
              timeframe: 'Within 2 hours',
              description: 'Move to designated evacuation centers or areas above 50 feet elevation'
            },
            {
              priority: 'urgent',
              action: 'Secure important documents',
              timeframe: 'Within 1 hour',
              description: 'Gather identification, medical records, and emergency supplies'
            },
            {
              priority: 'urgent',
              action: 'Contact family members',
              timeframe: 'Within 30 minutes',
              description: 'Inform family of your evacuation plan and destination'
            },
            {
              priority: 'preparatory',
              action: 'Monitor official updates',
              timeframe: 'Ongoing',
              description: 'Stay tuned to emergency broadcasts and official communications'
            }
          ]
        }

        setRiskAssessment(mockAssessment)
      } catch (e: any) {
        console.error('Error fetching risk assessment:', e)
        setError(e.message || 'Failed to load risk assessment')
      }
      setIsLoading(false)
    }

    fetchRiskAssessment()
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskVariant = (level: string) => {
    switch (level) {
      case 'critical': return 'destructive' as const
      case 'high': return 'high' as const
      case 'medium': return 'medium' as const
      case 'low': return 'low' as const
      default: return 'default' as const
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate': return 'text-red-600 bg-red-50 border-red-200'
      case 'urgent': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'preparatory': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-low mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing risk assessment...</p>
        </div>
      </div>
    )
  }

  if (error || !riskAssessment) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || 'Failed to load risk assessment data'}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600">Comprehensive analysis of your location's risk factors</p>
        </div>
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Edit className="h-4 w-4" />
          <span>Change Location</span>
        </Button>
      </div>

      {/* Overall Risk Level */}
      <Card className="border-2 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <Shield className="h-6 w-6 mr-2" />
            Overall Risk Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant={getRiskVariant(riskAssessment.overallRisk)} className="text-lg px-4 py-2">
                {riskAssessment.overallRisk.toUpperCase()}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                Based on multiple risk factors and your current location
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-800">
                {riskAssessment.timeToImpact.hours}h {riskAssessment.timeToImpact.minutes}m
              </div>
              <p className="text-sm text-gray-600">Time to Impact</p>
              <p className="text-xs text-gray-500">
                Confidence: {riskAssessment.timeToImpact.confidence}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium">{riskAssessment.locationData.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Distance to Impact</p>
              <p className="font-medium">{riskAssessment.locationData.distanceToImpact} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Elevation</p>
              <p className="font-medium">{riskAssessment.locationData.elevation} meters</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Population Density</p>
              <p className="font-medium">{riskAssessment.locationData.populationDensity.toLocaleString()}/km²</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Risk Factors Analysis
          </CardTitle>
          <CardDescription>
            Detailed breakdown of specific risks affecting your location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAssessment.riskFactors.map((factor) => (
              <div key={factor.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{factor.name}</h4>
                  <Badge variant={getRiskVariant(factor.level)}>
                    {factor.level.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-red-600">Impact:</p>
                    <p className="text-gray-600">{factor.impact}</p>
                  </div>
                  <div>
                    <p className="font-medium text-green-600">Mitigation:</p>
                    <p className="text-gray-600">{factor.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evacuation Readiness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="h-5 w-5 mr-2" />
            Evacuation Readiness
          </CardTitle>
          <CardDescription>
            Assessment of available evacuation resources and infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {riskAssessment.evacuationReadiness.routesAvailable}
              </div>
              <p className="text-sm text-gray-600">Evacuation Routes</p>
              <Progress 
                value={(riskAssessment.evacuationReadiness.routesAvailable / 5) * 100} 
                className="mt-2"
              />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {riskAssessment.evacuationReadiness.shelterCapacity}%
              </div>
              <p className="text-sm text-gray-600">Shelter Capacity</p>
              <Progress 
                value={riskAssessment.evacuationReadiness.shelterCapacity} 
                className="mt-2"
              />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {riskAssessment.evacuationReadiness.medicalFacilities}
              </div>
              <p className="text-sm text-gray-600">Medical Facilities</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {riskAssessment.evacuationReadiness.transportationAccess ? '✓' : '✗'}
              </div>
              <p className="text-sm text-gray-600">Transport Access</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Action Recommendations
          </CardTitle>
          <CardDescription>
            Prioritized actions based on your risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAssessment.recommendations.map((rec, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{rec.action}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={rec.priority === 'immediate' ? 'destructive' : 
                                   rec.priority === 'urgent' ? 'high' : 'low'}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">{rec.timeframe}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Emergency Evacuation
        </Button>
        <Button variant="outline" className="w-full">
          <Heart className="h-4 w-4 mr-2" />
          Contact Emergency Services
        </Button>
      </div>
    </div>
  )
}
