'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import TerrainModel from '@/components/3d/TerrainModel'
import { 
  Zap, 
  Target, 
  Activity, 
  AlertTriangle, 
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2
} from 'lucide-react'

interface ImpactParameters {
  asteroidSize: number
  velocity: number
  angle: number
  composition: 'iron' | 'stone' | 'ice'
}

interface ImpactResults {
  blastRadius: number
  craterDiameter: number
  impactEnergy: number
  tsunamiHeight: number
  seismicMagnitude: number
  casualties: number
  economicDamage: number
}

interface HistoricalImpact {
  name: string
  year: number
  diameter: number
  velocity: number
  energy: number
  casualties: number
  description: string
}

export default function ImpactSimulatorPage() {
  const [parameters, setParameters] = useState<ImpactParameters>({
    asteroidSize: 20,
    velocity: 17,
    angle: 45,
    composition: 'stone'
  })

  const [results, setResults] = useState<ImpactResults | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)
  const [impactLocation] = useState<[number, number]>([0, 0])

  const historicalImpacts: HistoricalImpact[] = [
    {
      name: "Tunguska Event",
      year: 1908,
      diameter: 50,
      velocity: 15,
      energy: 12,
      casualties: 0,
      description: "Airburst over Siberia, flattened 2000 km² of forest"
    },
    {
      name: "Chicxulub Impact",
      year: 66000000,
      diameter: 10000,
      velocity: 20,
      energy: 100000000,
      casualties: 75000000,
      description: "Cretaceous-Paleogene extinction event"
    },
    {
      name: "Chelyabinsk Meteor",
      year: 2013,
      diameter: 20,
      velocity: 19,
      energy: 0.5,
      casualties: 1500,
      description: "Airburst over Russia, injured 1500 people"
    }
  ]

  // Calculate impact results based on parameters
  const calculateImpact = (params: ImpactParameters): ImpactResults => {
    const { asteroidSize, velocity, angle, composition } = params
    
    // Density based on composition
    const density = composition === 'iron' ? 7800 : composition === 'stone' ? 3000 : 1000
    
    // Mass calculation (assuming spherical asteroid)
    const volume = (4/3) * Math.PI * Math.pow(asteroidSize/2, 3)
    const mass = volume * density
    
    // Kinetic energy (0.5 * m * v²)
    const kineticEnergy = 0.5 * mass * Math.pow(velocity * 1000, 2) // Convert km/s to m/s
    
    // Impact energy in megatons TNT
    const impactEnergy = kineticEnergy / (4.184e15) // Convert J to megatons TNT
    
    // Blast radius (simplified formula)
    const blastRadius = Math.pow(impactEnergy, 0.33) * 0.5 * 1000 // Convert to meters
    
    // Crater diameter (simplified)
    const craterDiameter = blastRadius * 2
    
    // Tsunami height (if ocean impact)
    const tsunamiHeight = Math.pow(impactEnergy, 0.25) * 10
    
    // Seismic magnitude
    const seismicMagnitude = Math.log10(impactEnergy) + 4.5
    
    // Casualty estimation (very simplified)
    const casualties = Math.min(blastRadius * 100, 1000000)
    
    // Economic damage (billions USD)
    const economicDamage = impactEnergy * 0.1
    
    return {
      blastRadius: Math.round(blastRadius),
      craterDiameter: Math.round(craterDiameter),
      impactEnergy: Math.round(impactEnergy * 100) / 100,
      tsunamiHeight: Math.round(tsunamiHeight),
      seismicMagnitude: Math.round(seismicMagnitude * 10) / 10,
      casualties: Math.round(casualties),
      economicDamage: Math.round(economicDamage * 100) / 100
    }
  }

  // Run simulation
  const runSimulation = async () => {
    setIsSimulating(true)
    setSimulationStep(0)
    
    // Simulate step-by-step impact
    for (let step = 0; step <= 5; step++) {
      setSimulationStep(step)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    const calculatedResults = calculateImpact(parameters)
    setResults(calculatedResults)
    setIsSimulating(false)
  }

  // Load historical impact
  const loadHistoricalImpact = (impact: HistoricalImpact) => {
    setParameters({
      asteroidSize: impact.diameter,
      velocity: impact.velocity,
      angle: 45, // Default angle
      composition: 'stone' // Default composition
    })
  }

  // Get risk level based on impact energy
  const getRiskLevel = (energy: number) => {
    if (energy < 1) return 'low'
    if (energy < 10) return 'medium'
    if (energy < 100) return 'high'
    return 'critical'
  }

  const riskLevel = results ? getRiskLevel(results.impactEnergy) : 'low'

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Interactive Impact Simulator</h1>
        <p className="text-lg text-gray-300">3D Terrain Modeling & Variable Parameter Testing</p>
      </div>

      {/* 3D Visualization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Target className="h-6 w-6 mr-2" />
            3D Impact Visualization
          </CardTitle>
          <CardDescription className="text-gray-300">
            Interactive 3D terrain with real-time parameter adjustment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TerrainModel
            impactLocation={impactLocation}
            blastRadius={results?.blastRadius || 10}
            asteroidSize={parameters.asteroidSize}
            velocity={parameters.velocity}
            angle={parameters.angle}
            composition={parameters.composition}
            onParameterChange={(newParams) => {
              setParameters(newParams)
              setResults(null) // Clear results when parameters change
            }}
          />
        </CardContent>
      </Card>

      {/* Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Simulation Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full bg-emergency-high hover:bg-emergency-high/90"
            >
              {isSimulating ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Simulating... Step {simulationStep}/5
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Simulation
                </>
              )}
            </Button>
            
            <Button
              onClick={() => {
                setResults(null)
                setSimulationStep(0)
              }}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Parameters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Size:</span>
              <span className="text-white font-mono">{parameters.asteroidSize}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Velocity:</span>
              <span className="text-white font-mono">{parameters.velocity} km/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Angle:</span>
              <span className="text-white font-mono">{parameters.angle}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Composition:</span>
              <Badge variant="outline" className="capitalize">
                {parameters.composition}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Risk Level:</span>
                  <Badge 
                    className={
                      riskLevel === 'critical' ? 'bg-red-600' :
                      riskLevel === 'high' ? 'bg-orange-600' :
                      riskLevel === 'medium' ? 'bg-yellow-600' :
                      'bg-green-600'
                    }
                  >
                    {riskLevel.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Based on impact energy: {results.impactEnergy} megatons TNT
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">
                Run simulation to see risk assessment
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Simulation Results */}
      {results && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Simulation Results
            </CardTitle>
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
      )}

      {/* Historical Impacts Comparison */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Historical Impact Comparison</CardTitle>
          <CardDescription className="text-gray-300">
            Compare with known historical asteroid impacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {historicalImpacts.map((impact, index) => (
              <div
                key={index}
                className="p-4 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
                onClick={() => loadHistoricalImpact(impact)}
              >
                <h4 className="font-bold text-white mb-2">{impact.name}</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Year: {impact.year.toLocaleString()}</div>
                  <div>Diameter: {impact.diameter}m</div>
                  <div>Velocity: {impact.velocity} km/s</div>
                  <div>Energy: {impact.energy} MT</div>
                  <div>Casualties: {impact.casualties.toLocaleString()}</div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{impact.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
