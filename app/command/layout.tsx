'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Shield, Map, Users, Settings, Database, Home, Target, Zap, Clock, Radio, BarChart3, Brain, Menu, X, MoreHorizontal, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CommandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: '/command', icon: Map, label: 'Dashboard', shortLabel: 'Dashboard' },
    { href: '/command/simulator', icon: Target, label: 'Impact Simulator', shortLabel: 'Simulator' },
    { href: '/command/mitigation', icon: Zap, label: 'Mitigation Testing', shortLabel: 'Mitigation' },
    { href: '/command/time-travel', icon: Clock, label: 'Time Travel', shortLabel: 'Time Travel' },
    { href: '/command/communication', icon: Radio, label: 'Communication', shortLabel: 'Comm' },
    { href: '/command/resources', icon: Users, label: 'Resources', shortLabel: 'Resources' },
    { href: '/command/analytics', icon: BarChart3, label: 'Analytics', shortLabel: 'Analytics' },
    { href: '/command/ai-models', icon: Brain, label: 'AI Models', shortLabel: 'AI' },
    { href: '/command/api-data', icon: Database, label: 'API Data', shortLabel: 'API' }
  ]

  // Helper function to check if navigation item is active
  const isActive = (href: string) => {
    if (href === '/command') {
      return pathname === '/command'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-nasa-blue border-b border-slate-700 relative z-50">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-nasa-orange" />
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-white">AEGIS COMMAND</h1>
                <p className="text-xs lg:text-sm text-gray-300 hidden sm:block">Emergency Management Dashboard</p>
              </div>
            </div>
            
            {/* Desktop Header Actions */}
            <div className="hidden lg:flex items-center space-x-4">
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
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

            {/* Mobile Header Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <div className="text-right">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emergency-high rounded-full mr-1"></div>
                  <span className="text-emergency-high font-semibold text-sm">ACTIVE</span>
                </div>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm" className="px-2">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="px-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-slate-800 border-b border-slate-700 relative z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 xl:space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center py-4 transition-colors whitespace-nowrap relative ${
                    active 
                      ? 'text-nasa-orange border-b-2 border-nasa-orange' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-2 flex-shrink-0 ${active ? 'text-nasa-orange' : ''}`} />
                  <span className="text-sm lg:text-base">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden bg-slate-800 border-b border-slate-700 relative z-40 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 py-4 relative z-40">
          <div className="grid grid-cols-2 gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    active 
                      ? 'text-nasa-orange bg-slate-700 border border-nasa-orange/50' 
                      : 'text-gray-300 hover:text-white hover:bg-slate-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className={`h-5 w-5 mr-2 flex-shrink-0 ${active ? 'text-nasa-orange' : ''}`} />
                  <span className="text-sm">{item.shortLabel}</span>
                </Link>
              )
            })}
          </div>
          
          {/* Mobile Settings */}
          <div className="mt-4 pt-4 border-t border-slate-600">
            <Button variant="outline" size="sm" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50 shadow-lg">
        {/* Main Navigation Row */}
        <div className="grid grid-cols-5 gap-1 py-2 px-2">
          {/* Show first 4 navigation items */}
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 transition-colors relative ${
                  active 
                    ? 'text-nasa-orange' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 mb-1 ${active ? 'text-nasa-orange' : ''}`} />
                <span className="text-xs text-center leading-tight">{item.shortLabel}</span>
                {active && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nasa-orange rounded-full"></div>
                )}
              </Link>
            )
          })}
          
          {/* More Button */}
          <button
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`flex flex-col items-center py-2 px-1 transition-colors relative ${
              isMoreMenuOpen 
                ? 'text-nasa-orange' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MoreHorizontal className={`h-4 w-4 mb-1 ${isMoreMenuOpen ? 'text-nasa-orange' : ''}`} />
            <span className="text-xs text-center leading-tight">More</span>
            {isMoreMenuOpen && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nasa-orange rounded-full"></div>
            )}
          </button>
        </div>

        {/* Expanded More Menu */}
        {isMoreMenuOpen && (
          <div className="border-t border-slate-600 bg-slate-700 px-2 py-2">
            <div className="grid grid-cols-4 gap-1">
              {navigationItems.slice(4).map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center py-2 px-1 transition-colors relative rounded ${
                      active 
                        ? 'text-nasa-orange bg-slate-600' 
                        : 'text-gray-300 hover:text-white hover:bg-slate-600'
                    }`}
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    <Icon className={`h-4 w-4 mb-1 ${active ? 'text-nasa-orange' : ''}`} />
                    <span className="text-xs text-center leading-tight">{item.shortLabel}</span>
                    {active && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nasa-orange rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-4 lg:py-6 lg:pb-6 ${
        isMoreMenuOpen ? 'pb-32' : 'pb-20'
      }`}>
        {children}
      </main>
    </div>
  )
}
