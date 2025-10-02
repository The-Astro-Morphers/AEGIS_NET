'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

interface TimeTravelSimulatorProps {
  selectedScenario: string
  onScenarioChange: (scenario: string) => void
  onTimeChange: (time: number) => void
}

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

export default function SimpleTimeTravelSimulator({
  selectedScenario,
  onScenarioChange,
  onTimeChange
}: TimeTravelSimulatorProps) {
  const [currentTime, setCurrentTime] = useState(2024)
  const [isTimeTraveling, setIsTimeTraveling] = useState(false)
  const [scenarios, setScenarios] = useState<(HistoricalScenario | FutureProjection)[]>([])

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
      climateChange: false
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
      climateChange: true
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
      climateChange: false
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

  useEffect(() => {
    setScenarios([...historicalScenarios, ...futureProjections])
  }, [])

  const currentScenario = scenarios.find(s => s.id === selectedScenario)

  const timeTravel = async (targetYear: number) => {
    setIsTimeTraveling(true)
    
    try {
      // Simulate time travel animation
      const steps = Math.abs(targetYear - currentTime) / 1000
      const stepSize = targetYear > currentTime ? 1000 : -1000
      
      for (let i = 0; i < steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setCurrentTime(prev => prev + stepSize)
      }
      
      setCurrentTime(targetYear)
      onTimeChange(targetYear)
    } catch (error) {
      console.error('Time travel failed:', error)
    } finally {
      setIsTimeTraveling(false)
    }
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
      {/* Timeline Visualization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Clock className="h-6 w-6 mr-2" />
            Time Travel Timeline
          </CardTitle>
          <CardDescription className="text-gray-300">
            Navigate through time to explore historical impacts and future projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 overflow-hidden">
            {/* Timeline */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-2 bg-gray-600 rounded-full relative">
                {/* Current time indicator */}
                <div 
                  className="absolute w-4 h-4 bg-emergency-high rounded-full -top-1 transform -translate-x-2"
                  style={{ left: '50%' }}
                ></div>
                
                {/* Scenario markers */}
                {scenarios.map((scenario, index) => {
                  const isHistorical = scenario.year < 2024
                  const position = isHistorical 
                    ? (scenario.year + 66000000) / 66000000 * 25
                    : 50 + (scenario.year - 2024) / 100 * 25
                  
                  return (
                    <div
                      key={scenario.id}
                      className="absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1.5 -top-0.5"
                      style={{ 
                        left: `${Math.max(0, Math.min(100, position))}%`,
                        backgroundColor: isHistorical ? '#ef4444' : '#3b82f6'
                      }}
                      onClick={() => {
                        onScenarioChange(scenario.id)
                        timeTravel(scenario.year)
                      }}
                      title={`${scenario.name} (${scenario.year})`}
                    ></div>
                  )
                })}
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 text-sm text-red-400">Historical</div>
            <div className="absolute top-4 right-4 text-sm text-blue-400">Future</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white">
              Current Time: {currentTime}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Scenario */}
      {currentScenario && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Scenario</CardTitle>
            <CardDescription className="text-gray-300">
              {currentScenario.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-emergency-high">{currentScenario.asteroidSize}m</div>
                <div className="text-sm text-gray-300">Asteroid Size</div>
              </div>
              
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-emergency-medium">{currentScenario.velocity} km/s</div>
                <div className="text-sm text-gray-300">Velocity</div>
              </div>
              
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-emergency-high">{currentScenario.energy} MT</div>
                <div className="text-sm text-gray-300">Impact Energy</div>
              </div>
              
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-red-400">
                  {'casualties' in currentScenario 
                    ? currentScenario.casualties.toLocaleString()
                    : currentScenario.projectedCasualties.toLocaleString()
                  }
                </div>
                <div className="text-sm text-gray-300">Casualties</div>
              </div>
            </div>
            
            {currentScenario.climateChange && (
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Climate Impact</AlertTitle>
                <AlertDescription>
                  This impact would cause significant climate change
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

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
                    onClick={() => {
                      onScenarioChange(scenario.id)
                      timeTravel(scenario.year)
                    }}
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
                    onClick={() => {
                      onScenarioChange(scenario.id)
                      timeTravel(scenario.year)
                    }}
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

      {/* Control Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={() => timeTravel(2024)}
          disabled={isTimeTraveling}
          variant="outline"
          className="flex-1"
        >
          {isTimeTraveling ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Time Traveling...
            </>
          ) : (
            <>
              <Clock className="h-4 w-4 mr-2" />
              Return to Present
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Timeline
        </Button>
        <Button
          variant="outline"
          className="flex-1"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Scenario
        </Button>
      </div>
    </div>
  )
}

