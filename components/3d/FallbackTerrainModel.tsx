'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

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

export default function FallbackTerrainModel({
  impactLocation,
  blastRadius,
  asteroidSize,
  velocity,
  angle,
  composition,
  onParameterChange
}: TerrainModelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [showImpact, setShowImpact] = useState(false)
  const animationRef = useRef<number>()

  // Canvas-based 2D terrain visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawTerrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // Background gradient (sky)
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.3)
      skyGradient.addColorStop(0, '#87CEEB')
      skyGradient.addColorStop(1, '#E0F6FF')
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.3)
      
      // Ground gradient
      const groundGradient = ctx.createLinearGradient(0, canvas.height * 0.3, 0, canvas.height)
      groundGradient.addColorStop(0, '#8B7355')
      groundGradient.addColorStop(1, '#654321')
      ctx.fillStyle = groundGradient
      ctx.fillRect(0, canvas.height * 0.3, canvas.width, canvas.height * 0.7)
      
      // Draw terrain features
      ctx.fillStyle = '#228B22'
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.7
        ctx.beginPath()
        ctx.arc(x, y, 15 + Math.random() * 25, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Draw impact crater
      const craterX = (impactLocation[0] / 100) * canvas.width
      const craterY = (impactLocation[1] / 100) * canvas.height * 0.3 + canvas.height * 0.3
      const craterRadius = (blastRadius / 100) * Math.min(canvas.width, canvas.height) * 0.3
      
      // Crater shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.beginPath()
      ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2)
      ctx.fill()
      
      // Crater rim
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2)
      ctx.stroke()
      
      // Draw asteroid trajectory
      const asteroidStartX = craterX - 150
      const asteroidStartY = craterY - 100
      const asteroidEndX = craterX
      const asteroidEndY = craterY
      
      // Trajectory line
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.7)'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(asteroidStartX, asteroidStartY)
      ctx.lineTo(asteroidEndX, asteroidEndY)
      ctx.stroke()
      ctx.setLineDash([])
      
      // Animated asteroid
      const asteroidX = asteroidStartX + (animationProgress * (asteroidEndX - asteroidStartX))
      const asteroidY = asteroidStartY + (animationProgress * (asteroidEndY - asteroidStartY))
      
      // Asteroid shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.beginPath()
      ctx.arc(asteroidX + 2, asteroidY + 2, asteroidSize * 0.8, 0, Math.PI * 2)
      ctx.fill()
      
      // Asteroid body
      const asteroidColor = composition === 'iron' ? '#C0C0C0' : 
                           composition === 'stone' ? '#696969' : '#B0E0E6'
      ctx.fillStyle = asteroidColor
      ctx.beginPath()
      ctx.arc(asteroidX, asteroidY, asteroidSize * 0.8, 0, Math.PI * 2)
      ctx.fill()
      
      // Asteroid highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.arc(asteroidX - asteroidSize * 0.2, asteroidY - asteroidSize * 0.2, asteroidSize * 0.3, 0, Math.PI * 2)
      ctx.fill()
      
      // Impact effect
      if (showImpact && animationProgress >= 0.9) {
        const impactRadius = craterRadius * (1 - animationProgress) * 5
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(craterX, craterY, impactRadius, 0, Math.PI * 2)
        ctx.stroke()
        
        // Shockwave
        const shockwaveRadius = impactRadius * 2
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(craterX, craterY, shockwaveRadius, 0, Math.PI * 2)
        ctx.stroke()
      }
      
      // Labels
      ctx.fillStyle = 'white'
      ctx.font = 'bold 16px Arial'
      ctx.fillText('Asteroid Impact Simulation', 20, 30)
      
      ctx.font = '14px Arial'
      ctx.fillText(`Size: ${asteroidSize}m`, 20, 50)
      ctx.fillText(`Velocity: ${velocity} km/s`, 20, 70)
      ctx.fillText(`Angle: ${angle}°`, 20, 90)
      ctx.fillText(`Composition: ${composition}`, 20, 110)
      
      // Impact location marker
      ctx.fillStyle = 'red'
      ctx.beginPath()
      ctx.arc(craterX, craterY, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.font = '12px Arial'
      ctx.fillText('Impact Point', craterX + 10, craterY - 10)
    }

    drawTerrain()
  }, [impactLocation, blastRadius, asteroidSize, velocity, angle, composition, animationProgress, showImpact])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setAnimationProgress(prev => {
        if (prev >= 1) {
          setShowImpact(true)
          return 0 // Reset for continuous animation
        }
        return prev + 0.005
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

  const getCompositionColor = (comp: string) => {
    switch (comp) {
      case 'iron': return '#C0C0C0'
      case 'stone': return '#696969'
      case 'ice': return '#B0E0E6'
      default: return '#696969'
    }
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* 2D Canvas Visualization */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* CSS 3D Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Atmospheric effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-green-800/20" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
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
      
      {/* Parameter Controls */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/80 text-white p-2 sm:p-4 rounded-lg space-y-2 sm:space-y-3 min-w-[200px] sm:min-w-[250px] z-10">
        <h3 className="text-sm sm:text-lg font-bold">Impact Parameters</h3>
        
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium">Size: {asteroidSize}m</label>
          <input
            type="range"
            min="10"
            max="100"
            value={asteroidSize}
            onChange={(e) => onParameterChange({
              asteroidSize: Number(e.target.value),
              velocity,
              angle,
              composition
            })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium">Velocity: {velocity} km/s</label>
          <input
            type="range"
            min="5"
            max="50"
            value={velocity}
            onChange={(e) => onParameterChange({
              asteroidSize,
              velocity: Number(e.target.value),
              angle,
              composition
            })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium">Angle: {angle}°</label>
          <input
            type="range"
            min="15"
            max="90"
            value={angle}
            onChange={(e) => onParameterChange({
              asteroidSize,
              velocity,
              angle: Number(e.target.value),
              composition
            })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium">Type:</label>
          <div className="flex flex-wrap gap-1">
            {(['iron', 'stone', 'ice'] as const).map((comp) => (
              <Button
                key={comp}
                onClick={() => onParameterChange({
                  asteroidSize,
                  velocity,
                  angle,
                  composition: comp
                })}
                variant={composition === comp ? "default" : "outline"}
                size="sm"
                className={`text-xs px-2 py-1 ${
                  composition === comp 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {comp}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Composition indicator */}
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
            style={{ backgroundColor: getCompositionColor(composition) }}
          />
          <span className="text-xs sm:text-sm">{composition} asteroid</span>
        </div>
      </div>
      
      {/* Impact Info */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/80 text-white p-2 sm:p-3 rounded-lg z-10">
        <h4 className="font-bold mb-1 sm:mb-2 text-xs sm:text-sm">Impact Analysis</h4>
        <div className="text-xs sm:text-sm space-y-1">
          <div>Blast: {blastRadius}km</div>
          <div>Energy: {((asteroidSize * velocity * velocity) / 1000).toFixed(1)} MT</div>
          <div>Crater: {(blastRadius * 2).toFixed(1)}km</div>
          <div className="hidden sm:block">Location: ({impactLocation[0]}, {impactLocation[1]})</div>
        </div>
      </div>
    </div>
  )
}
