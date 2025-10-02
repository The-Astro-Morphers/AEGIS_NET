'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

interface MitigationSimulatorProps {
  asteroidSize: number
  velocity: number
  timeToImpact: number
  onDeflectionCalculated: (deflection: number, success: boolean) => void
}

interface DeflectionResult {
  deflection: number
  success: boolean
}

export default function FallbackMitigationSimulator({
  asteroidSize,
  velocity,
  timeToImpact,
  onDeflectionCalculated
}: MitigationSimulatorProps) {
  const [deflectionResult, setDeflectionResult] = useState<DeflectionResult | null>(null)
  const [kineticImpactorActive, setKineticImpactorActive] = useState(false)
  const [gravityTractorActive, setGravityTractorActive] = useState(false)
  const [deflectionAmount, setDeflectionAmount] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Canvas-based 2D visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#1a1a2e')
      gradient.addColorStop(1, '#16213e')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw stars
      ctx.fillStyle = 'white'
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        ctx.fillRect(x, y, 1, 1)
      }
      
      // Draw trajectories
      const centerY = canvas.height / 2
      const startX = 50
      const endX = canvas.width - 50
      
      // Original trajectory (red)
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(startX, centerY)
      ctx.quadraticCurveTo((startX + endX) / 2, centerY - 30, endX, centerY)
      ctx.stroke()
      
      // Deflected trajectory (green)
      if (deflectionAmount > 0) {
        const deflectionOffset = deflectionAmount * 2
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(startX, centerY)
        ctx.quadraticCurveTo((startX + endX) / 2, centerY - 30 - deflectionOffset, endX, centerY - deflectionOffset)
        ctx.stroke()
      }
      
      // Draw asteroid
      const asteroidX = startX + (animationProgress * (endX - startX))
      const asteroidY = centerY - Math.sin(animationProgress * Math.PI) * 30
      
      ctx.fillStyle = '#8B4513'
      ctx.beginPath()
      ctx.arc(asteroidX, asteroidY, asteroidSize * 0.8, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw kinetic impactor
      if (kineticImpactorActive) {
        const impactorX = asteroidX - 100
        const impactorY = asteroidY + 50
        
        ctx.fillStyle = '#ff6b35'
        ctx.fillRect(impactorX, impactorY, 20, 60)
        
        // Impact trail
        ctx.strokeStyle = '#ff6b35'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(impactorX + 10, impactorY + 60)
        ctx.lineTo(asteroidX, asteroidY)
        ctx.stroke()
      }
      
      // Draw gravity tractor
      if (gravityTractorActive) {
        const tractorX = asteroidX - 80
        const tractorY = asteroidY - 80
        
        ctx.fillStyle = '#4dabf7'
        ctx.beginPath()
        ctx.arc(tractorX, tractorY, 25, 0, Math.PI * 2)
        ctx.fill()
        
        // Tractor beam
        ctx.strokeStyle = 'rgba(77, 171, 247, 0.3)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(tractorX, tractorY + 25)
        ctx.lineTo(asteroidX, asteroidY)
        ctx.stroke()
      }
      
      // Labels
      ctx.fillStyle = 'white'
      ctx.font = '16px Arial'
      ctx.fillText('Asteroid', asteroidX - 30, asteroidY - asteroidSize - 10)
      
      if (kineticImpactorActive) {
        ctx.fillText('Kinetic Impactor', startX - 20, centerY + 100)
      }
      
      if (gravityTractorActive) {
        ctx.fillText('Gravity Tractor', startX - 20, centerY + 120)
      }
      
      // Deflection info
      if (deflectionAmount > 0) {
        ctx.fillStyle = 'white'
        ctx.font = 'bold 18px Arial'
        ctx.fillText(`Deflection: ${deflectionAmount.toFixed(2)}°`, 20, 30)
      }
    }

    drawScene()
  }, [asteroidSize, deflectionAmount, kineticImpactorActive, gravityTractorActive, animationProgress])

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

  const simulateKineticImpactor = () => {
    setKineticImpactorActive(true)
    setGravityTractorActive(false)
    
    const deflection = Math.max(0, 15 - asteroidSize * 0.3 - velocity * 0.2)
    setDeflectionAmount(deflection)
    
    setTimeout(() => {
      const success = deflection > 5
      setDeflectionResult({ deflection, success })
      onDeflectionCalculated(deflection, success)
    }, 2000)
  }

  const simulateGravityTractor = () => {
    setGravityTractorActive(true)
    setKineticImpactorActive(false)
    
    const deflection = Math.max(0, timeToImpact * 0.1 - asteroidSize * 0.1)
    setDeflectionAmount(deflection)
    
    setTimeout(() => {
      const success = deflection > 3
      setDeflectionResult({ deflection, success })
      onDeflectionCalculated(deflection, success)
    }, 3000)
  }

  const resetSimulation = () => {
    setKineticImpactorActive(false)
    setGravityTractorActive(false)
    setDeflectionAmount(0)
    setDeflectionResult(null)
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* 2D Canvas Visualization */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* CSS 3D Elements Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 3D Space Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          {/* Animated stars */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* 3D Trajectory Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-12 w-full h-0.5 bg-red-500/70 transform -translate-y-1/2 rotate-12 origin-left" />
          <div 
            className={`absolute top-1/2 left-12 w-full h-0.5 bg-green-500/70 transform -translate-y-1/2 origin-left transition-all duration-1000 ${
              deflectionAmount > 0 ? 'rotate-6' : 'rotate-12'
            }`}
          />
        </div>
      </div>
      
      {/* Control Panel */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/80 text-white p-2 sm:p-4 rounded-lg space-y-2 sm:space-y-4 min-w-[200px] sm:min-w-[300px] z-10">
        <h3 className="text-sm sm:text-lg font-bold">Mitigation Strategies</h3>
        
        <div className="space-y-1 sm:space-y-2">
          <Button
            onClick={simulateKineticImpactor}
            disabled={kineticImpactorActive || gravityTractorActive}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-xs sm:text-sm"
          >
            🚀 Kinetic Impactor
          </Button>
          <p className="text-xs text-gray-300 hidden sm:block">
            High-speed impact to deflect asteroid
          </p>
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <Button
            onClick={simulateGravityTractor}
            disabled={kineticImpactorActive || gravityTractorActive}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-xs sm:text-sm"
          >
            🛸 Gravity Tractor
          </Button>
          <p className="text-xs text-gray-300 hidden sm:block">
            Gradual deflection using gravitational force
          </p>
        </div>
        
        <Button
          onClick={resetSimulation}
          variant="outline"
          className="w-full text-xs sm:text-sm"
        >
          Reset Simulation
        </Button>
        
        {deflectionResult && (
          <div className={`p-3 rounded ${
            deflectionResult.success ? 'bg-green-900' : 'bg-red-900'
          }`}>
            <div className="font-bold">
              {deflectionResult.success ? '✅ Success!' : '❌ Failed'}
            </div>
            <div className="text-sm">
              Deflection: {deflectionResult.deflection.toFixed(2)}°
            </div>
            <div className="text-xs text-gray-300">
              {deflectionResult.success 
                ? 'Asteroid successfully deflected!'
                : 'Insufficient deflection. Try different strategy.'
              }
            </div>
          </div>
        )}
      </div>
      
      {/* Asteroid Parameters Display */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/80 text-white p-2 sm:p-3 rounded-lg z-10">
        <h4 className="font-bold mb-1 sm:mb-2 text-xs sm:text-sm">Asteroid Parameters</h4>
        <div className="text-xs sm:text-sm space-y-1">
          <div>Size: {asteroidSize}m</div>
          <div>Velocity: {velocity} km/s</div>
          <div>Time to Impact: {timeToImpact} days</div>
        </div>
      </div>
    </div>
  )
}
