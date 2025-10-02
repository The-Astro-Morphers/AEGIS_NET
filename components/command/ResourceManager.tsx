'use client'

import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  MapPin, 
  Users, 
  Car, 
  Phone, 
  Home, 
  Building2, 
  Heart, 
  Shield, 
  Navigation,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw
} from 'lucide-react'

interface Resource {
  id: string
  type: 'hospital' | 'shelter' | 'medical_team' | 'evacuation_vehicle' | 'supply_depot'
  name: string
  position: { x: number; y: number }
  capacity: number
  currentLoad: number
  status: 'available' | 'busy' | 'offline' | 'maintenance'
  priority: 'low' | 'medium' | 'high' | 'critical'
  contact: string
  supplies: string[]
}

interface DragItem {
  id: string
  type: string
  position: { x: number; y: number }
}

export default function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      type: 'hospital',
      name: 'City General Hospital',
      position: { x: 100, y: 150 },
      capacity: 500,
      currentLoad: 320,
      status: 'available',
      priority: 'high',
      contact: '(555) 123-4567',
      supplies: ['Medical supplies', 'Emergency equipment', 'Blood bank']
    },
    {
      id: '2',
      type: 'shelter',
      name: 'Central Emergency Shelter',
      position: { x: 200, y: 100 },
      capacity: 1000,
      currentLoad: 750,
      status: 'available',
      priority: 'critical',
      contact: '(555) 234-5678',
      supplies: ['Food', 'Water', 'Blankets', 'First aid']
    },
    {
      id: '3',
      type: 'medical_team',
      name: 'Emergency Medical Team Alpha',
      position: { x: 150, y: 200 },
      capacity: 20,
      currentLoad: 15,
      status: 'available',
      priority: 'high',
      contact: '(555) 345-6789',
      supplies: ['Medical equipment', 'Medications', 'Transport']
    },
    {
      id: '4',
      type: 'evacuation_vehicle',
      name: 'Evacuation Bus #1',
      position: { x: 250, y: 180 },
      capacity: 50,
      currentLoad: 0,
      status: 'available',
      priority: 'medium',
      contact: '(555) 456-7890',
      supplies: ['Fuel', 'Emergency supplies', 'Communication']
    }
  ])

  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null)
  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newResource, setNewResource] = useState<Partial<Resource>>({})

  const mapRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.DragEvent, resource: Resource) => {
    setDraggedItem({
      id: resource.id,
      type: resource.type,
      position: resource.position
    })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    
    if (!draggedItem || !mapRef.current) return

    const rect = mapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setResources(prev => 
      prev.map(resource => 
        resource.id === draggedItem.id 
          ? { ...resource, position: { x, y } }
          : resource
      )
    )

    setDraggedItem(null)
  }

  const handleResourceClick = (resourceId: string) => {
    setSelectedResource(resourceId)
    setIsEditing(false)
  }

  const handleEditResource = (resourceId: string) => {
    setSelectedResource(resourceId)
    setIsEditing(true)
    const resource = resources.find(r => r.id === resourceId)
    if (resource) {
      setNewResource(resource)
    }
  }

  const handleSaveResource = () => {
    if (!selectedResource || !newResource) return

    setResources(prev => 
      prev.map(resource => 
        resource.id === selectedResource 
          ? { ...resource, ...newResource }
          : resource
      )
    )

    setIsEditing(false)
    setNewResource({})
  }

  const handleDeleteResource = (resourceId: string) => {
    setResources(prev => prev.filter(resource => resource.id !== resourceId))
    setSelectedResource(null)
  }

  const handleAddResource = () => {
    const newId = Date.now().toString()
    const newResourceData: Resource = {
      id: newId,
      type: 'shelter',
      name: 'New Resource',
      position: { x: 300, y: 200 },
      capacity: 100,
      currentLoad: 0,
      status: 'available',
      priority: 'medium',
      contact: '',
      supplies: []
    }

    setResources(prev => [...prev, newResourceData])
    setSelectedResource(newId)
    setIsEditing(true)
    setNewResource(newResourceData)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Building2 className="h-5 w-5" />
      case 'shelter': return <Home className="h-5 w-5" />
      case 'medical_team': return <Users className="h-5 w-5" />
      case 'evacuation_vehicle': return <Car className="h-5 w-5" />
      case 'supply_depot': return <Shield className="h-5 w-5" />
      default: return <MapPin className="h-5 w-5" />
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'hospital': return 'bg-red-600'
      case 'shelter': return 'bg-blue-600'
      case 'medical_team': return 'bg-green-600'
      case 'evacuation_vehicle': return 'bg-yellow-600'
      case 'supply_depot': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-600'
      case 'busy': return 'bg-yellow-600'
      case 'offline': return 'bg-red-600'
      case 'maintenance': return 'bg-orange-600'
      default: return 'bg-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const selectedResourceData = resources.find(r => r.id === selectedResource)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Resource Management</h1>
        <p className="text-lg text-gray-300">Drag-and-drop tools for hospitals, shelters, and medical teams</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Map */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Resource Map</CardTitle>
              <CardDescription className="text-gray-300">
                Drag resources to reposition them on the map
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={mapRef}
                className="relative w-full h-[500px] bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {/* Grid background */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-gray-600" style={{ top: `${i * 5}%` }} />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="absolute h-full w-px bg-gray-600" style={{ left: `${i * 5}%` }} />
                  ))}
                </div>

                {/* Resources */}
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, resource)}
                    onClick={() => handleResourceClick(resource.id)}
                    className={`absolute w-12 h-12 rounded-full cursor-move flex items-center justify-center text-white transition-all hover:scale-110 ${
                      selectedResource === resource.id ? 'ring-4 ring-emergency-high' : ''
                    } ${getResourceColor(resource.type)}`}
                    style={{
                      left: resource.position.x - 24,
                      top: resource.position.y - 24
                    }}
                  >
                    {getResourceIcon(resource.type)}
                  </div>
                ))}

                {/* Add Resource Button */}
                <Button
                  onClick={handleAddResource}
                  className="absolute top-4 right-4 bg-emergency-high hover:bg-emergency-high/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource Details */}
        <div>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Resource Details</CardTitle>
              <CardDescription className="text-gray-300">
                {selectedResource ? 'Selected resource information' : 'Click a resource to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedResourceData ? (
                <div className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={newResource.name || ''}
                          onChange={(e) => setNewResource(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Type
                        </label>
                        <select
                          value={newResource.type || 'shelter'}
                          onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value as any }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                        >
                          <option value="hospital">Hospital</option>
                          <option value="shelter">Shelter</option>
                          <option value="medical_team">Medical Team</option>
                          <option value="evacuation_vehicle">Evacuation Vehicle</option>
                          <option value="supply_depot">Supply Depot</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Capacity
                        </label>
                        <input
                          type="number"
                          value={newResource.capacity || 0}
                          onChange={(e) => setNewResource(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Priority
                        </label>
                        <select
                          value={newResource.priority || 'medium'}
                          onChange={(e) => setNewResource(prev => ({ ...prev, priority: e.target.value as any }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Contact
                        </label>
                        <input
                          type="text"
                          value={newResource.contact || ''}
                          onChange={(e) => setNewResource(prev => ({ ...prev, contact: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSaveResource}
                          size="sm"
                          className="flex-1 bg-emergency-high hover:bg-emergency-high/90"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">{selectedResourceData.name}</h4>
                        <Badge className={getResourceColor(selectedResourceData.type)}>
                          {selectedResourceData.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Status:</span>
                          <Badge className={getStatusColor(selectedResourceData.status)}>
                            {selectedResourceData.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Priority:</span>
                          <Badge className={getPriorityColor(selectedResourceData.priority)}>
                            {selectedResourceData.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Capacity:</span>
                          <span className="text-white">{selectedResourceData.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Current Load:</span>
                          <span className="text-white">{selectedResourceData.currentLoad}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Contact:</span>
                          <span className="text-white">{selectedResourceData.contact}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-white mb-2">Supplies:</h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedResourceData.supplies.map((supply, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {supply}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEditResource(selectedResourceData.id)}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteResource(selectedResourceData.id)}
                          size="sm"
                          variant="outline"
                          className="flex-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Click a resource on the map to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resource Summary */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Resource Summary</CardTitle>
          <CardDescription className="text-gray-300">
            Overview of all resources and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['hospital', 'shelter', 'medical_team', 'evacuation_vehicle'].map((type) => {
              const typeResources = resources.filter(r => r.type === type)
              const available = typeResources.filter(r => r.status === 'available').length
              const total = typeResources.length
              
              return (
                <div key={type} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(type)}
                      <span className="font-semibold text-white capitalize">
                        {type.replace('_', ' ')}s
                      </span>
                    </div>
                    <Badge className={getResourceColor(type)}>
                      {available}/{total}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Available:</span>
                      <span className="text-green-400">{available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="text-white">{total}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

