'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AdvancedAIModels from '@/components/ai/AdvancedAIModels'
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
  Navigation,
  Settings,
  Database,
  Save
} from 'lucide-react'

interface ModelTraining {
  id: string
  modelId: string
  status: 'training' | 'completed' | 'failed'
  progress: number
  startTime: Date
  endTime?: Date
  accuracy: number
  loss: number
  epochs: number
  currentEpoch: number
}

interface ModelMetrics {
  modelId: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  trainingTime: number
  inferenceTime: number
  memoryUsage: number
  lastUpdated: Date
}

export default function AIModelsPage() {
  const [trainingJobs, setTrainingJobs] = useState<ModelTraining[]>([])
  const [metrics, setMetrics] = useState<ModelMetrics[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isTraining, setIsTraining] = useState(false)

  // Mock data
  useEffect(() => {
    setTrainingJobs([
      {
        id: '1',
        modelId: '1',
        status: 'training',
        progress: 65,
        startTime: new Date(Date.now() - 3600000),
        accuracy: 0.942,
        loss: 0.058,
        epochs: 100,
        currentEpoch: 65
      },
      {
        id: '2',
        modelId: '2',
        status: 'completed',
        progress: 100,
        startTime: new Date(Date.now() - 7200000),
        endTime: new Date(Date.now() - 3600000),
        accuracy: 0.897,
        loss: 0.103,
        epochs: 100,
        currentEpoch: 100
      }
    ])

    setMetrics([
      {
        modelId: '1',
        accuracy: 0.942,
        precision: 0.935,
        recall: 0.948,
        f1Score: 0.941,
        trainingTime: 3600,
        inferenceTime: 0.05,
        memoryUsage: 2048,
        lastUpdated: new Date()
      },
      {
        modelId: '2',
        accuracy: 0.897,
        precision: 0.891,
        recall: 0.903,
        f1Score: 0.897,
        trainingTime: 7200,
        inferenceTime: 0.08,
        memoryUsage: 1536,
        lastUpdated: new Date(Date.now() - 3600000)
      }
    ])
  }, [])

  const startTraining = async (modelId: string) => {
    setIsTraining(true)
    
    try {
      // Simulate training
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newTrainingJob: ModelTraining = {
        id: Date.now().toString(),
        modelId,
        status: 'training',
        progress: 0,
        startTime: new Date(),
        accuracy: 0,
        loss: 1.0,
        epochs: 100,
        currentEpoch: 0
      }
      
      setTrainingJobs(prev => [newTrainingJob, ...prev])
      
      // Simulate training progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setTrainingJobs(prev => 
          prev.map(job => 
            job.id === newTrainingJob.id 
              ? { 
                  ...job, 
                  progress: i, 
                  currentEpoch: i,
                  accuracy: Math.min(0.95, i / 100 * 0.9),
                  loss: Math.max(0.05, 1.0 - i / 100 * 0.9)
                }
              : job
          )
        )
      }
      
      // Mark as completed
      setTrainingJobs(prev => 
        prev.map(job => 
          job.id === newTrainingJob.id 
            ? { ...job, status: 'completed', endTime: new Date() }
            : job
        )
      )
      
    } catch (error) {
      console.error('Training failed:', error)
    } finally {
      setIsTraining(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training': return 'bg-blue-600'
      case 'completed': return 'bg-green-600'
      case 'failed': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.9) return 'text-green-400'
    if (accuracy >= 0.8) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Advanced AI/ML Models</h1>
        <p className="text-lg text-gray-300">Enhanced AI models for blast radius, tsunami, and evacuation optimization</p>
      </div>

      {/* AI Models Component */}
      <AdvancedAIModels />

      {/* Model Training */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Model Training</CardTitle>
          <CardDescription className="text-gray-300">
            Train and retrain AI models with new data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingJobs.map((job) => (
              <div key={job.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span className="font-semibold text-white">Model {job.modelId}</span>
                  </div>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress:</span>
                    <span className="text-white">{job.progress}%</span>
                  </div>
                  
                  <Progress value={job.progress} className="w-full" />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-300">Epoch:</span>
                      <div className="text-white">{job.currentEpoch}/{job.epochs}</div>
                    </div>
                    <div>
                      <span className="text-gray-300">Accuracy:</span>
                      <div className={getAccuracyColor(job.accuracy)}>
                        {(job.accuracy * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-300">Loss:</span>
                      <div className="text-white">{job.loss.toFixed(3)}</div>
                    </div>
                    <div>
                      <span className="text-gray-300">Duration:</span>
                      <div className="text-white">
                        {job.endTime 
                          ? Math.round((job.endTime.getTime() - job.startTime.getTime()) / 1000 / 60)
                          : Math.round((Date.now() - job.startTime.getTime()) / 1000 / 60)
                        } min
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex space-x-2">
              <Button
                onClick={() => startTraining('1')}
                disabled={isTraining}
                className="bg-emergency-high hover:bg-emergency-high/90"
              >
                {isTraining ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Training...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Training
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Metrics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Model Metrics</CardTitle>
          <CardDescription className="text-gray-300">
            Performance metrics and evaluation results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.modelId} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Model {metric.modelId}</h4>
                  <span className="text-sm text-gray-400">
                    Last updated: {metric.lastUpdated.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-slate-600 rounded">
                    <div className="text-lg font-bold text-emergency-high">
                      {(metric.accuracy * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-300">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-slate-600 rounded">
                    <div className="text-lg font-bold text-emergency-medium">
                      {(metric.precision * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-300">Precision</div>
                  </div>
                  <div className="text-center p-3 bg-slate-600 rounded">
                    <div className="text-lg font-bold text-emergency-medium">
                      {(metric.recall * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-300">Recall</div>
                  </div>
                  <div className="text-center p-3 bg-slate-600 rounded">
                    <div className="text-lg font-bold text-emergency-high">
                      {(metric.f1Score * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-300">F1 Score</div>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-300">Training Time:</span>
                    <div className="text-white">{Math.round(metric.trainingTime / 60)} min</div>
                  </div>
                  <div>
                    <span className="text-gray-300">Inference Time:</span>
                    <div className="text-white">{metric.inferenceTime}ms</div>
                  </div>
                  <div>
                    <span className="text-gray-300">Memory Usage:</span>
                    <div className="text-white">{metric.memoryUsage} MB</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Configuration */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Model Configuration</CardTitle>
          <CardDescription className="text-gray-300">
            Configure model parameters and training settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Training Parameters</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Learning Rate
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    defaultValue="0.001"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Batch Size
                  </label>
                  <input
                    type="number"
                    defaultValue="32"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Epochs
                  </label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Model Architecture</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Hidden Layers
                  </label>
                  <input
                    type="number"
                    defaultValue="3"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Neurons per Layer
                  </label>
                  <input
                    type="number"
                    defaultValue="128"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Activation Function
                  </label>
                  <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high">
                    <option value="relu">ReLU</option>
                    <option value="sigmoid">Sigmoid</option>
                    <option value="tanh">Tanh</option>
                    <option value="leaky_relu">Leaky ReLU</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button className="bg-emergency-high hover:bg-emergency-high/90">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

