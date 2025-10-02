'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import TimeTravelSimulator from '@/components/3d/TimeTravelSimulator'
import { 
  Clock, 
  Target, 
  Zap, 
  Users, 
  BarChart3,
  Play,
  RotateCcw,
  Download,
  Share2,
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'

interface HistoricalScenario {
  id: string
  name: string
  year: number
  description: string
  asteroidSize: number
  velocity: number
  impactLocation: [number, number]
  energy: number
  casualties: number
  climateChange: boolean
  lessons: string[]
}

interface FutureProjection {
  id: string
  name: string
  year: number
  description: string
  asteroidSize: number
  velocity: number
  impactLocation: [number, number]
  energy: number
  projectedCasualties: number
  climateChange: boolean
  mitigationPossible: boolean
  technologyLevel: 'current' | 'advanced' | 'future'
}

export default function TimeTravelSimulationPage() {
  const [selectedScenario, setSelectedScenario] = useState<string>('tunguska-1908')
  const [currentTime, setCurrentTime] = useState(1908)
  const [simulationMode, setSimulationMode] = useState<'historical' | 'future'>('historical')
  const [isSimulating, setIsSimulating] = useState(false)

  const historicalScenarios: HistoricalScenario[] = [
    {
      id: 'tunguska-1908',
      name: 'Tunguska Event',
      year: 1908,
      description: 'Airburst over Siberia that flattened 2000 km² of forest',
      asteroidSize: 50,
      velocity: 15,
      impactLocation: [0, 0],
      energy: 12,
      casualties: 0,
      climateChange: false,
      lessons: [
        'Airbursts can cause massive damage without leaving a crater',
        'Remote areas can be affected by distant impacts',
        'Early warning systems are crucial for populated areas'
      ]
    },
    {
      id: 'chicxulub-66m',
      name: 'Chicxulub Impact',
      year: -66000000,
      description: 'Cretaceous-Paleogene extinction event that wiped out the dinosaurs',
      asteroidSize: 10000,
      velocity: 20,
      impactLocation: [0, 0],
      energy: 100000000,
      casualties: 75000000,
      climateChange: true,
      lessons: [
        'Large impacts can cause global climate change',
        'Mass extinctions can result from single impact events',
        'Planetary defense is essential for species survival'
      ]
    },
    {
      id: 'chelyabinsk-2013',
      name: 'Chelyabinsk Meteor',
      year: 2013,
      description: 'Airburst over Russia that injured 1500 people',
      asteroidSize: 20,
      velocity: 19,
      impactLocation: [0, 0],
      energy: 0.5,
      casualties: 1500,
      climateChange: false,
      lessons: [
        'Small asteroids can still cause significant damage',
        'Early warning systems can save lives',
        'Public education about impact threats is important'
      ]
    }
  ]

  const futureProjections: FutureProjection[] = [
    {
      id: 'future-2030',
      name: 'Future Impact 2030',
      year: 2030,
      description: 'Projected impact with current technology',
      asteroidSize: 100,
      velocity: 18,
      impactLocation: [0, 0],
      energy: 50,
      projectedCasualties: 100000,
      climateChange: false,
      mitigationPossible: true,
      technologyLevel: 'current'
    },
    {
      id: 'future-2050',
      name: 'Future Impact 2050',
      year: 2050,
      description: 'Projected impact with advanced technology',
      asteroidSize: 200,
      velocity: 20,
      impactLocation: [0, 0],
      energy: 200,
      projectedCasualties: 500000,
      climateChange: true,
      mitigationPossible: true,
      technologyLevel: 'advanced'
    },
    {
      id: 'future-2100',
      name: 'Future Impact 2100',
      year: 2100,
      description: 'Projected impact with future technology',
      asteroidSize: 500,
      velocity: 25,
      impactLocation: [0, 0],
      energy: 1000,
      projectedCasualties: 2000000,
      climateChange: true,
      mitigationPossible: true,
      technologyLevel: 'future'
    }
  ]

  const currentScenario = [...historicalScenarios, ...futureProjections].find(
    s => s.id === selectedScenario
  )

  const runSimulation = async () => {
    setIsSimulating(true)
    
    // Simulate time travel
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setCurrentTime(prev => prev + (simulationMode === 'historical' ? -1000 : 1000))
    }
    
    setIsSimulating(false)
  }

  const resetSimulation = () => {
    setCurrentTime(2024)
    setSelectedScenario('tunguska-1908')
    setSimulationMode('historical')
  }

  const getTechnologyColor = (level: string) => {
    switch (level) {
      case 'current': return 'bg-blue-600'
      case 'advanced': return 'bg-purple-600'
      case 'future': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getRiskLevel = (energy: number) => {
    if (energy < 1) return 'low'
    if (energy < 10) return 'medium'
    if (energy < 100) return 'high'
    return 'critical'
  }

  const riskLevel = currentScenario ? getRiskLevel(currentScenario.energy) : 'low'

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Time Travel Simulation</h1>
        <p className="text-lg text-gray-300">Historical scenario testing and future projection engine</p>
      </div>

      {/* 3D Time Travel Simulator */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Clock className="h-6 w-6 mr-2" />
            3D Time Travel Visualization
          </CardTitle>
          <CardDescription className="text-gray-300">
            Navigate through time to explore historical impacts and future projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TimeTravelSimulator
            selectedScenario={selectedScenario}
            onScenarioChange={setSelectedScenario}
            onTimeChange={setCurrentTime}
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Simulation Mode
              </label>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setSimulationMode('historical')}
                  variant={simulationMode === 'historical' ? 'default' : 'outline'}
                  className="flex-1"
                >
                  Historical
                </Button>
                <Button
                  onClick={() => setSimulationMode('future')}
                  variant={simulationMode === 'future' ? 'default' : 'outline'}
                  className="flex-1"
                >
                  Future
                </Button>
              </div>
            </div>
            
            <Button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full bg-emergency-high hover:bg-emergency-high/90"
            >
              {isSimulating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Time Traveling...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Time Travel
                </>
              )}
            </Button>
            
            <Button
              onClick={resetSimulation}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Present
            </Button>
          </CardContent>
        </Card>

        {/* Current Scenario Info */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Scenario</CardTitle>
          </CardHeader>
          <CardContent>
            {currentScenario ? (
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white">{currentScenario.name}</h4>
                  <p className="text-sm text-gray-300">{currentScenario.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-300">Year:</span>
                    <div className="font-mono text-white">{currentScenario.year}</div>
                  </div>
                  <div>
                    <span className="text-gray-300">Size:</span>
                    <div className="font-mono text-white">{currentScenario.asteroidSize}m</div>
                  </div>
                  <div>
                    <span className="text-gray-300">Energy:</span>
                    <div className="font-mono text-white">{currentScenario.energy} MT</div>
                  </div>
                  <div>
                    <span className="text-gray-300">Risk:</span>
                    <Badge className={getTechnologyColor(riskLevel)}>
                      {riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                {currentScenario.climateChange && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Climate Impact</AlertTitle>
                    <AlertDescription>
                      This impact would cause significant climate change
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-gray-400 text-sm">
                Select a scenario to view details
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time Navigation */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Time Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Time: {currentTime}
                </label>
                <input
                  type="range"
                  min="-66000000"
                  max="2100"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setCurrentTime(1908)}
                  variant="outline"
                  size="sm"
                >
                  Tunguska 1908
                </Button>
                <Button
                  onClick={() => setCurrentTime(2013)}
                  variant="outline"
                  size="sm"
                >
                  Chelyabinsk 2013
                </Button>
                <Button
                  onClick={() => setCurrentTime(2030)}
                  variant="outline"
                  size="sm"
                >
                  Future 2030
                </Button>
                <Button
                  onClick={() => setCurrentTime(2050)}
                  variant="outline"
                  size="sm"
                >
                  Future 2050
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Selection */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Scenario Library</CardTitle>
          <CardDescription className="text-gray-300">
            Choose from historical events or future projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Historical Scenarios */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Historical Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {historicalScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedScenario === scenario.id
                        ? 'border-emergency-high bg-emergency-high/20'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{scenario.name}</h4>
                      <Badge variant="outline">{scenario.year}</Badge>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{scenario.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400">Size:</span>
                        <div className="font-mono text-white">{scenario.asteroidSize}m</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Energy:</span>
                        <div className="font-mono text-white">{scenario.energy} MT</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Casualties:</span>
                        <div className="font-mono text-white">{scenario.casualties.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Climate:</span>
                        <div className="font-mono text-white">
                          {scenario.climateChange ? 'Yes' : 'No'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Projections */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Future Projections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {futureProjections.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedScenario === scenario.id
                        ? 'border-emergency-high bg-emergency-high/20'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{scenario.name}</h4>
                      <Badge className={getTechnologyColor(scenario.technologyLevel)}>
                        {scenario.technologyLevel.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{scenario.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400">Size:</span>
                        <div className="font-mono text-white">{scenario.asteroidSize}m</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Energy:</span>
                        <div className="font-mono text-white">{scenario.energy} MT</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Casualties:</span>
                        <div className="font-mono text-white">{scenario.projectedCasualties.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Mitigation:</span>
                        <div className="font-mono text-white">
                          {scenario.mitigationPossible ? 'Possible' : 'Not Possible'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uncertainty Visualization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Uncertainty Visualization</CardTitle>
          <CardDescription className="text-gray-300">
            Probability cone narrowing over time for impact predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Impact Probability Over Time</h4>
              <p className="text-sm text-gray-300">
                As we get closer to the impact date, our predictions become more accurate
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">±50%</div>
                <div className="text-sm text-gray-300">10 years before impact</div>
                <div className="text-xs text-gray-400">High uncertainty</div>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">±20%</div>
                <div className="text-sm text-gray-300">1 year before impact</div>
                <div className="text-xs text-gray-400">Medium uncertainty</div>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-green-400">±5%</div>
                <div className="text-sm text-gray-300">1 month before impact</div>
                <div className="text-xs text-gray-400">Low uncertainty</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
