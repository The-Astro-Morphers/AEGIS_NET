'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

interface MitigationSimulatorProps {
  asteroidSize: number
  velocity: number
  timeToImpact: number
  onDeflectionCalculated: (deflection: number, success: boolean) => void
}

export default function SimpleMitigationSimulator({
  asteroidSize,
  velocity,
  timeToImpact,
  onDeflectionCalculated
}: MitigationSimulatorProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [deflectionResult, setDeflectionResult] = useState<{
    deflection: number
    success: boolean
  } | null>(null)

  const strategies = [
    {
      id: 'kinetic-impactor',
      name: 'Kinetic Impactor',
      description: 'High-speed spacecraft collision to deflect asteroid',
      effectiveness: 0.8,
      cost: 500,
      timeRequired: 5,
      risk: 'low',
      color: 'bg-orange-600'
    },
    {
      id: 'gravity-tractor',
      name: 'Gravity Tractor',
      description: 'Gravitational force to gradually deflect asteroid',
      effectiveness: 0.6,
      cost: 1000,
      timeRequired: 10,
      risk: 'low',
      color: 'bg-blue-600'
    },
    {
      id: 'nuclear-deflection',
      name: 'Nuclear Deflection',
      description: 'Nuclear explosion to deflect asteroid (last resort)',
      effectiveness: 0.9,
      cost: 2000,
      timeRequired: 3,
      risk: 'high',
      color: 'bg-red-600'
    },
    {
      id: 'laser-ablation',
      name: 'Laser Ablation',
      description: 'Focused laser to vaporize surface material',
      effectiveness: 0.7,
      cost: 1500,
      timeRequired: 7,
      risk: 'medium',
      color: 'bg-purple-600'
    }
  ]

  const runStrategy = async (strategyId: string) => {
    setSelectedStrategy(strategyId)
    setIsSimulating(true)
    
    try {
      // Simulate strategy execution
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const strategy = strategies.find(s => s.id === strategyId)
      if (strategy) {
        // Calculate deflection based on strategy effectiveness and asteroid parameters
        const baseDeflection = strategy.effectiveness * 15
        const sizeFactor = Math.max(0.1, 1 - (asteroidSize / 100))
        const velocityFactor = Math.max(0.1, 1 - (velocity / 30))
        const timeFactor = Math.max(0.1, timeToImpact / 365)
        
        const deflection = baseDeflection * sizeFactor * velocityFactor * timeFactor
        const success = deflection > 5
        
        setDeflectionResult({ deflection, success })
        onDeflectionCalculated(deflection, success)
      }
    } catch (error) {
      console.error('Strategy execution failed:', error)
    } finally {
      setIsSimulating(false)
    }
  }

  const resetSimulation = () => {
    setDeflectionResult(null)
    setSelectedStrategy(null)
  }

  return (
    <div className="space-y-6">
      {/* 2D Visualization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Shield className="h-6 w-6 mr-2" />
            2D Mitigation Visualization
          </CardTitle>
          <CardDescription className="text-gray-300">
            Simplified 2D representation of asteroid deflection strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 overflow-hidden">
            {/* Asteroid and Trajectory */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Original Trajectory */}
                <div className="absolute w-64 h-1 bg-red-500 opacity-50 transform rotate-12"></div>
                
                {/* Deflected Trajectory */}
                {deflectionResult && (
                  <div 
                    className="absolute w-64 h-1 bg-green-500 opacity-70 transform"
                    style={{ 
                      transform: `rotate(${12 + (deflectionResult.deflection * 2)}deg)`,
                      transformOrigin: 'left center'
                    }}
                  ></div>
                )}
                
                {/* Asteroid */}
                <div className="absolute w-6 h-6 rounded-full bg-yellow-400 animate-pulse">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-orange-500"></div>
                </div>
                
                {/* Deflection Arrow */}
                {deflectionResult && (
                  <div 
                    className="absolute w-8 h-8 text-green-400"
                    style={{ 
                      left: '100px',
                      top: '-10px',
                      transform: `rotate(${deflectionResult.deflection * 2}deg)`
                    }}
                  >
                    <Zap className="w-full h-full" />
                  </div>
                )}
                
                {/* Labels */}
                <div className="absolute -top-8 left-0 text-xs text-red-400">Original Path</div>
                {deflectionResult && (
                  <div className="absolute -top-8 right-0 text-xs text-green-400">Deflected Path</div>
                )}
              </div>
            </div>
            
            {/* Simulation Status */}
            <div className="absolute top-4 left-4">
              {isSimulating ? (
                <div className="flex items-center space-x-2 text-white">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emergency-high"></div>
                  <span>Running Strategy...</span>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  Select a strategy to begin simulation
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Selection */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Mitigation Strategies</CardTitle>
          <CardDescription className="text-gray-300">
            Choose a strategy to test asteroid deflection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedStrategy === strategy.id
                    ? 'border-emergency-high bg-emergency-high/20'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                onClick={() => runStrategy(strategy.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{strategy.name}</h4>
                  <Badge className={strategy.color}>
                    {strategy.risk.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{strategy.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Effectiveness:</span>
                    <div className="text-white">{(strategy.effectiveness * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <div className="text-white">${strategy.cost}M</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Time Required:</span>
                    <div className="text-white">{strategy.timeRequired} years</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Risk Level:</span>
                    <div className="text-white capitalize">{strategy.risk}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deflection Results */}
      {deflectionResult && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart3 className="h-6 w-6 mr-2" />
              Deflection Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg ${
              deflectionResult.success
                ? 'border-green-600 bg-green-900/20'
                : 'border-red-600 bg-red-900/20'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">
                  {strategies.find(s => s.id === selectedStrategy)?.name}
                </h4>
                <div className="flex items-center space-x-2">
                  {deflectionResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <Badge className={deflectionResult.success ? 'bg-green-600' : 'bg-red-600'}>
                    {deflectionResult.success ? 'SUCCESS' : 'FAILED'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-300">Deflection:</span>
                  <div className="font-mono text-white">
                    {deflectionResult.deflection.toFixed(2)}°
                  </div>
                </div>
                <div>
                  <span className="text-gray-300">Time to Impact:</span>
                  <div className="font-mono text-white">
                    {timeToImpact} days
                  </div>
                </div>
                <div>
                  <span className="text-gray-300">Asteroid Size:</span>
                  <div className="font-mono text-white">
                    {asteroidSize}m
                  </div>
                </div>
                <div>
                  <span className="text-gray-300">Velocity:</span>
                  <div className="font-mono text-white">
                    {velocity} km/s
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-300">
                  {deflectionResult.success 
                    ? 'Asteroid successfully deflected! The trajectory change is sufficient to avoid Earth impact.'
                    : 'Insufficient deflection. The asteroid trajectory change is not enough to avoid Earth impact. Try a different strategy or combination of strategies.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Control Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={resetSimulation}
          variant="outline"
          className="flex-1"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Simulation
        </Button>
        <Button
          variant="outline"
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
        <Button
          variant="outline"
          className="flex-1"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}

