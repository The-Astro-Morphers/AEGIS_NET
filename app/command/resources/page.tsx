'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ResourceManager from '@/components/command/ResourceManager'
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
  RotateCcw,
  BarChart3,
  Play,
  Download,
  Share2
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

interface ResourceAllocation {
  id: string
  resourceId: string
  allocation: number
  timestamp: Date
  reason: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([])
  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [isAllocating, setIsAllocating] = useState(false)

  // Mock data
  useEffect(() => {
    setResources([
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

    setAllocations([
      {
        id: '1',
        resourceId: '1',
        allocation: 50,
        timestamp: new Date(),
        reason: 'Emergency medical response',
        status: 'approved'
      },
      {
        id: '2',
        resourceId: '2',
        allocation: 200,
        timestamp: new Date(Date.now() - 3600000),
        reason: 'Evacuation shelter capacity',
        status: 'pending'
      }
    ])
  }, [])

  const handleResourceAllocation = async (resourceId: string, allocation: number, reason: string) => {
    setIsAllocating(true)
    
    try {
      // Simulate allocation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newAllocation: ResourceAllocation = {
        id: Date.now().toString(),
        resourceId,
        allocation,
        timestamp: new Date(),
        reason,
        status: 'pending'
      }
      
      setAllocations(prev => [newAllocation, ...prev])
      
      // Update resource load
      setResources(prev => 
        prev.map(resource => 
          resource.id === resourceId 
            ? { ...resource, currentLoad: resource.currentLoad + allocation }
            : resource
        )
      )
      
    } catch (error) {
      console.error('Allocation failed:', error)
    } finally {
      setIsAllocating(false)
    }
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

  const getStatusColorAllocation = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'rejected': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
   

      {/* Resource Manager Component */}
      <ResourceManager />

      {/* Resource Allocation */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Resource Allocation</CardTitle>
          <CardDescription className="text-gray-300">
            Allocate resources to specific areas or teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Allocate Resources</h4>
              <div className="space-y-3">
                {resources.map((resource) => (
                  <div key={resource.id} className="p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getResourceIcon(resource.type)}
                        <span className="font-semibold text-white">{resource.name}</span>
                      </div>
                      <Badge className={getStatusColor(resource.status)}>
                        {resource.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-300 space-y-1">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span>{resource.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Load:</span>
                        <span>{resource.currentLoad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available:</span>
                        <span className="text-green-400">{resource.capacity - resource.currentLoad}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex space-x-2">
                      <Button
                        onClick={() => handleResourceAllocation(resource.id, 10, 'Emergency allocation')}
                        disabled={isAllocating || resource.currentLoad >= resource.capacity}
                        size="sm"
                        className="flex-1 bg-emergency-high hover:bg-emergency-high/90"
                      >
                        {isAllocating ? 'Allocating...' : 'Allocate 10'}
                      </Button>
                      <Button
                        onClick={() => handleResourceAllocation(resource.id, 50, 'Bulk allocation')}
                        disabled={isAllocating || resource.currentLoad >= resource.capacity}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        Allocate 50
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Allocation History</h4>
              <div className="space-y-3">
                {allocations.map((allocation) => {
                  const resource = resources.find(r => r.id === allocation.resourceId)
                  return (
                    <div key={allocation.id} className="p-3 bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {resource && getResourceIcon(resource.type)}
                          <span className="font-semibold text-white">{resource?.name}</span>
                        </div>
                        <Badge className={getStatusColorAllocation(allocation.status)}>
                          {allocation.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-300 space-y-1">
                        <div className="flex justify-between">
                          <span>Allocation:</span>
                          <span className="text-white">{allocation.allocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reason:</span>
                          <span className="text-white">{allocation.reason}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="text-white">{allocation.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Analytics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Resource Analytics</CardTitle>
          <CardDescription className="text-gray-300">
            Performance metrics and utilization statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-high">
                {resources.filter(r => r.status === 'available').length}
              </div>
              <div className="text-sm text-gray-300">Available Resources</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-medium">
                {Math.round(resources.reduce((acc, r) => acc + (r.currentLoad / r.capacity), 0) / resources.length * 100)}%
              </div>
              <div className="text-sm text-gray-300">Average Utilization</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-high">
                {resources.filter(r => r.priority === 'critical').length}
              </div>
              <div className="text-sm text-gray-300">Critical Priority</div>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <div className="text-2xl font-bold text-emergency-medium">
                {allocations.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-300">Pending Allocations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Response Teams */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Emergency Response Teams</CardTitle>
          <CardDescription className="text-gray-300">
            Manage and coordinate emergency response teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Medical Response Team', status: 'active', members: 15, location: 'Hospital' },
              { name: 'Evacuation Team', status: 'active', members: 8, location: 'Central Station' },
              { name: 'Search & Rescue', status: 'standby', members: 12, location: 'Fire Station' },
              { name: 'Communication Team', status: 'active', members: 5, location: 'Command Center' },
              { name: 'Logistics Team', status: 'active', members: 10, location: 'Supply Depot' },
              { name: 'Security Team', status: 'standby', members: 6, location: 'Police Station' }
            ].map((team, index) => (
              <div key={index} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{team.name}</h4>
                  <Badge className={team.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}>
                    {team.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Members:</span>
                    <span className="text-white">{team.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="text-white">{team.location}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Deploy
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}