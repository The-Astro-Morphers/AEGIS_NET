'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface TerrainSceneProps {
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
  onError?: (error: string) => void
}

// Dynamically import Canvas to avoid SSR issues
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Loading 3D Canvas...</p>
      </div>
    </div>
  )
})

const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.OrbitControls })), { ssr: false })
const Text = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Text })), { ssr: false })
const Environment = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Environment })), { ssr: false })
const Sky = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Sky })), { ssr: false })

// Terrain generation function
function generateTerrain(width: number, height: number, impactX: number, impactZ: number, blastRadius: number) {
  const geometry = new THREE.PlaneGeometry(width, height, 100, 100)
  const vertices = geometry.attributes.position.array as Float32Array
  
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const z = vertices[i + 1]
    
    // Create crater at impact point
    const distanceFromImpact = Math.sqrt((x - impactX) ** 2 + (z - impactZ) ** 2)
    const craterDepth = Math.max(0, (blastRadius - distanceFromImpact) / blastRadius * 20)
    
    // Add some random terrain variation
    const noise = Math.sin(x * 0.01) * Math.cos(z * 0.01) * 2
    vertices[i + 2] = craterDepth + noise
  }
  
  geometry.attributes.position.needsUpdate = true
  geometry.computeVertexNormals()
  
  return geometry
}

// Terrain component
function TerrainMesh({ 
  impactLocation, 
  blastRadius 
}: { 
  impactLocation: [number, number]
  blastRadius: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const terrainGeometry = useMemo(() => {
    const impactX = (impactLocation[0] / 100) * 200 - 100
    const impactZ = (impactLocation[1] / 100) * 200 - 100
    return generateTerrain(200, 200, impactX, impactZ, blastRadius)
  }, [impactLocation, blastRadius])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2
    }
  })
  
  return (
    <mesh ref={meshRef} geometry={terrainGeometry}>
      <meshLambertMaterial 
        color="#8B7355" 
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Asteroid component
function Asteroid({ 
  position, 
  size, 
  composition, 
  isAnimating 
}: { 
  position: [number, number, number]
  size: number
  composition: string
  isAnimating: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const asteroidColor = composition === 'iron' ? '#C0C0C0' : 
                       composition === 'stone' ? '#696969' : '#B0E0E6'
  
  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.y += 0.02
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={asteroidColor} metalness={0.3} roughness={0.7} />
    </mesh>
  )
}

// Parameter Controls component
function ParameterControls({ 
  asteroidSize, 
  velocity, 
  angle, 
  composition, 
  onParameterChange 
}: {
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
}) {
  return (
    <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg space-y-3 min-w-[250px] z-10">
      <h3 className="text-lg font-bold">Impact Parameters</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Asteroid Size: {asteroidSize}m</label>
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
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Velocity: {velocity} km/s</label>
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
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Angle: {angle}°</label>
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
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Composition:</label>
        <div className="flex space-x-2">
          {(['iron', 'stone', 'ice'] as const).map((comp) => (
            <button
              key={comp}
              onClick={() => onParameterChange({
                asteroidSize,
                velocity,
                angle,
                composition: comp
              })}
              className={`px-3 py-1 text-xs rounded ${
                composition === comp 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main scene content
function SceneContent({
  impactLocation,
  blastRadius,
  asteroidSize,
  velocity,
  angle,
  composition,
  onParameterChange
}: TerrainSceneProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  
  const asteroidPosition: [number, number, number] = [
    (impactLocation[0] / 100) * 200 - 100 - 50,
    30,
    (impactLocation[1] / 100) * 200 - 100
  ]
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 50, 0]} intensity={0.5} />
      
      {/* Environment */}
      <Environment preset="sunset" />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      
      {/* Terrain */}
      <TerrainMesh impactLocation={impactLocation} blastRadius={blastRadius} />
      
      {/* Asteroid */}
      <Asteroid
        position={asteroidPosition}
        size={asteroidSize * 0.1}
        composition={composition}
        isAnimating={isAnimating}
      />
      
      {/* Labels */}
      <Text position={[0, 50, 0]} fontSize={8} color="white" anchorX="center">
        Asteroid Impact Simulation
      </Text>
      
      {/* Impact marker */}
      <mesh position={[(impactLocation[0] / 100) * 200 - 100, 1, (impactLocation[1] / 100) * 200 - 100]}>
        <sphereGeometry args={[2, 8, 8]} />
        <meshBasicMaterial color="red" />
      </mesh>
      
      {/* Orbit Controls */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  )
}

// Main terrain scene component
export default function TerrainScene({
  impactLocation,
  blastRadius,
  asteroidSize,
  velocity,
  angle,
  composition,
  onParameterChange,
  onError
}: TerrainSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoaded(true)
    }
  }, [])
  
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading 3D Terrain...</p>
          <p className="text-sm text-gray-300">Initializing Three.js components</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas 
        camera={{ position: [100, 80, 100], fov: 60 }}
        onError={(error) => {
          console.error('Canvas error:', error)
          if (onError) {
            onError(error.toString())
          }
        }}
      >
        <SceneContent
          impactLocation={impactLocation}
          blastRadius={blastRadius}
          asteroidSize={asteroidSize}
          velocity={velocity}
          angle={angle}
          composition={composition}
          onParameterChange={onParameterChange}
          onError={onError}
        />
      </Canvas>
      
      <ParameterControls
        asteroidSize={asteroidSize}
        velocity={velocity}
        angle={angle}
        composition={composition}
        onParameterChange={onParameterChange}
      />
      
      {/* Impact Info */}
      <div className="absolute bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg z-10">
        <h4 className="font-bold mb-2">Impact Analysis</h4>
        <div className="text-sm space-y-1">
          <div>Blast Radius: {blastRadius}km</div>
          <div>Impact Energy: {((asteroidSize * velocity * velocity) / 1000).toFixed(1)} MT</div>
          <div>Crater Diameter: {(blastRadius * 2).toFixed(1)}km</div>
          <div>Location: ({impactLocation[0]}, {impactLocation[1]})</div>
        </div>
      </div>
    </div>
  )
}
