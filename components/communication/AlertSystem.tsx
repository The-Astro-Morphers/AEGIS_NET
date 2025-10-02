'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
  Globe
} from 'lucide-react'

interface AlertMessage {
  id: string
  title: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  targetArea: string
  timestamp: Date
  status: 'draft' | 'sent' | 'delivered' | 'failed'
  channels: ('push' | 'sms' | 'email' | 'tv' | 'radio' | 'social')[]
}

interface EmergencyContact {
  id: string
  name: string
  type: 'emergency' | 'shelter' | 'hospital' | 'government'
  phone: string
  email: string
  area: string
  status: 'active' | 'inactive' | 'busy'
}

interface SocialMediaPost {
  id: string
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
  content: string
  status: 'draft' | 'scheduled' | 'posted' | 'failed'
  scheduledTime?: Date
  engagement?: {
    likes: number
    shares: number
    comments: number
  }
}

export default function AlertSystem() {
  const [alerts, setAlerts] = useState<AlertMessage[]>([])
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([])
  const [selectedArea, setSelectedArea] = useState<string>('all')
  const [isSending, setIsSending] = useState(false)

  // Mock data
  useEffect(() => {
    setAlerts([
      {
        id: '1',
        title: 'Asteroid Impact Warning',
        message: 'Asteroid impact expected in 24 hours. Evacuate immediately to designated shelters.',
        severity: 'critical',
        targetArea: 'New York City',
        timestamp: new Date(),
        status: 'sent',
        channels: ['push', 'sms', 'tv', 'radio']
      },
      {
        id: '2',
        title: 'Shelter Status Update',
        message: 'All emergency shelters are now open and accepting evacuees.',
        severity: 'medium',
        targetArea: 'All Areas',
        timestamp: new Date(Date.now() - 3600000),
        status: 'delivered',
        channels: ['push', 'social']
      }
    ])

    setContacts([
      {
        id: '1',
        name: 'Emergency Services',
        type: 'emergency',
        phone: '911',
        email: 'emergency@city.gov',
        area: 'All Areas',
        status: 'active'
      },
      {
        id: '2',
        name: 'Central Shelter',
        type: 'shelter',
        phone: '(555) 123-4567',
        email: 'shelter@city.gov',
        area: 'Downtown',
        status: 'active'
      },
      {
        id: '3',
        name: 'City Hospital',
        type: 'hospital',
        phone: '(555) 987-6543',
        email: 'hospital@city.gov',
        area: 'Medical District',
        status: 'active'
      }
    ])

    setSocialPosts([
      {
        id: '1',
        platform: 'twitter',
        content: '🚨 ASTEROID IMPACT WARNING: Evacuate immediately to designated shelters. Follow official instructions. #AsteroidAlert #Emergency',
        status: 'posted',
        engagement: { likes: 1250, shares: 890, comments: 234 }
      },
      {
        id: '2',
        platform: 'facebook',
        content: 'Emergency Alert: Asteroid impact expected in 24 hours. Please evacuate to designated shelters immediately. Stay safe!',
        status: 'scheduled',
        scheduledTime: new Date(Date.now() + 3600000)
      }
    ])
  }, [])

  const sendAlert = async (alert: Omit<AlertMessage, 'id' | 'timestamp' | 'status'>) => {
    setIsSending(true)
    
    try {
      // Simulate sending alert
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newAlert: AlertMessage = {
        ...alert,
        id: Date.now().toString(),
        timestamp: new Date(),
        status: 'sent'
      }
      
      setAlerts(prev => [newAlert, ...prev])
      
      // Simulate delivery status updates
      setTimeout(() => {
        setAlerts(prev => 
          prev.map(a => 
            a.id === newAlert.id 
              ? { ...a, status: 'delivered' }
              : a
          )
        )
      }, 3000)
      
    } catch (error) {
      console.error('Failed to send alert:', error)
    } finally {
      setIsSending(false)
    }
  }

  const createSocialPost = (platform: string, content: string) => {
    const newPost: SocialMediaPost = {
      id: Date.now().toString(),
      platform: platform as any,
      content,
      status: 'draft'
    }
    
    setSocialPosts(prev => [newPost, ...prev])
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-600'
      case 'delivered': return 'bg-green-600'
      case 'failed': return 'bg-red-600'
      case 'draft': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'push': return <Smartphone className="h-4 w-4" />
      case 'sms': return <Send className="h-4 w-4" />
      case 'email': return <Globe className="h-4 w-4" />
      case 'tv': return <Tv className="h-4 w-4" />
      case 'radio': return <Radio className="h-4 w-4" />
      case 'social': return <Users className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
  
      {/* Alert Creation */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Bell className="h-6 w-6 mr-2" />
            Create Emergency Alert
          </CardTitle>
          <CardDescription className="text-gray-300">
            Send alerts to affected areas through multiple channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Alert Title
                </label>
                <input
                  type="text"
                  placeholder="Enter alert title"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emergency-high"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Enter alert message"
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emergency-high"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Area
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high"
                >
                  <option value="all">All Areas</option>
                  <option value="downtown">Downtown</option>
                  <option value="suburbs">Suburbs</option>
                  <option value="coastal">Coastal Areas</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Severity Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['low', 'medium', 'high', 'critical'].map((level) => (
                    <button
                      key={level}
                      className={`p-2 rounded text-sm font-medium ${
                        level === 'critical'
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {level.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Communication Channels
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['push', 'sms', 'email', 'tv', 'radio', 'social'].map((channel) => (
                    <label key={channel} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-300 capitalize">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={() => sendAlert({
                  title: 'Test Alert',
                  message: 'This is a test alert message',
                  severity: 'high',
                  targetArea: selectedArea,
                  channels: ['push', 'sms']
                })}
                disabled={isSending}
                className="w-full bg-emergency-high hover:bg-emergency-high/90"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Alert...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Alert
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert History */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Alert History</CardTitle>
          <CardDescription className="text-gray-300">
            Recent alerts and their delivery status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{alert.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{alert.message}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {alert.targetArea}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {alert.timestamp.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {alert.channels.map((channel) => (
                      <div key={channel} className="flex items-center text-xs">
                        {getChannelIcon(channel)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Emergency Contacts</CardTitle>
          <CardDescription className="text-gray-300">
            Manage emergency contact information and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{contact.name}</h4>
                  <Badge 
                    className={
                      contact.status === 'active' ? 'bg-green-600' :
                      contact.status === 'busy' ? 'bg-yellow-600' : 'bg-red-600'
                    }
                  >
                    {contact.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400">Type:</span>
                    <span className="capitalize">{contact.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400">Phone:</span>
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-400">Area:</span>
                    <span>{contact.area}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Automation */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Social Media Automation</CardTitle>
          <CardDescription className="text-gray-300">
            Coordinate emergency posts across social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Create Social Post */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Create New Post</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Platform
                    </label>
                    <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emergency-high">
                      <option value="twitter">Twitter</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Content
                    </label>
                    <textarea
                      placeholder="Enter post content"
                      rows={4}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emergency-high"
                    />
                  </div>
                  
                  <Button
                    onClick={() => createSocialPost('twitter', 'Test post content')}
                    className="w-full bg-emergency-high hover:bg-emergency-high/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Post Templates</h4>
                <div className="space-y-2">
                  {[
                    '🚨 ASTEROID IMPACT WARNING: Evacuate immediately to designated shelters. Follow official instructions. #AsteroidAlert #Emergency',
                    'Emergency Alert: Asteroid impact expected in 24 hours. Please evacuate to designated shelters immediately. Stay safe!',
                    'All emergency shelters are now open and accepting evacuees. Please follow evacuation routes and stay calm. #EmergencyResponse'
                  ].map((template, index) => (
                    <button
                      key={index}
                      onClick={() => createSocialPost('twitter', template)}
                      className="w-full p-3 text-left text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Social Media Posts */}
            <div>
              <h4 className="font-semibold text-white mb-3">Recent Posts</h4>
              <div className="space-y-3">
                {socialPosts.map((post) => (
                  <div key={post.id} className="p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white capitalize">{post.platform}</span>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status.toUpperCase()}
                        </Badge>
                      </div>
                      {post.scheduledTime && (
                        <span className="text-sm text-gray-400">
                          Scheduled: {post.scheduledTime.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{post.content}</p>
                    
                    {post.engagement && (
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>❤️ {post.engagement.likes}</span>
                        <span>🔄 {post.engagement.shares}</span>
                        <span>💬 {post.engagement.comments}</span>
                      </div>
                    )}
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

