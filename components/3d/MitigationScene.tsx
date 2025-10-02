'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useFrame } from '@react-three/fiber'
import { Text, Line } from '@react-three/drei'
import * as THREE from 'three'

interface MitigationSceneProps {
  asteroidSize: number
  velocity: number
  timeToImpact: number
  onDeflectionCalculated: (deflection: number, success: boolean) => void
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

// Asteroid trajectory component
function AsteroidTrajectory({ 
  originalPath, 
  deflectedPath, 
  deflectionAmount 
}: {
  originalPath: THREE.Vector3[]
  deflectedPath: THREE.Vector3[]
  deflectionAmount: number
}) {
  return (
    <>
      {/* Original trajectory */}
      <Line
        points={originalPath}
        color="red"
        lineWidth={3}
        transparent
        opacity={0.7}
      />
      
      {/* Deflected trajectory */}
      <Line
        points={deflectedPath}
        color="green"
        lineWidth={3}
        transparent
        opacity={0.7}
      />
      
      {/* Deflection angle indicator */}
      <Text
        position={[0, 5, 0]}
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Deflection: {deflectionAmount.toFixed(2)}°
      </Text>
    </>
  )
}

// Kinetic impactor visualization
function KineticImpactor({ 
  position, 
  velocity, 
  isActive 
}: {
  position: [number, number, number]
  velocity: number
  isActive: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.y += 0.02
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 3]} />
      <meshStandardMaterial 
        color={isActive ? "#ff6b35" : "#666666"} 
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Gravity tractor visualization
function GravityTractor({ 
  position, 
  isActive, 
  tractorStrength 
}: {
  position: [number, number, number]
  isActive: boolean
  tractorStrength: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.01
    }
  })
  
  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[2, 2, 0.5, 8]} />
        <meshStandardMaterial 
          color={isActive ? "#4dabf7" : "#666666"} 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Tractor beam visualization */}
      {isActive && (
        <mesh position={[0, -tractorStrength * 2, 0]}>
          <cylinderGeometry args={[0.1, 0.1, tractorStrength * 4, 8]} />
          <meshBasicMaterial color="#4dabf7" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  )
}

// Main 3D scene content
function SceneContent({ 
  asteroidSize, 
  velocity, 
  timeToImpact,
  onDeflectionCalculated 
}: MitigationSceneProps) {
  const [kineticImpactorActive, setKineticImpactorActive] = useState(false)
  const [gravityTractorActive, setGravityTractorActive] = useState(false)
  const [deflectionAmount, setDeflectionAmount] = useState(0)
  
  // Listen for control panel events
  useEffect(() => {
    const handleKineticImpactor = () => {
      setKineticImpactorActive(true)
      setGravityTractorActive(false)
      
      // Calculate deflection based on asteroid size and velocity
      const deflection = Math.max(0, 15 - asteroidSize * 0.3 - velocity * 0.2)
      setDeflectionAmount(deflection)
      
      setTimeout(() => {
        onDeflectionCalculated(deflection, deflection > 5)
      }, 2000)
    }
    
    const handleGravityTractor = () => {
      setGravityTractorActive(true)
      setKineticImpactorActive(false)
      
      // Calculate deflection based on time available
      const deflection = Math.max(0, timeToImpact * 0.1 - asteroidSize * 0.1)
      setDeflectionAmount(deflection)
      
      setTimeout(() => {
        onDeflectionCalculated(deflection, deflection > 3)
      }, 3000)
    }
    
    const handleReset = () => {
      setKineticImpactorActive(false)
      setGravityTractorActive(false)
      setDeflectionAmount(0)
    }
    
    // Set up event listeners for control panel
    window.addEventListener('kinetic-impactor', handleKineticImpactor)
    window.addEventListener('gravity-tractor', handleGravityTractor)
    window.addEventListener('reset-simulation', handleReset)
    
    return () => {
      window.removeEventListener('kinetic-impactor', handleKineticImpactor)
      window.removeEventListener('gravity-tractor', handleGravityTractor)
      window.removeEventListener('reset-simulation', handleReset)
    }
  }, [asteroidSize, velocity, timeToImpact, onDeflectionCalculated])
  
  // Calculate trajectories
  const originalPath = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      points.push(new THREE.Vector3(
        -50 + t * 50,
        Math.sin(t * Math.PI) * 10,
        t * 20
      ))
    }
    return points
  }, [])
  
  const deflectedPath = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      const deflection = kineticImpactorActive ? deflectionAmount * 0.1 : 
                        gravityTractorActive ? deflectionAmount * 0.05 : 0
      points.push(new THREE.Vector3(
        -50 + t * 50 + deflection,
        Math.sin(t * Math.PI) * 10,
        t * 20
      ))
    }
    return points
  }, [kineticImpactorActive, gravityTractorActive, deflectionAmount])
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Asteroid */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[asteroidSize * 0.1, 16, 16]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Trajectories */}
      <AsteroidTrajectory
        originalPath={originalPath}
        deflectedPath={deflectedPath}
        deflectionAmount={deflectionAmount}
      />
      
      {/* Kinetic Impactor */}
      <KineticImpactor
        position={[-30, 5, 10]}
        velocity={velocity}
        isActive={kineticImpactorActive}
      />
      
      {/* Gravity Tractor */}
      <GravityTractor
        position={[-20, 8, 15]}
        isActive={gravityTractorActive}
        tractorStrength={gravityTractorActive ? 2 : 0}
      />
      
      {/* Labels */}
      <Text position={[0, 8, 0]} fontSize={2} color="white" anchorX="center">
        Asteroid
      </Text>
      <Text position={[-30, 8, 10]} fontSize={1.5} color="#ff6b35" anchorX="center">
        Kinetic Impactor
      </Text>
      <Text position={[-20, 10, 15]} fontSize={1.5} color="#4dabf7" anchorX="center">
        Gravity Tractor
      </Text>
      
      {/* Orbit Controls */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  )
}

// Main mitigation scene component
export default function MitigationScene({ 
  asteroidSize, 
  velocity, 
  timeToImpact,
  onDeflectionCalculated,
  onError
}: MitigationSceneProps) {
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
          <p className="text-lg font-semibold">Loading 3D Visualization...</p>
          <p className="text-sm text-gray-300">Initializing Three.js components</p>
        </div>
      </div>
    )
  }
  
  return (
    <Canvas 
      camera={{ position: [50, 30, 50], fov: 60 }}
      onError={(error) => {
        console.error('Canvas error:', error)
        if (onError) {
          onError(error.toString())
        }
      }}
    >
      <SceneContent
        asteroidSize={asteroidSize}
        velocity={velocity}
        timeToImpact={timeToImpact}
        onDeflectionCalculated={onDeflectionCalculated}
        onError={onError}
      />
    </Canvas>
  )
}