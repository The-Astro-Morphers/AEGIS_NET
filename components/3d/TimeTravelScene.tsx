'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface TimeTravelSceneProps {
  selectedScenario: string
  onScenarioChange: (scenario: string) => void
  onTimeChange: (time: number) => void
  onError?: (error: string) => void
}

// Dynamically import Canvas to avoid SSR issues
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-high mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Loading 3D Canvas...</p>
      </div>
    </div>
  )
})

const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.OrbitControls })), { ssr: false })
const Text = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Text })), { ssr: false })
const Html = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Html })), { ssr: false })

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

// Timeline component
function Timeline({ 
  selectedScenario, 
  onScenarioChange 
}: { 
  selectedScenario: string
  onScenarioChange: (scenario: string) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Timeline ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[50, 2, 16, 100]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      
      {/* Scenario markers */}
      {scenarios.map((scenario, index) => {
        const angle = (index / scenarios.length) * Math.PI * 2
        const x = Math.cos(angle) * 50
        const z = Math.sin(angle) * 50
        const isSelected = selectedScenario === scenario.id
        
        return (
          <group key={scenario.id} position={[x, 0, z]}>
            <mesh onClick={() => onScenarioChange(scenario.id)}>
              <sphereGeometry args={[isSelected ? 3 : 2, 16, 16]} />
              <meshBasicMaterial 
                color={isSelected ? "#ff6b35" : "#666666"} 
              />
            </mesh>
            
            <Text
              position={[0, 5, 0]}
              fontSize={3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {scenario.year}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

// Scenario visualization component
function ScenarioVisualization({ 
  scenario 
}: { 
  scenario: HistoricalScenario 
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })
  
  return (
    <group ref={groupRef} position={[0, 10, 0]}>
      {/* Asteroid */}
      <mesh>
        <sphereGeometry args={[scenario.asteroidSize * 0.001, 16, 16]} />
        <meshStandardMaterial 
          color="#8B4513" 
          metalness={0.3} 
          roughness={0.7} 
        />
      </mesh>
      
      {/* Impact effects */}
      {scenario.id === 'chicxulub' && (
        <>
          {/* Crater */}
          <mesh position={[0, -5, 0]}>
            <cylinderGeometry args={[15, 15, 2, 32]} />
            <meshBasicMaterial color="#654321" transparent opacity={0.7} />
          </mesh>
          
          {/* Shockwave */}
          <mesh position={[0, -3, 0]}>
            <cylinderGeometry args={[20, 20, 0.5, 32]} />
            <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
          </mesh>
        </>
      )}
      
      {scenario.id === 'tunguska' && (
        <>
          {/* Airburst effect */}
          <mesh position={[0, 5, 0]}>
            <sphereGeometry args={[10, 16, 16]} />
            <meshBasicMaterial color="#ffa500" transparent opacity={0.5} />
          </mesh>
        </>
      )}
      
      {scenario.id === 'chelyabinsk' && (
        <>
          {/* Airburst trail */}
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[3, 8, 15, 16]} />
            <meshBasicMaterial color="#ffff00" transparent opacity={0.6} />
          </mesh>
        </>
      )}
      
      {/* Scenario info */}
      <Html position={[0, 20, 0]} center>
        <div className="bg-black/80 text-white p-3 rounded-lg text-center min-w-[200px]">
          <h3 className="font-bold text-lg">{scenario.name}</h3>
          <p className="text-sm text-gray-300">{scenario.year}</p>
          <p className="text-xs mt-2">{scenario.description}</p>
        </div>
      </Html>
    </group>
  )
}

// Main scene content
function SceneContent({
  selectedScenario,
  onScenarioChange,
  onTimeChange
}: TimeTravelSceneProps) {
  const [currentTime, setCurrentTime] = useState(0)
  
  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario) || scenarios[0]
  
  const handleTimeChange = (time: number) => {
    setCurrentTime(time)
    onTimeChange(time)
  }
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 50, 0]} intensity={0.5} />
      
      {/* Timeline */}
      <Timeline selectedScenario={selectedScenario} onScenarioChange={onScenarioChange} />
      
      {/* Scenario visualization */}
      <ScenarioVisualization scenario={selectedScenarioData} />
      
      {/* Time indicator */}
      <mesh position={[0, -30, 0]}>
        <boxGeometry args={[2, 20, 2]} />
        <meshBasicMaterial color="#ff6b35" />
      </mesh>
      
      {/* Orbit Controls */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  )
}

// Control panel component
function ControlPanel({
  scenarios,
  selectedScenario,
  currentTime,
  onScenarioChange,
  onTimeChange
}: {
  scenarios: HistoricalScenario[]
  selectedScenario: string
  currentTime: number
  onScenarioChange: (scenario: string) => void
  onTimeChange: (time: number) => void
}) {
  return (
    <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg space-y-3 min-w-[250px] z-10">
      <h3 className="text-lg font-bold">Historical Scenarios</h3>
      
      {scenarios.map((scenario) => (
        <button
          key={scenario.id}
          onClick={() => onScenarioChange(scenario.id)}
          className={`w-full text-left p-2 rounded ${
            selectedScenario === scenario.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <div className="font-semibold">{scenario.name}</div>
          <div className="text-xs">{scenario.year}</div>
        </button>
      ))}
      
      <div className="pt-2 border-t border-gray-600">
        <label className="text-sm font-medium">Time Position: {currentTime}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={currentTime}
          onChange={(e) => onTimeChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}

// Main time travel scene component
export default function TimeTravelScene({
  selectedScenario,
  onScenarioChange,
  onTimeChange,
  onError
}: TimeTravelSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoaded(true)
    }
  }, [])
  
  const handleTimeChange = (time: number) => {
    setCurrentTime(time)
    onTimeChange(time)
  }
  
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency-high mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading 3D Time Travel...</p>
          <p className="text-sm text-gray-300">Initializing Three.js components</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas 
        camera={{ position: [100, 50, 100], fov: 60 }}
        onError={(error) => {
          console.error('Canvas error:', error)
          if (onError) {
            onError(error.toString())
          }
        }}
      >
        <SceneContent
          selectedScenario={selectedScenario}
          onScenarioChange={onScenarioChange}
          onTimeChange={handleTimeChange}
          onError={onError}
        />
      </Canvas>
      
      <ControlPanel
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        currentTime={currentTime}
        onScenarioChange={onScenarioChange}
        onTimeChange={handleTimeChange}
      />
    </div>
  )
}
