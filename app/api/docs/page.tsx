import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Database, 
  Satellite, 
  Eye, 
  Zap,
  ExternalLink,
  Code,
  Download
} from 'lucide-react'

export default function APIDocsPage() {
  const apiEndpoints = [
    {
      title: 'NASA Near Earth Objects',
      endpoint: '/api/asteroids',
      description: 'Fetch real-time asteroid data from NASA NEO API and JPL SBDB',
      method: 'GET',
      example: '/api/asteroids?trajectory=true',
      sources: ['NASA NEO API', 'JPL Small Body Database'],
      icon: <Globe className="h-5 w-5" />
    },
    {
      title: 'NEOSSat Observations',
      endpoint: '/api/neossat',
      description: 'Canadian Space Agency satellite data for asteroid tracking',
      method: 'GET',
      example: '/api/neossat?type=asteroid&limit=20',
      sources: ['NEOSSat', 'CADC Archive'],
      icon: <Satellite className="h-5 w-5" />
    },
    {
      title: 'NASA Eyes on Asteroids',
      endpoint: '/api/nasa-eyes',
      description: 'Real-time visualization data from NASA Eyes platform',
      method: 'GET',
      example: '/api/nasa-eyes?hazard_only=true&limit=10',
      sources: ['NASA Eyes', 'JPL SBDB'],
      icon: <Eye className="h-5 w-5" />
    },
    {
      title: 'AI Predictions',
      endpoint: '/api/ai/predictions',
      description: 'AI-powered impact predictions and evacuation routes',
      method: 'POST',
      example: '/api/ai/predictions',
      sources: ['FastAPI AI Service'],
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: 'Emergency Resources',
      endpoint: '/api/resources',
      description: 'Shelters, hospitals, and evacuation centers',
      method: 'GET',
      example: '/api/resources?type=shelter&lat=40.7128&lng=-74.0060',
      sources: ['MongoDB'],
      icon: <Database className="h-5 w-5" />
    }
  ]

  const dataSources = [
    {
      name: 'NASA Near Earth Object API',
      url: 'https://api.nasa.gov/neo/rest/v1',
      description: 'Real-time asteroid and comet data',
      rate_limit: '1000 requests/hour (free)',
      status: 'Active'
    },
    {
      name: 'JPL Small Body Database',
      url: 'https://ssd.jpl.nasa.gov/api/sbdb.api',
      description: 'Detailed orbital elements and physical properties',
      rate_limit: 'No official limit',
      status: 'Active'
    },
    {
      name: 'NEOSSat (Canadian Space Agency)',
      url: 'https://donnees-data.asc-csa.gc.ca/en/dataset/9ae3e718-8b6d-40b7-8aa4-858f00e84b30',
      description: 'Space-based asteroid surveillance',
      rate_limit: 'Open data',
      status: 'Active'
    },
    {
      name: 'NASA Eyes on Asteroids',
      url: 'https://eyes.nasa.gov/apps/asteroids/',
      description: 'Interactive visualization platform',
      rate_limit: 'Public access',
      status: 'Active'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            AEGIS NET API Documentation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real-time asteroid data integration with NASA, Canadian Space Agency, and JPL databases
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-6 w-6 mr-2" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Get started with AEGIS NET APIs in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div># Get asteroid data</div>
              <div>curl http://localhost:3000/api/asteroids</div>
              <div className="mt-2"># Get NEOSSat observations</div>
              <div>curl http://localhost:3000/api/neossat?type=asteroid</div>
              <div className="mt-2"># Get NASA Eyes data</div>
              <div>curl http://localhost:3000/api/nasa-eyes?hazard_only=true</div>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Endpoints</h2>
          <div className="grid gap-6">
            {apiEndpoints.map((endpoint, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {endpoint.icon}
                      <div>
                        <CardTitle className="text-xl">{endpoint.title}</CardTitle>
                        <CardDescription>{endpoint.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={endpoint.method === 'GET' ? 'low' : 'medium'}>
                      {endpoint.method}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Endpoint</h4>
                      <code className="bg-slate-100 px-3 py-1 rounded text-sm">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Example Request</h4>
                      <code className="bg-slate-100 px-3 py-1 rounded text-sm">
                        GET {endpoint.example}
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Data Sources</h4>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.sources.map((source, i) => (
                          <Badge key={i} variant="outline">{source}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Sources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataSources.map((source, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <Badge variant="low">{source.status}</Badge>
                  </div>
                  <CardDescription>{source.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-700">URL</h4>
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {source.url}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Rate Limit</h4>
                      <p className="text-sm text-slate-600">{source.rate_limit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* API Key Setup */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>NASA API Key Setup</CardTitle>
            <CardDescription>
              Get free access to NASA's asteroid data APIs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Get API Key</h4>
                  <p className="text-sm text-slate-600">Visit <a href="https://api.nasa.gov/" className="text-blue-600 hover:underline">api.nasa.gov</a> and request your free API key</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Configure Environment</h4>
                  <p className="text-sm text-slate-600">Add your API key to the <code>.env</code> file:</p>
                  <code className="bg-slate-100 px-2 py-1 rounded text-sm mt-1 block">
                    NASA_API_KEY=your_api_key_here
                  </code>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Test API</h4>
                  <p className="text-sm text-slate-600">Verify your setup with a test request:</p>
                  <code className="bg-slate-100 px-2 py-1 rounded text-sm mt-1 block">
                    curl "http://localhost:3000/api/asteroids"
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Response Examples</CardTitle>
            <CardDescription>
              Sample API responses for integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Asteroid Data Response</h4>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "2024-AB1",
    "name": "Asteroid 2024-AB1",
    "diameter": 150,
    "velocity": 15.2,
    "impactProbability": 0.15,
    "impactTime": "2024-12-15T14:30:00Z",
    "blastRadius": 25,
    "tsunamiRisk": true,
    "debrisDispersion": 50
  },
  "source": "nasa"
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">NEOSSat Response</h4>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "success": true,
  "data": {
    "observations": [
      {
        "id": "neossat_asteroid_1",
        "object_name": "2024-AB1",
        "object_type": "asteroid",
        "coordinates": { "ra": 180.5, "dec": 45.2 },
        "magnitude": 18.5,
        "observation_quality": "high"
      }
    ],
    "total_count": 1,
    "mission_status": "Active - 24/7 asteroid surveillance"
  }
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500">
          <p>AEGIS NET - NASA Space Apps Challenge 2025</p>
          <p className="text-sm mt-2">
            Built with Next.js 14, NASA APIs, and Canadian Space Agency data
          </p>
        </div>
      </div>
    </div>
  )
}
