'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Phone, 
  MapPin, 
  Clock, 
  Globe, 
  Shield, 
  Users,
  AlertTriangle,
  Heart,
  Building,
  Car
} from 'lucide-react'

export default function EmergencyContactsPage() {
  const emergencyContacts = [
    {
      id: 'police',
      name: 'Emergency Services',
      number: '911',
      description: 'Police, Fire, Medical Emergency',
      icon: Shield,
      priority: 'high',
      available: '24/7'
    },
    {
      id: 'police-non-emergency',
      name: 'Police Non-Emergency',
      number: '(555) 123-4567',
      description: 'Non-urgent police matters',
      icon: Shield,
      priority: 'medium',
      available: '24/7'
    },
    {
      id: 'fire',
      name: 'Fire Department',
      number: '(555) 987-6543',
      description: 'Fire emergencies and rescue',
      icon: Shield,
      priority: 'high',
      available: '24/7'
    },
    {
      id: 'medical',
      name: 'Medical Emergency',
      number: '(555) 456-7890',
      description: 'Ambulance and medical response',
      icon: Heart,
      priority: 'high',
      available: '24/7'
    },
    {
      id: 'hospital',
      name: 'Local Hospital',
      number: '(555) 321-0987',
      description: 'General hospital information',
      icon: Building,
      priority: 'medium',
      available: '24/7'
    },
    {
      id: 'red-cross',
      name: 'Red Cross',
      number: '1-800-RED-CROSS',
      description: 'Disaster relief and assistance',
      icon: Users,
      priority: 'medium',
      available: '24/7'
    }
  ]

  const governmentContacts = [
    {
      id: 'mayor',
      name: 'Mayor\'s Office',
      number: '(555) 234-5678',
      description: 'City government and policies',
      icon: Building,
      available: 'Mon-Fri 9AM-5PM'
    },
    {
      id: 'emergency-management',
      name: 'Emergency Management',
      number: '(555) 345-6789',
      description: 'Disaster preparedness and response',
      icon: AlertTriangle,
      available: '24/7'
    },
    {
      id: 'public-works',
      name: 'Public Works',
      number: '(555) 456-7891',
      description: 'Infrastructure and utilities',
      icon: Building,
      available: 'Mon-Fri 8AM-4PM'
    }
  ]

  const utilityContacts = [
    {
      id: 'power',
      name: 'Electric Company',
      number: '1-800-POWER-ON',
      description: 'Power outages and electrical emergencies',
      icon: Globe,
      available: '24/7'
    },
    {
      id: 'gas',
      name: 'Gas Company',
      number: '1-800-GAS-LEAK',
      description: 'Gas leaks and service issues',
      icon: Globe,
      available: '24/7'
    },
    {
      id: 'water',
      name: 'Water Department',
      number: '(555) 567-8901',
      description: 'Water service and emergencies',
      icon: Globe,
      available: '24/7'
    }
  ]

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      default: return 'secondary'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'HIGH PRIORITY'
      case 'medium': return 'MEDIUM PRIORITY'
      default: return 'STANDARD'
    }
  }

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Emergency Contacts</AlertTitle>
        <AlertDescription>
          In case of life-threatening emergency, call 911 immediately. Save these numbers in your phone for quick access.
        </AlertDescription>
      </Alert>

      {/* Quick Call Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Quick Emergency Call
          </CardTitle>
          <CardDescription>
            One-tap emergency calling for immediate assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button size="lg" variant="destructive" className="h-16 text-lg font-bold">
              <Phone className="h-6 w-6 mr-3" />
              Call 911
              <span className="ml-2 text-sm opacity-75">Emergency</span>
            </Button>
            <Button size="lg" variant="outline" className="h-16 text-lg">
              <Shield className="h-6 w-6 mr-3" />
              Non-Emergency
              <span className="ml-2 text-sm opacity-75">(555) 123-4567</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Emergency Services
          </CardTitle>
          <CardDescription>
            Critical emergency response contacts available 24/7
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon
              return (
                <div
                  key={contact.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-2 text-red-600" />
                      <h3 className="font-semibold">{contact.name}</h3>
                    </div>
                    <Badge variant={getPriorityVariant(contact.priority)}>
                      {getPriorityText(contact.priority)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-mono text-lg font-bold">{contact.number}</span>
                    </div>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">{contact.available}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Government Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Government & City Services
          </CardTitle>
          <CardDescription>
            Local government and municipal service contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {governmentContacts.map((contact) => {
              const Icon = contact.icon
              return (
                <div
                  key={contact.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <Icon className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="font-semibold">{contact.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-mono">{contact.number}</span>
                    </div>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">{contact.available}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Utility Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Utilities & Services
          </CardTitle>
          <CardDescription>
            Essential utility and service provider contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {utilityContacts.map((contact) => {
              const Icon = contact.icon
              return (
                <div
                  key={contact.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <Icon className="h-5 w-5 mr-2 text-green-600" />
                    <h3 className="font-semibold">{contact.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-mono">{contact.number}</span>
                    </div>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">{contact.available}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Important Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Important Emergency Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-red-600">When to Call 911:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Life-threatening medical emergencies
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Active fires or explosions
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Crimes in progress or immediate danger
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Serious traffic accidents with injuries
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">Emergency Preparedness:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Save emergency contacts in your phone
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Keep a printed list of important numbers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Program ICE (In Case of Emergency) contacts
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Know your address and location landmarks
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
