'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import MitigationSimulator from '@/components/3d/MitigationSimulator'
import { 
  Shield, 
  Target, 
  Zap, 
  Clock, 
  CheckCircle, 
  XCircle,
  BarChart3,
  Play,
  RotateCcw,
  Download,
  Share2
} from 'lucide-react'

interface MitigationStrategy {
  id: string
  name: string
  type: 'kinetic' | 'gravity' | 'nuclear' | 'laser'
  effectiveness: number
  cost: number
  timeRequired: number
  risk: 'low' | 'medium' | 'high'
  description: string
}

interface DeflectionResult {
  strategy: string
  deflection: number
  success: boolean
  timeToImpact: number
  cost: number
  risk: string
}

export default function MitigationTestingPage() {
  const [asteroidSize, setAsteroidSize] = useState(50)
  const [velocity, setVelocity] = useState(17)
  const [timeToImpact, setTimeToImpact] = useState(365) // days
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [deflectionResults, setDeflectionResults] = useState<DeflectionResult[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  const strategies: MitigationStrategy[] = [
    {
      id: 'kinetic-impactor',
      name: 'Kinetic Impactor',
      type: 'kinetic',
      effectiveness: 0.8,
      cost: 500,
      timeRequired: 5,
      risk: 'low',
      description: 'High-speed spacecraft collision to deflect asteroid'
    },
    {
      id: 'gravity-tractor',
      name: 'Gravity Tractor',
      type: 'gravity',
      effectiveness: 0.6,
      cost: 1000,
      timeRequired: 10,
      risk: 'low',
      description: 'Gravitational force to gradually deflect asteroid'
    },
    {
      id: 'nuclear-deflection',
      name: 'Nuclear Deflection',
      type: 'nuclear',
      effectiveness: 0.9,
      cost: 2000,
      timeRequired: 3,
      risk: 'high',
      description: 'Nuclear explosion to deflect asteroid (last resort)'
    },
    {
      id: 'laser-ablation',
      name: 'Laser Ablation',
      type: 'laser',
      effectiveness: 0.7,
      cost: 1500,
      timeRequired: 7,
      risk: 'medium',
      description: 'Focused laser to vaporize surface material'
    }
  ]

  const handleDeflectionCalculated = (deflection: number, success: boolean) => {
    if (selectedStrategy) {
      const strategy = strategies.find(s => s.id === selectedStrategy)
      if (strategy) {
        const result: DeflectionResult = {
          strategy: strategy.name,
          deflection,
          success,
          timeToImpact,
          cost: strategy.cost,
          risk: strategy.risk
        }
        setDeflectionResults(prev => [...prev, result])
      }
    }
  }

  const runStrategy = (strategyId: string) => {
    setSelectedStrategy(strategyId)
    setIsSimulating(true)
    
    // Simulate strategy execution
    setTimeout(() => {
      setIsSimulating(false)
    }, 3000)
  }

  const resetSimulation = () => {
    setDeflectionResults([])
    setSelectedStrategy(null)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-600'
      case 'medium': return 'bg-yellow-600'
      case 'high': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 0.8) return 'text-green-400'
    if (effectiveness >= 0.6) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="text-center">
        <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">Mitigation Strategy Testing</h1>
        <p className="text-sm lg:text-lg text-gray-300 px-4">Test asteroid deflection strategies in 3D simulation</p>
      </div>

      {/* 3D Mitigation Simulator */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3 lg:pb-6">
          <CardTitle className="flex items-center text-white text-lg lg:text-xl">
            <Shield className="h-5 w-5 lg:h-6 lg:w-6 mr-2" />
            3D Mitigation Simulation
          </CardTitle>
          <CardDescription className="text-gray-300 text-sm">
            Interactive visualization of asteroid deflection strategies
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 lg:p-6">
          <div className="w-full h-[400px] lg:h-[600px]">
            <MitigationSimulator
              asteroidSize={asteroidSize}
              velocity={velocity}
              timeToImpact={timeToImpact}
              onDeflectionCalculated={handleDeflectionCalculated}
            />
          </div>
        </CardContent>
      </Card>

      {/* Asteroid Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Asteroid Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Size: {asteroidSize}m
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={asteroidSize}
                onChange={(e) => setAsteroidSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Velocity: {velocity} km/s
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time to Impact: {timeToImpact} days
              </label>
              <input
                type="range"
                min="30"
                max="1000"
                value={timeToImpact}
                onChange={(e) => setTimeToImpact(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Available Strategies */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Available Strategies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedStrategy === strategy.id
                    ? 'border-emergency-high bg-emergency-high/20'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                onClick={() => runStrategy(strategy.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{strategy.name}</h4>
                  <Badge className={getRiskColor(strategy.risk)}>
                    {strategy.risk.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Effectiveness:</span>
                    <span className={getEffectivenessColor(strategy.effectiveness)}>
                      {(strategy.effectiveness * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span>${strategy.cost}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Required:</span>
                    <span>{strategy.timeRequired} years</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-2">{strategy.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Simulation Status */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Simulation Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isSimulating ? (
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-high mx-auto"></div>
                <p className="text-gray-300">Running simulation...</p>
                <p className="text-sm text-gray-400">
                  Testing {strategies.find(s => s.id === selectedStrategy)?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-300 mb-2">Ready to simulate</p>
                  <p className="text-sm text-gray-400">
                    Select a strategy to begin testing
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={resetSimulation}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Deflection Results */}
      {deflectionResults.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Deflection Results
            </CardTitle>
            <CardDescription className="text-gray-300">
              Comparison of tested mitigation strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deflectionResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.success
                      ? 'border-green-600 bg-green-900/20'
                      : 'border-red-600 bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{result.strategy}</h4>
                    <div className="flex items-center space-x-2">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                      <Badge className={result.success ? 'bg-green-600' : 'bg-red-600'}>
                        {result.success ? 'SUCCESS' : 'FAILED'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-300">Deflection:</span>
                      <div className="font-mono text-white">
                        {result.deflection.toFixed(2)}°
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-300">Time to Impact:</span>
                      <div className="font-mono text-white">
                        {result.timeToImpact} days
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-300">Cost:</span>
                      <div className="font-mono text-white">
                        ${result.cost}M
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-300">Risk Level:</span>
                      <div className="font-mono text-white capitalize">
                        {result.risk}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* What-If Scenario Builder */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">What-If Scenario Builder</CardTitle>
          <CardDescription className="text-gray-300">
            Test multiple defense approaches simultaneously
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-4">Combined Strategies</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-300">Kinetic Impactor + Gravity Tractor</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-300">Laser Ablation + Nuclear Deflection</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-300">All Strategies Combined</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Scenario Parameters</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Time Constraint: {timeToImpact} days
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="1000"
                    value={timeToImpact}
                    onChange={(e) => setTimeToImpact(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Budget Constraint: $5000M
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    defaultValue={5000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button className="bg-emergency-high hover:bg-emergency-high/90">
              <Play className="h-4 w-4 mr-2" />
              Run Combined Simulation
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Scenario
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
