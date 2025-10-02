'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Brain, 
  Target, 
  Waves, 
  Route, 
  Users, 
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Zap,
  Shield,
  Navigation
} from 'lucide-react'

interface AIModel {
  id: string
  name: string
  type: 'blast_radius' | 'tsunami' | 'evacuation' | 'resource_optimization' | 'debris_dispersion'
  status: 'training' | 'ready' | 'running' | 'error'
  accuracy: number
  lastUpdated: Date
  description: string
  parameters: Record<string, any>
}

interface PredictionResult {
  modelId: string
  input: Record<string, any>
  output: Record<string, any>
  confidence: number
  timestamp: Date
  processingTime: number
}

interface BlastRadiusPrediction {
  radius: number
  craterDiameter: number
  craterDepth: number
  thermalRadius: number
  shockwaveRadius: number
  debrisRadius: number
  confidence: number
}

interface TsunamiPrediction {
  height: number
  arrivalTime: number
  affectedAreas: string[]
  coastalImpact: number
  inlandPenetration: number
  confidence: number
}

interface EvacuationOptimization {
  routes: Array<{
    id: string
    path: number[][]
    capacity: number
    estimatedTime: number
    risk: 'low' | 'medium' | 'high'
  }>
  totalCapacity: number
  estimatedEvacuationTime: number
  bottlenecks: string[]
  confidence: number
}

interface ResourceAllocation {
  hospitals: Array<{
    id: string
    name: string
    capacity: number
    allocation: number
    priority: number
  }>
  shelters: Array<{
    id: string
    name: string
    capacity: number
    allocation: number
    priority: number
  }>
  medicalTeams: Array<{
    id: string
    name: string
    capacity: number
    allocation: number
    priority: number
  }>
  efficiency: number
  confidence: number
}

export default function AdvancedAIModels() {
  const [models, setModels] = useState<AIModel[]>([])
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentPrediction, setCurrentPrediction] = useState<any>(null)

  // Mock data
  useEffect(() => {
    setModels([
      {
        id: '1',
        name: 'Blast Radius Calculator',
        type: 'blast_radius',
        status: 'ready',
        accuracy: 94.2,
        lastUpdated: new Date(),
        description: 'Calculates blast radius, crater dimensions, and thermal effects',
        parameters: {
          asteroidSize: 50,
          velocity: 17,
          angle: 45,
          composition: 'stone',
          density: 3000
        }
      },
      {
        id: '2',
        name: 'Tsunami Impact Model',
        type: 'tsunami',
        status: 'ready',
        accuracy: 89.7,
        lastUpdated: new Date(Date.now() - 3600000),
        description: 'Predicts tsunami height, arrival time, and affected areas',
        parameters: {
          impactLocation: [0, 0],
          oceanDepth: 4000,
          coastalDistance: 100,
          waveSpeed: 200
        }
      },
      {
        id: '3',
        name: 'Evacuation Route Optimizer',
        type: 'evacuation',
        status: 'ready',
        accuracy: 91.5,
        lastUpdated: new Date(Date.now() - 7200000),
        description: 'Optimizes evacuation routes based on population density and traffic',
        parameters: {
          populationDensity: 1000,
          roadCapacity: 500,
          evacuationTime: 24,
          riskZones: ['downtown', 'coastal']
        }
      },
      {
        id: '4',
        name: 'Resource Allocation AI',
        type: 'resource_optimization',
        status: 'ready',
        accuracy: 87.3,
        lastUpdated: new Date(Date.now() - 10800000),
        description: 'Optimizes resource allocation for maximum efficiency',
        parameters: {
          totalResources: 1000,
          priorityAreas: ['hospitals', 'shelters'],
          timeConstraint: 12,
          efficiencyTarget: 0.9
        }
      },
      {
        id: '5',
        name: 'Debris Dispersion Model',
        type: 'debris_dispersion',
        status: 'training',
        accuracy: 82.1,
        lastUpdated: new Date(Date.now() - 14400000),
        description: 'Predicts debris dispersion patterns and impact zones',
        parameters: {
          windSpeed: 15,
          windDirection: 270,
          atmosphericPressure: 1013,
          temperature: 20
        }
      }
    ])
  }, [])

  const runPrediction = async (modelId: string) => {
    setIsRunning(true)
    setSelectedModel(modelId)
    
    try {
      // Simulate AI prediction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const model = models.find(m => m.id === modelId)
      if (!model) return
      
      let prediction: any = {}
      
      switch (model.type) {
        case 'blast_radius':
          prediction = {
            radius: Math.random() * 100 + 50,
            craterDiameter: Math.random() * 200 + 100,
            craterDepth: Math.random() * 50 + 25,
            thermalRadius: Math.random() * 150 + 75,
            shockwaveRadius: Math.random() * 300 + 200,
            debrisRadius: Math.random() * 500 + 300,
            confidence: Math.random() * 0.2 + 0.8
          }
          break
        case 'tsunami':
          prediction = {
            height: Math.random() * 50 + 10,
            arrivalTime: Math.random() * 60 + 30,
            affectedAreas: ['Coastal Zone A', 'Coastal Zone B', 'Inland Zone C'],
            coastalImpact: Math.random() * 100 + 50,
            inlandPenetration: Math.random() * 20 + 5,
            confidence: Math.random() * 0.2 + 0.8
          }
          break
        case 'evacuation':
          prediction = {
            routes: [
              { id: '1', path: [[0, 0], [100, 100], [200, 200]], capacity: 500, estimatedTime: 2.5, risk: 'low' },
              { id: '2', path: [[0, 0], [150, 50], [300, 100]], capacity: 300, estimatedTime: 3.2, risk: 'medium' },
              { id: '3', path: [[0, 0], [50, 150], [100, 300]], capacity: 200, estimatedTime: 4.1, risk: 'high' }
            ],
            totalCapacity: 1000,
            estimatedEvacuationTime: 4.5,
            bottlenecks: ['Highway 101', 'Bridge A'],
            confidence: Math.random() * 0.2 + 0.8
          }
          break
        case 'resource_optimization':
          prediction = {
            hospitals: [
              { id: '1', name: 'City General', capacity: 500, allocation: 450, priority: 0.9 },
              { id: '2', name: 'Regional Medical', capacity: 300, allocation: 280, priority: 0.8 }
            ],
            shelters: [
              { id: '1', name: 'Central Shelter', capacity: 1000, allocation: 950, priority: 0.95 },
              { id: '2', name: 'North Shelter', capacity: 500, allocation: 400, priority: 0.8 }
            ],
            medicalTeams: [
              { id: '1', name: 'Team Alpha', capacity: 20, allocation: 18, priority: 0.9 },
              { id: '2', name: 'Team Beta', capacity: 15, allocation: 12, priority: 0.8 }
            ],
            efficiency: Math.random() * 0.2 + 0.8,
            confidence: Math.random() * 0.2 + 0.8
          }
          break
        case 'debris_dispersion':
          prediction = {
            dispersionPattern: 'elliptical',
            majorAxis: Math.random() * 100 + 50,
            minorAxis: Math.random() * 50 + 25,
            affectedZones: ['Zone A', 'Zone B', 'Zone C'],
            riskLevels: { 'Zone A': 'high', 'Zone B': 'medium', 'Zone C': 'low' },
            confidence: Math.random() * 0.2 + 0.8
          }
          break
      }
      
      setCurrentPrediction(prediction)
      
      const result: PredictionResult = {
        modelId,
        input: model.parameters,
        output: prediction,
        confidence: prediction.confidence || 0.9,
        timestamp: new Date(),
        processingTime: 3000
      }
      
      setPredictions(prev => [result, ...prev])
      
    } catch (error) {
      console.error('Prediction failed:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'blast_radius': return <Target className="h-5 w-5" />
      case 'tsunami': return <Waves className="h-5 w-5" />
      case 'evacuation': return <Route className="h-5 w-5" />
      case 'resource_optimization': return <Users className="h-5 w-5" />
      case 'debris_dispersion': return <Zap className="h-5 w-5" />
      default: return <Brain className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-600'
      case 'running': return 'bg-blue-600'
      case 'training': return 'bg-yellow-600'
      case 'error': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-400'
    if (accuracy >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
   

      {/* AI Models */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">AI Models</CardTitle>
          <CardDescription className="text-gray-300">
            Available AI models for impact prediction and optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <div key={model.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getModelIcon(model.type)}
                    <h4 className="font-semibold text-white">{model.name}</h4>
                  </div>
                  <Badge className={getStatusColor(model.status)}>
                    {model.status.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{model.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Accuracy:</span>
                    <span className={getAccuracyColor(model.accuracy)}>
                      {model.accuracy.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Last Updated:</span>
                    <span className="text-white">
                      {model.lastUpdated.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Button
                    onClick={() => runPrediction(model.id)}
                    disabled={isRunning || model.status !== 'ready'}
                    className="w-full bg-emergency-high hover:bg-emergency-high/90"
                  >
                    {isRunning && selectedModel === model.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Prediction
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Prediction */}
      {currentPrediction && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Prediction</CardTitle>
            <CardDescription className="text-gray-300">
              Latest prediction results from selected model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(currentPrediction).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                  <span className="text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-white font-mono">
                    {typeof value === 'number' ? value.toFixed(2) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prediction History */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Prediction History</CardTitle>
          <CardDescription className="text-gray-300">
            Recent predictions and their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction, index) => {
              const model = models.find(m => m.id === prediction.modelId)
              return (
                <div key={index} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {model && getModelIcon(model.type)}
                      <span className="font-semibold text-white">{model?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-600">
                        {prediction.confidence.toFixed(2)} confidence
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {prediction.processingTime}ms
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Timestamp:</span>
                      <span className="text-white">
                        {prediction.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Model Type:</span>
                      <span className="text-white capitalize">
                        {model?.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Model Performance</CardTitle>
          <CardDescription className="text-gray-300">
            Performance metrics and accuracy statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-high">
                {models.filter(m => m.status === 'ready').length}
              </div>
              <div className="text-sm text-gray-300">Ready Models</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-medium">
                {Math.round(models.reduce((acc, m) => acc + m.accuracy, 0) / models.length)}%
              </div>
              <div className="text-sm text-gray-300">Average Accuracy</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-high">
                {predictions.length}
              </div>
              <div className="text-sm text-gray-300">Total Predictions</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-medium">
                {Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / Math.max(predictions.length, 1) * 100)}%
              </div>
              <div className="text-sm text-gray-300">Average Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

