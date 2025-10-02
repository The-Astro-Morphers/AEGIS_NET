'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AlertSystem from '@/components/communication/AlertSystem'
import { 
  Bell, 
  Send, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Radio,
  Tv,
  Smartphone,
  Globe,
  BarChart3,
  Play,
  RotateCcw,
  Download,
  Share2
} from 'lucide-react'

interface BroadcastChannel {
  id: string
  name: string
  type: 'tv' | 'radio' | 'internet' | 'satellite'
  coverage: string
  status: 'active' | 'inactive' | 'maintenance'
  audience: number
}

interface EmergencyTemplate {
  id: string
  name: string
  category: 'evacuation' | 'shelter' | 'medical' | 'general'
  content: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  channels: string[]
}

export default function CommunicationPage() {
  const [broadcastChannels, setBroadcastChannels] = useState<BroadcastChannel[]>([])
  const [templates, setTemplates] = useState<EmergencyTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isBroadcasting, setIsBroadcasting] = useState(false)

  // Mock data
  useEffect(() => {
    setBroadcastChannels([
      {
        id: '1',
        name: 'Emergency TV Network',
        type: 'tv',
        coverage: 'National',
        status: 'active',
        audience: 50000000
      },
      {
        id: '2',
        name: 'Emergency Radio Network',
        type: 'radio',
        coverage: 'Regional',
        status: 'active',
        audience: 10000000
      },
      {
        id: '3',
        name: 'Internet Emergency Channel',
        type: 'internet',
        coverage: 'Global',
        status: 'active',
        audience: 200000000
      },
      {
        id: '4',
        name: 'Satellite Emergency Network',
        type: 'satellite',
        coverage: 'Global',
        status: 'active',
        audience: 1000000000
      }
    ])

    setTemplates([
      {
        id: '1',
        name: 'Immediate Evacuation Order',
        category: 'evacuation',
        content: '🚨 IMMEDIATE EVACUATION ORDER: Asteroid impact expected in 24 hours. Evacuate immediately to designated shelters. Follow official evacuation routes. Do not delay. #AsteroidAlert #Emergency',
        severity: 'critical',
        channels: ['tv', 'radio', 'internet', 'satellite']
      },
      {
        id: '2',
        name: 'Shelter Status Update',
        category: 'shelter',
        content: 'Emergency shelters are now open and accepting evacuees. All shelters have food, water, and medical supplies. Please remain calm and follow instructions from emergency personnel.',
        severity: 'high',
        channels: ['tv', 'radio', 'internet']
      },
      {
        id: '3',
        name: 'Medical Emergency Alert',
        category: 'medical',
        content: 'Medical emergency services are fully operational. If you need medical assistance, call 911 or go to the nearest emergency room. All hospitals are prepared for mass casualties.',
        severity: 'high',
        channels: ['tv', 'radio', 'internet', 'satellite']
      },
      {
        id: '4',
        name: 'General Safety Update',
        category: 'general',
        content: 'Stay informed about the latest developments. Monitor official channels for updates. Do not spread unverified information. Trust only official sources.',
        severity: 'medium',
        channels: ['internet', 'satellite']
      }
    ])
  }, [])

  const startBroadcast = async (templateId: string) => {
    setIsBroadcasting(true)
    setSelectedTemplate(templateId)
    
    try {
      // Simulate broadcast
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Update channel status
      setBroadcastChannels(prev => 
        prev.map(channel => ({
          ...channel,
          status: 'active' as const
        }))
      )
      
    } catch (error) {
      console.error('Broadcast failed:', error)
    } finally {
      setIsBroadcasting(false)
    }
  }

  const stopBroadcast = () => {
    setIsBroadcasting(false)
    setSelectedTemplate(null)
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'tv': return <Tv className="h-5 w-5" />
      case 'radio': return <Radio className="h-5 w-5" />
      case 'internet': return <Globe className="h-5 w-5" />
      case 'satellite': return <Smartphone className="h-5 w-5" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'inactive': return 'bg-red-600'
      case 'maintenance': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'evacuation': return 'bg-red-600'
      case 'shelter': return 'bg-blue-600'
      case 'medical': return 'bg-green-600'
      case 'general': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Communication & Alerts</h1>
        <p className="text-lg text-gray-300">Emergency broadcast integration and social media automation</p>
      </div>

      {/* Alert System Component */}
      <AlertSystem />

      {/* Broadcast Channels */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Radio className="h-6 w-6 mr-2" />
            Broadcast Channels
          </CardTitle>
          <CardDescription className="text-gray-300">
            Manage emergency broadcast channels and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {broadcastChannels.map((channel) => (
              <div key={channel.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getChannelIcon(channel.type)}
                    <h4 className="font-semibold text-white">{channel.name}</h4>
                  </div>
                  <Badge className={getStatusColor(channel.status)}>
                    {channel.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span>{channel.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audience:</span>
                    <span>{channel.audience.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Test
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Templates */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Emergency Templates</CardTitle>
          <CardDescription className="text-gray-300">
            Pre-configured emergency messages for different scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{template.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category.toUpperCase()}
                    </Badge>
                    <Badge className={getSeverityColor(template.severity)}>
                      {template.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{template.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Channels:</span>
                    {template.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => startBroadcast(template.id)}
                      disabled={isBroadcasting}
                      size="sm"
                      className="bg-emergency-high hover:bg-emergency-high/90"
                    >
                      {isBroadcasting && selectedTemplate === template.id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                          Broadcasting...
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-2" />
                          Broadcast
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Broadcast Status */}
      {isBroadcasting && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Radio className="h-6 w-6 mr-2" />
              Live Broadcast Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">LIVE</span>
                </div>
                <Button onClick={stopBroadcast} variant="outline" size="sm">
                  Stop Broadcast
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">4</div>
                  <div className="text-sm text-gray-300">Active Channels</div>
                </div>
                <div className="text-center p-4 bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">1.2B</div>
                  <div className="text-sm text-gray-300">Total Reach</div>
                </div>
                <div className="text-center p-4 bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">98%</div>
                  <div className="text-sm text-gray-300">Delivery Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Push Notifications */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Push Notifications</CardTitle>
          <CardDescription className="text-gray-300">
            Mobile and web push notification management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Notification Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Emergency Alerts</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Shelter Updates</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Medical Alerts</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">General Updates</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Notification Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Sent:</span>
                  <span className="text-white font-mono">1,234,567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Delivery Rate:</span>
                  <span className="text-white font-mono">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Open Rate:</span>
                  <span className="text-white font-mono">87.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Click Rate:</span>
                  <span className="text-white font-mono">23.1%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Integration */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Social Media Integration</CardTitle>
          <CardDescription className="text-gray-300">
            Automated social media posting and engagement tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Platform Status</h4>
              <div className="space-y-3">
                {[
                  { platform: 'Twitter', status: 'connected', followers: '2.5M' },
                  { platform: 'Facebook', status: 'connected', followers: '1.8M' },
                  { platform: 'Instagram', status: 'connected', followers: '1.2M' },
                  { platform: 'LinkedIn', status: 'disconnected', followers: '0' }
                ].map((platform) => (
                  <div key={platform.platform} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        platform.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-white">{platform.platform}</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      {platform.followers} followers
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { platform: 'Twitter', content: 'Asteroid impact warning issued...', engagement: '2.1K' },
                  { platform: 'Facebook', content: 'Emergency shelters are now open...', engagement: '5.3K' },
                  { platform: 'Instagram', content: 'Stay safe during evacuation...', engagement: '1.8K' }
                ].map((post, index) => (
                  <div key={index} className="p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{post.platform}</span>
                      <span className="text-sm text-gray-400">{post.engagement} engagement</span>
                    </div>
                    <p className="text-sm text-gray-300">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

