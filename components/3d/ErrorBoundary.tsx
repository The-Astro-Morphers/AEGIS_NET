'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('3D Component Error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">3D Visualization Error</h3>
            <p className="text-gray-300 mb-4">
              The 3D simulation encountered an error. This is likely due to browser compatibility issues.
            </p>
            <div className="text-sm text-gray-400 mb-4">
              Error: {this.state.error?.message || 'Unknown error'}
            </div>
            <Button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
