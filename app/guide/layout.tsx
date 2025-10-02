'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Users, Globe, Shield, Home, BookOpen, AlertTriangle, Phone, MapPin, MoreHorizontal, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: '/guide', icon: Users, label: 'Safety Guide', shortLabel: 'Guide' },
    { href: '/guide/risk-assessment', icon: Shield, label: 'Risk Assessment', shortLabel: 'Risk' },
    { href: '/guide/evacuation', icon: Globe, label: 'Evacuation Routes', shortLabel: 'Evacuation' },
    { href: '/guide/education', icon: BookOpen, label: 'Education', shortLabel: 'Education' },
    { href: '/guide/emergency-contacts', icon: Phone, label: 'Emergency Contacts', shortLabel: 'Contacts' },
    { href: '/guide/shelters', icon: MapPin, label: 'Emergency Shelters', shortLabel: 'Shelters' },
    { href: '/guide/preparation', icon: AlertTriangle, label: 'Preparation Tips', shortLabel: 'Prepare' }
  ]

  // Helper function to check if navigation item is active
  const isActive = (href: string) => {
    if (href === '/guide') {
      return pathname === '/guide'
    }
    return pathname.startsWith(href)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-emergency-low/5 via-background to-emergency-medium/5">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-emergency-low" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AEGIS GUIDE</h1>
                <p className="text-xs sm:text-sm text-gray-600">Public Safety & Emergency Guidance</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gray-50 border-b border-gray-200 relative z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center py-4 transition-colors ${
                    active 
                      ? 'text-emergency-low border-b-2 border-emergency-low' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-gray-50 border-b border-gray-200 relative z-40 transition-all duration-300 ease-in-out ${
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
                      ? 'text-emergency-low bg-white border border-emergency-low/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className={`h-5 w-5 mr-2 flex-shrink-0 ${active ? 'text-emergency-low' : ''}`} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
          
          {/* Mobile Language Selector */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <Button variant="outline" size="sm" className="w-full">
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
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
                    ? 'text-emergency-low' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`h-4 w-4 mb-1 ${active ? 'text-emergency-low' : ''}`} />
                <span className="text-xs text-center leading-tight">{item.shortLabel}</span>
                {active && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emergency-low rounded-full"></div>
                )}
              </Link>
            )
          })}
          
          {/* More Button */}
          <button
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`flex flex-col items-center py-2 px-1 transition-colors relative ${
              isMoreMenuOpen 
                ? 'text-emergency-low' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MoreHorizontal className={`h-4 w-4 mb-1 ${isMoreMenuOpen ? 'text-emergency-low' : ''}`} />
            <span className="text-xs text-center leading-tight">More</span>
            {isMoreMenuOpen && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emergency-low rounded-full"></div>
            )}
          </button>
        </div>

        {/* Expanded More Menu */}
        {isMoreMenuOpen && (
          <div className="border-t border-gray-300 bg-gray-50 px-2 py-2">
            <div className="grid grid-cols-3 gap-1">
              {navigationItems.slice(4).map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center py-2 px-1 transition-colors relative rounded ${
                      active 
                        ? 'text-emergency-low bg-white border border-emergency-low/50' 
                        : 'text-gray-600 hover:text-gray-700 hover:bg-white'
                    }`}
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    <Icon className={`h-4 w-4 mb-1 ${active ? 'text-emergency-low' : ''}`} />
                    <span className="text-xs text-center leading-tight">{item.shortLabel}</span>
                    {active && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emergency-low rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-6 md:pb-6 ${
        isMoreMenuOpen ? 'pb-32' : 'pb-20'
      }`}>
        {children}
      </main>
    </div>
  )
}
