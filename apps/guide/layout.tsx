import { Users, Globe, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emergency-low/5 via-background to-emergency-medium/5">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-emergency-low" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AEGIS GUIDE</h1>
                <p className="text-sm text-gray-600">Public Safety & Emergency Guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <Link href="/guide" className="flex items-center py-4 text-gray-900 hover:text-emergency-low transition-colors">
              <Users className="h-5 w-5 mr-2" />
              Safety Guide
            </Link>
            <Link href="/guide/risk-assessment" className="flex items-center py-4 text-gray-600 hover:text-gray-900 transition-colors">
              <Shield className="h-5 w-5 mr-2" />
              Risk Assessment
            </Link>
            <Link href="/guide/evacuation" className="flex items-center py-4 text-gray-600 hover:text-gray-900 transition-colors">
              <Globe className="h-5 w-5 mr-2" />
              Evacuation Routes
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
