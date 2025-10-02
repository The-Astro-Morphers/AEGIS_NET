import { Shield, Map, Users, Settings, Database } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CommandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-nasa-blue border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-nasa-orange" />
              <div>
                <h1 className="text-2xl font-bold text-white">AEGIS COMMAND</h1>
                <p className="text-sm text-gray-300">Emergency Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-300">Status</p>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emergency-high rounded-full mr-2"></div>
                  <span className="text-emergency-high font-semibold">ACTIVE</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <Link href="/command" className="flex items-center py-4 text-white hover:text-nasa-orange transition-colors">
              <Map className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link href="/command/resources" className="flex items-center py-4 text-gray-300 hover:text-white transition-colors">
              <Users className="h-5 w-5 mr-2" />
              Resources
            </Link>
            <Link href="/command/analytics" className="flex items-center py-4 text-gray-300 hover:text-white transition-colors">
              <Settings className="h-5 w-5 mr-2" />
              Analytics
            </Link>
            <Link href="/command/api-data" className="flex items-center py-4 text-gray-300 hover:text-white transition-colors">
              <Database className="h-5 w-5 mr-2" />
              API Data
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
