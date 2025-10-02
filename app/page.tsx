import Link from 'next/link'
import { Shield, Users, Map, AlertTriangle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nasa-blue via-slate-900 to-nasa-blue">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-nasa-orange mr-4" />
            <h1 className="text-6xl font-bold text-white">AEGIS NET</h1>
          </div>
          <p className="text-xl text-gray-300 mb-4">
            Asteroid Impact Response System
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            NASA Space Apps 2025 - Dual-interface emergency response platform for asteroid impact scenarios
          </p>
        </div>

        {/* Main Interface Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* AEGIS COMMAND */}
          <Link href="/command" className="group">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Map className="h-12 w-12 text-nasa-orange mr-4" />
                <h2 className="text-3xl font-bold text-white">AEGIS COMMAND</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Emergency Manager Dashboard
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-nasa-orange rounded-full mr-3"></div>
                  Real-time digital twin dashboard
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-nasa-orange rounded-full mr-3"></div>
                  AI-powered decision support
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-nasa-orange rounded-full mr-3"></div>
                  Resource allocation system
                </li>
              </ul>
              <div className="mt-6 text-nasa-orange font-semibold group-hover:text-orange-400">
                Access Command Center →
              </div>
            </div>
          </Link>

          {/* AEGIS GUIDE */}
          <Link href="/guide" className="group">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Users className="h-12 w-12 text-green-400 mr-4" />
                <h2 className="text-3xl font-bold text-white">AEGIS GUIDE</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Public Safety Interface
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Personalized safety instructions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Risk assessment & alerts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Multi-language support
                </li>
              </ul>
              <div className="mt-6 text-green-400 font-semibold group-hover:text-green-300">
                Get Safety Guidance →
              </div>
            </div>
          </Link>
        </div>

        {/* Features Overview */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            System Capabilities
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <AlertTriangle className="h-8 w-8 text-yellow-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Impact Prediction</h4>
              <p className="text-gray-400 text-sm">
                AI-powered models predict blast radius, tsunami risk, and debris dispersion patterns
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <Map className="h-8 w-8 text-blue-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Real-time Mapping</h4>
              <p className="text-gray-400 text-sm">
                Live data visualization with NASA JPL/CNEOS asteroid trajectory data
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <Users className="h-8 w-8 text-green-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Evacuation Routes</h4>
              <p className="text-gray-400 text-sm">
                Optimized evacuation paths based on real-time traffic and population data
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>NASA Space Apps Challenge 2025</p>
          <p className="text-sm mt-2">
            Built with Next.js 14, TailwindCSS, Leaflet.js, and FastAPI
          </p>
        </div>
      </div>
    </div>
  )
}
