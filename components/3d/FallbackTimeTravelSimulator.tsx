'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

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
  impactLocation: [number, number]
  asteroidSize: number
  effects: string[]
}

const scenarios: HistoricalScenario[] = [
  {
    id: 'tunguska',
    name: 'Tunguska Event',
    year: 1908,
    description: 'Massive airburst over Siberia',
    impactLocation: [60, 101],
    asteroidSize: 50,
    effects: ['800km² forest flattened', 'Seismic waves detected globally', 'No crater formed']
  },
  {
    id: 'chicxulub',
    name: 'Chicxulub Impact',
    year: -66000000,
    description: 'Dinosaur extinction event',
    impactLocation: [21, -89],
    asteroidSize: 10000,
    effects: ['Global extinction event', '180km crater', 'Climate change', 'Tsunami waves']
  },
  {
    id: 'chelyabinsk',
    name: 'Chelyabinsk Meteor',
    year: 2013,
    description: 'Modern airburst event',
    impactLocation: [55, 61],
    asteroidSize: 20,
    effects: ['Shockwave damage', '1500+ injured', 'Video documentation', 'Airburst at 30km']
  }
]

export default function FallbackTimeTravelSimulator({
  selectedScenario,
  onScenarioChange,
  onTimeChange
}: TimeTravelSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)
  const animationRef = useRef<number>()

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario) || scenarios[0]

  // Canvas-based timeline visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawTimeline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#1a1a2e')
      gradient.addColorStop(0.5, '#16213e')
      gradient.addColorStop(1, '#0f1419')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw timeline
      const timelineY = canvas.height / 2
      const timelineStartX = 50
      const timelineEndX = canvas.width - 50
      
      // Timeline line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(timelineStartX, timelineY)
      ctx.lineTo(timelineEndX, timelineY)
      ctx.stroke()
      
      // Timeline markers
      const timePoints = [
        { year: -66000000, label: '65M BC', x: timelineStartX + 50 },
        { year: 1908, label: '1908', x: timelineStartX + (timelineEndX - timelineStartX) * 0.8 },
        { year: 2013, label: '2013', x: timelineStartX + (timelineEndX - timelineStartX) * 0.9 },
        { year: 2024, label: 'Now', x: timelineEndX - 20 }
      ]
      
      timePoints.forEach(point => {
        // Marker line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(point.x, timelineY - 20)
        ctx.lineTo(point.x, timelineY + 20)
        ctx.stroke()
        
        // Year label
        ctx.fillStyle = 'white'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(point.label, point.x, timelineY - 30)
      })
      
      // Current time indicator
      const currentX = timelineStartX + (currentTime / 100) * (timelineEndX - timelineStartX)
      ctx.fillStyle = '#ff6b35'
      ctx.beginPath()
      ctx.arc(currentX, timelineY, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw scenario visualization
      const scenarioX = currentX
      const scenarioY = timelineY - 100
      
      // Scenario circle
      ctx.fillStyle = selectedScenarioData.id === 'chicxulub' ? '#ff0000' : 
                     selectedScenarioData.id === 'tunguska' ? '#ffa500' : '#00ff00'
      ctx.beginPath()
      ctx.arc(scenarioX, scenarioY, 15, 0, Math.PI * 2)
      ctx.fill()
      
      // Impact visualization
      if (selectedScenarioData.id === 'chicxulub') {
        // Draw crater
        ctx.strokeStyle = '#ff0000'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(scenarioX, scenarioY, 40, 0, Math.PI * 2)
        ctx.stroke()
        
        // Shockwave
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(scenarioX, scenarioY, 60 + animationProgress * 20, 0, Math.PI * 2)
        ctx.stroke()
      } else if (selectedScenarioData.id === 'tunguska') {
        // Draw forest destruction
        ctx.fillStyle = 'rgba(139, 69, 19, 0.7)'
        ctx.beginPath()
        ctx.arc(scenarioX, scenarioY, 30 + animationProgress * 10, 0, Math.PI * 2)
        ctx.fill()
      } else if (selectedScenarioData.id === 'chelyabinsk') {
        // Draw airburst
        ctx.fillStyle = 'rgba(255, 165, 0, 0.5)'
        ctx.beginPath()
        ctx.arc(scenarioX, scenarioY, 20 + animationProgress * 15, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Scenario info
      ctx.fillStyle = 'white'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(selectedScenarioData.name, scenarioX, scenarioY - 60)
      
      ctx.font = '12px Arial'
      ctx.fillText(`${selectedScenarioData.year}`, scenarioX, scenarioY - 45)
      
      // Effects list
      ctx.font = '10px Arial'
      ctx.textAlign = 'left'
      selectedScenarioData.effects.forEach((effect, index) => {
        ctx.fillText(`• ${effect}`, 20, 50 + index * 15)
      })
    }

    drawTimeline()
  }, [selectedScenarioData, currentTime, animationProgress])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setAnimationProgress(prev => {
        if (prev >= 1) return 0
        return prev + 0.01
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleScenarioChange = (scenarioId: string) => {
    onScenarioChange(scenarioId)
    setCurrentTime(0)
  }

  const handleTimeChange = (time: number) => {
    setCurrentTime(time)
    onTimeChange(time)
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* 2D Canvas Timeline */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* CSS 3D Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Time particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Scenario Controls */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/80 text-white p-2 sm:p-4 rounded-lg space-y-2 sm:space-y-3 min-w-[200px] sm:min-w-[250px] z-10">
        <h3 className="text-sm sm:text-lg font-bold">Historical Scenarios</h3>
        
        {scenarios.map((scenario) => (
          <Button
            key={scenario.id}
            onClick={() => handleScenarioChange(scenario.id)}
            variant={selectedScenario === scenario.id ? "default" : "outline"}
            className={`w-full text-left justify-start text-xs sm:text-sm ${
              selectedScenario === scenario.id 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <div>
              <div className="font-semibold text-xs sm:text-sm">{scenario.name}</div>
              <div className="text-xs text-gray-300">{scenario.year}</div>
            </div>
          </Button>
        ))}
        
        <div className="pt-2 border-t border-gray-600">
          <label className="text-xs sm:text-sm font-medium">Time: {currentTime}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentTime}
            onChange={(e) => handleTimeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      {/* Scenario Details */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/80 text-white p-2 sm:p-3 rounded-lg z-10 max-w-[250px] sm:max-w-[300px]">
        <h4 className="font-bold mb-1 sm:mb-2 text-xs sm:text-sm">{selectedScenarioData.name}</h4>
        <div className="text-xs sm:text-sm space-y-1">
          <div>Year: {selectedScenarioData.year}</div>
          <div>Size: {selectedScenarioData.asteroidSize}m</div>
          <div className="hidden sm:block">Location: ({selectedScenarioData.impactLocation[0]}, {selectedScenarioData.impactLocation[1]})</div>
        </div>
        <div className="text-xs text-gray-300 mt-1 sm:mt-2 hidden sm:block">
          {selectedScenarioData.description}
        </div>
        <div className="text-xs mt-1 sm:mt-2">
          <div className="font-semibold">Effects:</div>
          <ul className="list-disc list-inside">
            {selectedScenarioData.effects.slice(0, 2).map((effect, index) => (
              <li key={index} className="truncate">{effect}</li>
            ))}
            {selectedScenarioData.effects.length > 2 && (
              <li className="text-gray-400">+{selectedScenarioData.effects.length - 2} more</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
