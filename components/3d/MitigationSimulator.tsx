'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import ErrorBoundary from './ErrorBoundary'
import FallbackMitigationSimulator from './FallbackMitigationSimulator'

interface MitigationSimulatorProps {
  asteroidSize: number
  velocity: number
  timeToImpact: number
  onDeflectionCalculated: (deflection: number, success: boolean) => void
}

// Try to load the Three.js version, but fallback gracefully
const MitigationScene = dynamic(() => import('./MitigationScene'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-high mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Loading 3D Visualization...</p>
        <p className="text-sm text-gray-300">Initializing Three.js components</p>
      </div>
    </div>
  )
})

// Control panel component
function ControlPanel({ 
  onKineticImpactor, 
  onGravityTractor, 
  onReset,
  deflectionResult 
}: {
  onKineticImpactor: () => void
  onGravityTractor: () => void
  onReset: () => void
  deflectionResult: { deflection: number; success: boolean } | null
}) {
  return (
    <div className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded-lg space-y-4 min-w-[300px]">
      <h3 className="text-lg font-bold">Mitigation Strategies</h3>
      
      <div className="space-y-2">
        <Button
          onClick={onKineticImpactor}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          🚀 Kinetic Impactor
        </Button>
        <p className="text-xs text-gray-300">
          High-speed impact to deflect asteroid
        </p>
      </div>
      
      <div className="space-y-2">
        <Button
          onClick={onGravityTractor}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          🛸 Gravity Tractor
        </Button>
        <p className="text-xs text-gray-300">
          Gradual deflection using gravitational force
        </p>
      </div>
      
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full"
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
  )
}

export default function MitigationSimulator({
  asteroidSize,
  velocity,
  timeToImpact,
  onDeflectionCalculated
}: MitigationSimulatorProps) {
  const [deflectionResult, setDeflectionResult] = useState<{
    deflection: number
    success: boolean
  } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      setIsLoaded(true)
      
      // Check for WebGL support
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        console.warn('WebGL not supported, using fallback visualization')
        setUseFallback(true)
      }
    }
  }, [])
  
  const handleKineticImpactor = () => {
    setDeflectionResult(null)
    if (useFallback) {
      // For fallback, the events are handled internally
      return
    }
    window.dispatchEvent(new CustomEvent('kinetic-impactor'))
  }
  
  const handleGravityTractor = () => {
    setDeflectionResult(null)
    if (useFallback) {
      // For fallback, the events are handled internally
      return
    }
    window.dispatchEvent(new CustomEvent('gravity-tractor'))
  }
  
  const handleReset = () => {
    setDeflectionResult(null)
    if (useFallback) {
      // For fallback, the events are handled internally
      return
    }
    window.dispatchEvent(new CustomEvent('reset-simulation'))
  }
  
  const handleDeflectionCalculated = (deflection: number, success: boolean) => {
    setDeflectionResult({ deflection, success })
    onDeflectionCalculated(deflection, success)
  }

  const handleError = (error: string) => {
    console.error('3D Component Error:', error)
    setError(error)
    setUseFallback(true)
  }

  if (error && !useFallback) {
    return (
      <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-semibold mb-2">3D Visualization Error</p>
          <p className="text-sm text-gray-300 mb-4">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-emergency-high text-white rounded hover:bg-emergency-high/90"
            >
              Retry
            </button>
            <button 
              onClick={() => setUseFallback(true)} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Use Fallback Mode
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-high mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading 3D Visualization...</p>
          <p className="text-sm text-gray-300">Initializing Three.js components</p>
        </div>
      </div>
    )
  }

  // Use fallback if Three.js fails or WebGL is not supported
  if (useFallback) {
    return (
      <ErrorBoundary 
        fallback={
          <FallbackMitigationSimulator
            asteroidSize={asteroidSize}
            velocity={velocity}
            timeToImpact={timeToImpact}
            onDeflectionCalculated={handleDeflectionCalculated}
          />
        }
      >
        <FallbackMitigationSimulator
          asteroidSize={asteroidSize}
          velocity={velocity}
          timeToImpact={timeToImpact}
          onDeflectionCalculated={handleDeflectionCalculated}
        />
      </ErrorBoundary>
    )
  }
  
  return (
    <ErrorBoundary
      fallback={
        <FallbackMitigationSimulator
          asteroidSize={asteroidSize}
          velocity={velocity}
          timeToImpact={timeToImpact}
          onDeflectionCalculated={handleDeflectionCalculated}
        />
      }
    >
      <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
        <MitigationScene
          asteroidSize={asteroidSize}
          velocity={velocity}
          timeToImpact={timeToImpact}
          onDeflectionCalculated={handleDeflectionCalculated}
          onError={handleError}
        />
        
        <ControlPanel
          onKineticImpactor={handleKineticImpactor}
          onGravityTractor={handleGravityTractor}
          onReset={handleReset}
          deflectionResult={deflectionResult}
        />
      </div>
    </ErrorBoundary>
  )
}