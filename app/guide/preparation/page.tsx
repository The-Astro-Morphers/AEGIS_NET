'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Users, 
  Home,
  Car,
  Phone,
  MapPin,
  Heart,
  Globe,
  CheckCircle,
  XCircle,
  Info,
  Download
} from 'lucide-react'

export default function PreparationTipsPage() {
  const emergencyKits = [
    {
      category: 'Essential Items',
      items: [
        { name: 'Water (1 gallon per person per day)', duration: '3 days minimum', required: true },
        { name: 'Non-perishable food', duration: '3 days minimum', required: true },
        { name: 'Flashlight and extra batteries', duration: 'Long-term', required: true },
        { name: 'First aid kit', duration: 'Check monthly', required: true },
        { name: 'Emergency radio (battery or hand-crank)', duration: 'Long-term', required: true },
        { name: 'Multi-tool or Swiss Army knife', duration: 'Long-term', required: true },
        { name: 'Personal hygiene items', duration: '3 days minimum', required: true },
        { name: 'Cash in small bills', duration: 'Long-term', required: true },
        { name: 'Important documents (copies)', duration: 'Long-term', required: true },
        { name: 'Emergency contact list', duration: 'Update quarterly', required: true }
      ]
    },
    {
      category: 'Family & Pets',
      items: [
        { name: 'Baby formula and diapers', duration: '3 days minimum', required: false },
        { name: 'Pet food and water', duration: '3 days minimum', required: false },
        { name: 'Medications (7-day supply)', duration: 'Monthly check', required: false },
        { name: 'Extra clothing and blankets', duration: '3 days minimum', required: false },
        { name: 'Comfort items for children', duration: 'Long-term', required: false },
        { name: 'Portable phone charger', duration: 'Long-term', required: false }
      ]
    },
    {
      category: 'Home Safety',
      items: [
        { name: 'Fire extinguisher', duration: 'Annual check', required: true },
        { name: 'Smoke detectors (working batteries)', duration: 'Monthly test', required: true },
        { name: 'Carbon monoxide detector', duration: 'Monthly test', required: true },
        { name: 'Emergency escape plan', duration: 'Practice quarterly', required: true },
        { name: 'Gas shut-off valve location', duration: 'Long-term', required: true },
        { name: 'Water shut-off valve location', duration: 'Long-term', required: true },
        { name: 'Emergency ladder (2nd floor)', duration: 'Long-term', required: false },
        { name: 'Generator (if applicable)', duration: 'Monthly test', required: false }
      ]
    }
  ]

  const preparationSteps = [
    {
      phase: 'Immediate (0-24 hours)',
      icon: AlertTriangle,
      color: 'red',
      steps: [
        'Check local emergency alerts and warnings',
        'Secure outdoor furniture and loose items',
        'Charge all electronic devices',
        'Fill vehicle gas tanks',
        'Withdraw some cash from ATM',
        'Review evacuation routes',
        'Check emergency supplies'
      ]
    },
    {
      phase: 'Short-term (1-7 days)',
      icon: Clock,
      color: 'yellow',
      steps: [
        'Stock up on non-perishable food and water',
        'Refill prescription medications',
        'Update emergency contact information',
        'Practice evacuation routes',
        'Secure important documents',
        'Inform family of your plans',
        'Check insurance coverage'
      ]
    },
    {
      phase: 'Long-term (1+ months)',
      icon: Shield,
      color: 'green',
      steps: [
        'Build comprehensive emergency kit',
        'Create family emergency plan',
        'Install safety devices (smoke detectors, etc.)',
        'Learn basic first aid and CPR',
        'Establish meeting points with family',
        'Review and update plans quarterly',
        'Join local emergency preparedness groups'
      ]
    }
  ]

  const emergencyPlans = [
    {
      scenario: 'Home Fire',
      icon: Home,
      steps: [
        'Get out immediately and call 911',
        'Meet at designated meeting spot',
        'Account for all family members',
        'Never re-enter burning building',
        'Wait for firefighters to arrive'
      ]
    },
    {
      scenario: 'Natural Disaster',
      icon: Globe,
      steps: [
        'Follow evacuation orders immediately',
        'Take emergency kit and important documents',
        'Use designated evacuation routes',
        'Stay informed via emergency radio',
        'Check in with family members'
      ]
    },
    {
      scenario: 'Medical Emergency',
      icon: Heart,
      steps: [
        'Call 911 immediately',
        'Provide clear location and situation',
        'Follow dispatcher instructions',
        'Administer first aid if trained',
        'Stay with person until help arrives'
      ]
    },
    {
      scenario: 'Power Outage',
      icon: Globe,
      steps: [
        'Use flashlights instead of candles',
        'Keep refrigerator/freezer closed',
        'Unplug sensitive electronics',
        'Use emergency radio for updates',
        'Check on elderly neighbors'
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-600 bg-red-50 border-red-200'
      case 'yellow': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'green': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Emergency Preparation Tips</AlertTitle>
        <AlertDescription>
          Be prepared for any emergency situation. Follow these guidelines to keep you and your family safe.
        </AlertDescription>
      </Alert>

      {/* Quick Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Emergency Preparedness Checklist
          </CardTitle>
          <CardDescription>
            Essential items and actions to prepare for emergencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyKits.map((kit) => (
              <div key={kit.category} className="space-y-4">
                <h3 className="font-semibold text-lg">{kit.category}</h3>
                <div className="space-y-2">
                  {kit.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          {item.required ? (
                            <CheckCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0" />
                          ) : (
                            <Info className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                          )}
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 ml-6">{item.duration}</div>
                      </div>
                      {item.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preparation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Emergency Preparation Timeline
          </CardTitle>
          <CardDescription>
            Step-by-step preparation guide for different timeframes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {preparationSteps.map((phase, index) => {
              const Icon = phase.icon
              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${getColorClasses(phase.color)}`}
                >
                  <div className="flex items-center mb-4">
                    <Icon className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">{phase.phase}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Action Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Emergency Action Plans
          </CardTitle>
          <CardDescription>
            Specific procedures for different emergency scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyPlans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <Icon className="h-6 w-6 mr-3 text-blue-600" />
                    <h3 className="text-lg font-semibold">{plan.scenario}</h3>
                  </div>
                  <div className="space-y-3">
                    {plan.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Family Communication Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Family Communication Plan
          </CardTitle>
          <CardDescription>
            Ensure your family can stay connected during emergencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">Emergency Contacts:</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium">Out-of-town contact</div>
                  <div className="text-sm text-gray-600">Someone family can call to check in</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium">Local emergency contacts</div>
                  <div className="text-sm text-gray-600">911, police, fire, medical</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium">School/work contacts</div>
                  <div className="text-sm text-gray-600">Emergency procedures and contacts</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">Meeting Places:</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium">Near home</div>
                  <div className="text-sm text-gray-600">Mailbox, neighbor's house, or nearby landmark</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium">Outside neighborhood</div>
                  <div className="text-sm text-gray-600">Library, school, or community center</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium">Out of town</div>
                  <div className="text-sm text-gray-600">Relative's or friend's house in another city</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Important Documents Checklist
          </CardTitle>
          <CardDescription>
            Keep copies of essential documents in a safe, accessible place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Personal Documents</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Driver's license/ID
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Passport
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Birth certificates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Social Security cards
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Financial Documents</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Insurance policies
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Bank account information
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Credit card information
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Investment records
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Medical & Legal</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Medical records
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Prescription information
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Will and legal documents
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Pet vaccination records
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="flex-1">
          <Download className="h-5 w-5 mr-2" />
          Download Emergency Kit Checklist
        </Button>
        <Button variant="outline" size="lg" className="flex-1">
          <Users className="h-5 w-5 mr-2" />
          Create Family Emergency Plan
        </Button>
      </div>
    </div>
  )
}
