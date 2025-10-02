'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Target, 
  Zap, 
  Activity, 
  AlertTriangle, 
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2
} from 'lucide-react'

interface TerrainModelProps {
  impactLocation: [number, number]
  blastRadius: number
  asteroidSize: number
  velocity: number
  angle: number
  composition: 'iron' | 'stone' | 'ice'
  onParameterChange: (params: {
    asteroidSize: number
    velocity: number
    angle: number
    composition: 'iron' | 'stone' | 'ice'
  }) => void
}

export default function SimpleTerrainModel({
  impactLocation,
  blastRadius,
  asteroidSize,
  velocity,
  angle,
  composition,
  onParameterChange
}: TerrainModelProps) {
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)

  // Calculate impact results based on parameters
  const calculateImpact = () => {
    const density = composition === 'iron' ? 7800 : composition === 'stone' ? 3000 : 1000
    const volume = (4/3) * Math.PI * Math.pow(asteroidSize/2, 3)
    const mass = volume * density
    const kineticEnergy = 0.5 * mass * Math.pow(velocity * 1000, 2)
    const impactEnergy = kineticEnergy / (4.184e15) // Convert J to megatons TNT
    const calculatedBlastRadius = Math.pow(impactEnergy, 0.33) * 0.5 * 1000
    
    return {
      blastRadius: Math.round(calculatedBlastRadius),
      craterDiameter: Math.round(calculatedBlastRadius * 2),
      impactEnergy: Math.round(impactEnergy * 100) / 100,
      tsunamiHeight: Math.round(Math.pow(impactEnergy, 0.25) * 10),
      seismicMagnitude: Math.round(Math.log10(impactEnergy) + 4.5),
      casualties: Math.min(calculatedBlastRadius * 100, 1000000),
      economicDamage: Math.round(impactEnergy * 0.1)
    }
  }

  const runSimulation = async () => {
    setIsSimulating(true)
    setSimulationStep(0)
    
    // Simulate step-by-step impact
    for (let step = 0; step <= 5; step++) {
      setSimulationStep(step)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setIsSimulating(false)
  }

  const results = calculateImpact()

  return (
    <div className="space-y-6">
      {/* 2D Visualization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Target className="h-6 w-6 mr-2" />
            2D Impact Visualization
          </CardTitle>
          <CardDescription className="text-gray-300">
            Simplified 2D representation of asteroid impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 overflow-hidden">
            {/* Impact Zone Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Asteroid */}
                <div 
                  className="absolute w-8 h-8 rounded-full bg-yellow-400 animate-pulse"
                  style={{
                    left: -4,
                    top: -4,
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-orange-500"></div>
                </div>
                
                {/* Impact Zone */}
                <div 
                  className="absolute rounded-full border-4 border-red-500 opacity-50"
                  style={{
                    width: `${Math.min(blastRadius * 2, 200)}px`,
                    height: `${Math.min(blastRadius * 2, 200)}px`,
                    left: `-${Math.min(blastRadius, 100)}px`,
                    top: `-${Math.min(blastRadius, 100)}px`
                  }}
                >
                  <div className="w-full h-full rounded-full bg-red-500 opacity-20"></div>
                </div>
                
                {/* Blast Radius Indicator */}
                <div className="absolute text-center text-white">
                  <div className="text-sm font-semibold">Impact Zone</div>
                  <div className="text-xs text-gray-300">{blastRadius}m radius</div>
                </div>
              </div>
            </div>
            
            {/* Simulation Controls */}
            <div className="absolute top-4 right-4">
              <Button
                onClick={runSimulation}
                disabled={isSimulating}
                size="sm"
                className="bg-emergency-high hover:bg-emergency-high/90"
              >
                {isSimulating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Step {simulationStep}/5
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Simulate
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parameter Controls */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Impact Parameters</CardTitle>
          <CardDescription className="text-gray-300">
            Adjust parameters to see real-time impact calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Asteroid Size: {asteroidSize.toFixed(1)}m
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="0.5"
                value={asteroidSize}
                onChange={(e) => onParameterChange({ 
                  asteroidSize: parseFloat(e.target.value), 
                  velocity, 
                  angle, 
                  composition 
                })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Velocity: {velocity.toFixed(1)} km/s
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="0.5"
                value={velocity}
                onChange={(e) => onParameterChange({ 
                  asteroidSize, 
                  velocity: parseFloat(e.target.value), 
                  angle, 
                  composition 
                })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Impact Angle: {angle.toFixed(1)}°
              </label>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={angle}
                onChange={(e) => onParameterChange({ 
                  asteroidSize, 
                  velocity, 
                  angle: parseFloat(e.target.value), 
                  composition 
                })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Composition
              </label>
              <select
                value={composition}
                onChange={(e) => onParameterChange({ 
                  asteroidSize, 
                  velocity, 
                  angle, 
                  composition: e.target.value as 'iron' | 'stone' | 'ice' 
                })}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
              >
                <option value="iron">Iron</option>
                <option value="stone">Stone</option>
                <option value="ice">Ice</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Results */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <BarChart3 className="h-6 w-6 mr-2" />
            Impact Calculations
          </CardTitle>
          <CardDescription className="text-gray-300">
            Real-time calculations based on current parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-high">{results.blastRadius}m</div>
              <div className="text-sm text-gray-300">Blast Radius</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-medium">{results.craterDiameter}m</div>
              <div className="text-sm text-gray-300">Crater Diameter</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-high">{results.impactEnergy} MT</div>
              <div className="text-sm text-gray-300">Impact Energy</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-medium">{results.tsunamiHeight}m</div>
              <div className="text-sm text-gray-300">Tsunami Height</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-high">{results.seismicMagnitude}</div>
              <div className="text-sm text-gray-300">Seismic Magnitude</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{results.casualties.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Estimated Casualties</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">${results.economicDamage}B</div>
              <div className="text-sm text-gray-300">Economic Damage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Composition Info */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Composition Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${composition === 'iron' ? 'bg-emergency-high/20 border border-emergency-high' : 'bg-slate-700'}`}>
              <h4 className="font-semibold text-white mb-2">Iron</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Dense, high impact energy</li>
                <li>• Creates larger craters</li>
                <li>• Higher blast radius</li>
                <li>• More seismic activity</li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-lg ${composition === 'stone' ? 'bg-emergency-high/20 border border-emergency-high' : 'bg-slate-700'}`}>
              <h4 className="font-semibold text-white mb-2">Stone</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Medium density</li>
                <li>• Fragments on impact</li>
                <li>• Moderate damage</li>
                <li>• Common composition</li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-lg ${composition === 'ice' ? 'bg-emergency-high/20 border border-emergency-high' : 'bg-slate-700'}`}>
              <h4 className="font-semibold text-white mb-2">Ice</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Low density</li>
                <li>• Vaporizes on impact</li>
                <li>• Airburst effects</li>
                <li>• Less crater formation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

