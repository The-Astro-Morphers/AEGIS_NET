'use client'

import { useState, useEffect } from 'react'
import ErrorBoundary from './ErrorBoundary'
import FallbackTerrainModel from './FallbackTerrainModel'

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

// For now, we'll use the fallback version to avoid Three.js issues
// The TerrainScene component can be added later when Three.js issues are resolved

export default function TerrainModel({
  impactLocation,
  blastRadius,
  asteroidSize,
  velocity,
  angle,
  composition,
  onParameterChange
}: TerrainModelProps) {
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
        console.warn('WebGL not supported, using fallback terrain visualization')
        setUseFallback(true)
      }
    }
  }, [])

  const handleError = (error: string) => {
    console.error('3D Terrain Error:', error)
    setError(error)
    setUseFallback(true)
  }

  if (error && !useFallback) {
    return (
      <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-semibold mb-2">3D Terrain Error</p>
          <p className="text-sm text-gray-300 mb-4">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading 3D Terrain...</p>
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
          <FallbackTerrainModel
            impactLocation={impactLocation}
            blastRadius={blastRadius}
            asteroidSize={asteroidSize}
            velocity={velocity}
            angle={angle}
            composition={composition}
            onParameterChange={onParameterChange}
          />
        }
      >
        <FallbackTerrainModel
          impactLocation={impactLocation}
          blastRadius={blastRadius}
          asteroidSize={asteroidSize}
          velocity={velocity}
          angle={angle}
          composition={composition}
          onParameterChange={onParameterChange}
        />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary
      fallback={
        <FallbackTerrainModel
          impactLocation={impactLocation}
          blastRadius={blastRadius}
          asteroidSize={asteroidSize}
          velocity={velocity}
          angle={angle}
          composition={composition}
          onParameterChange={onParameterChange}
        />
      }
    >
      <FallbackTerrainModel
        impactLocation={impactLocation}
        blastRadius={blastRadius}
        asteroidSize={asteroidSize}
        velocity={velocity}
        angle={angle}
        composition={composition}
        onParameterChange={onParameterChange}
      />
    </ErrorBoundary>
  )
}