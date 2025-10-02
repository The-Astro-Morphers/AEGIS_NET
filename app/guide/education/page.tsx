'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  BookOpen, 
  Clock, 
  Target, 
  Users, 
  Award, 
  Play,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
  Share2,
  Star,
  Trophy
} from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface HistoricalEvent {
  id: string
  name: string
  year: number
  diameter: number
  energy: number
  casualties: number
  description: string
  impact: string
  lessons: string[]
}

interface LearningModule {
  id: string
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  completed: boolean
  progress: number
}

export default function EducationPage() {
  const [currentModule, setCurrentModule] = useState<string | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const learningModules: LearningModule[] = [
    {
      id: 'asteroid-basics',
      title: 'Asteroid Basics',
      description: 'Learn about asteroids, their composition, and orbital characteristics',
      duration: 15,
      difficulty: 'beginner',
      completed: false,
      progress: 0
    },
    {
      id: 'impact-physics',
      title: 'Impact Physics',
      description: 'Understand the physics of asteroid impacts and energy calculations',
      duration: 25,
      difficulty: 'intermediate',
      completed: false,
      progress: 0
    },
    {
      id: 'defense-strategies',
      title: 'Defense Strategies',
      description: 'Explore various methods to deflect or destroy threatening asteroids',
      duration: 30,
      difficulty: 'advanced',
      completed: false,
      progress: 0
    },
    {
      id: 'emergency-preparedness',
      title: 'Emergency Preparedness',
      description: 'Learn how to prepare for and respond to asteroid impact threats',
      duration: 20,
      difficulty: 'beginner',
      completed: false,
      progress: 0
    }
  ]

  const historicalEvents: HistoricalEvent[] = [
    {
      id: 'tunguska',
      name: 'Tunguska Event',
      year: 1908,
      diameter: 50,
      energy: 12,
      casualties: 0,
      description: 'Airburst over Siberia that flattened 2000 km² of forest',
      impact: 'The largest impact event in recorded history, demonstrating the destructive power of airbursts',
      lessons: [
        'Airbursts can cause massive damage without leaving a crater',
        'Remote areas can be affected by distant impacts',
        'Early warning systems are crucial for populated areas'
      ]
    },
    {
      id: 'chicxulub',
      name: 'Chicxulub Impact',
      year: 66000000,
      diameter: 10000,
      energy: 100000000,
      casualties: 75000000,
      description: 'Cretaceous-Paleogene extinction event that wiped out the dinosaurs',
      impact: 'The most catastrophic impact in Earth\'s history, causing mass extinction',
      lessons: [
        'Large impacts can cause global climate change',
        'Mass extinctions can result from single impact events',
        'Planetary defense is essential for species survival'
      ]
    },
    {
      id: 'chelyabinsk',
      name: 'Chelyabinsk Meteor',
      year: 2013,
      diameter: 20,
      energy: 0.5,
      casualties: 1500,
      description: 'Airburst over Russia that injured 1500 people and caused widespread damage',
      impact: 'The most recent significant impact event, highlighting the need for early warning',
      lessons: [
        'Small asteroids can still cause significant damage',
        'Early warning systems can save lives',
        'Public education about impact threats is important'
      ]
    }
  ]

  const quizData: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'What is the approximate diameter of the asteroid that caused the Tunguska event?',
      options: ['20 meters', '50 meters', '100 meters', '500 meters'],
      correctAnswer: 1,
      explanation: 'The Tunguska event was caused by an asteroid approximately 50 meters in diameter that exploded in the atmosphere.',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      question: 'Which defense strategy uses gravitational force to deflect an asteroid?',
      options: ['Kinetic Impactor', 'Gravity Tractor', 'Nuclear Deflection', 'Laser Ablation'],
      correctAnswer: 1,
      explanation: 'A gravity tractor uses the gravitational force between a spacecraft and an asteroid to gradually deflect its trajectory.',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: 'What is the minimum deflection angle needed to avoid Earth impact?',
      options: ['1 degree', '5 degrees', '10 degrees', '15 degrees'],
      correctAnswer: 0,
      explanation: 'Even a small deflection of 1 degree can be enough to avoid Earth impact if applied early enough.',
      difficulty: 'hard'
    }
  ]

  const startModule = (moduleId: string) => {
    setCurrentModule(moduleId)
    setQuizQuestions(quizData)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setQuizScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
  }

  const answerQuestion = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setQuizScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setQuizScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600'
      case 'medium': return 'bg-yellow-600'
      case 'hard': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return 'text-green-400'
    if (percentage >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Educational Mode</h1>
        <p className="text-lg text-gray-600">Interactive learning and disaster preparedness training</p>
      </div>

      {/* Learning Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            Learning Modules
          </CardTitle>
          <CardDescription>
            Choose a module to start your educational journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningModules.map((module) => (
              <div
                key={module.id}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => startModule(module.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  <Badge className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration} min
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {module.difficulty}
                  </div>
                </div>
                
                {module.progress > 0 && (
                  <div className="mt-2">
                    <Progress value={module.progress} className="w-full" />
                    <p className="text-xs text-gray-500 mt-1">
                      {module.progress}% complete
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Interface */}
      {currentModule && quizQuestions.length > 0 && !quizCompleted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Quiz: {learningModules.find(m => m.id === currentModule)?.title}
            </CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg font-medium text-gray-900">
                {quizQuestions[currentQuestion].question}
              </div>
              
              <div className="space-y-2">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-3 text-left border rounded-lg transition-colors ${
                      selectedAnswer === index
                        ? index === quizQuestions[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : 'border-red-500 bg-red-50 text-red-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                      {selectedAnswer === index && (
                        <div className="ml-auto">
                          {index === quizQuestions[currentQuestion].correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {showExplanation && (
                <Alert>
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>
                    {quizQuestions[currentQuestion].explanation}
                  </AlertDescription>
                </Alert>
              )}
              
              {selectedAnswer !== null && (
                <div className="flex justify-between">
                  <Button onClick={resetQuiz} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart Quiz
                  </Button>
                  <Button onClick={nextQuestion}>
                    {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quiz Results */}
      {quizCompleted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-6 w-6 mr-2" />
              Quiz Complete!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-gray-900">
                Score: {quizScore}/{quizQuestions.length}
              </div>
              
              <div className={`text-2xl font-semibold ${getScoreColor(quizScore, quizQuestions.length)}`}>
                {quizScore === quizQuestions.length ? 'Perfect!' : 
                 quizScore >= quizQuestions.length * 0.8 ? 'Excellent!' :
                 quizScore >= quizQuestions.length * 0.6 ? 'Good Job!' : 'Keep Learning!'}
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button onClick={resetQuiz} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button onClick={() => setCurrentModule(null)}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Back to Modules
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historical Impact Explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-6 w-6 mr-2" />
            Historical Impact Explorer
          </CardTitle>
          <CardDescription>
            Explore past asteroid impact events and their lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {historicalEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                  <Badge variant="outline">{event.year.toLocaleString()}</Badge>
                </div>
                
                <p className="text-gray-600 mb-3">{event.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Diameter:</span>
                    <div className="font-semibold">{event.diameter}m</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Energy:</span>
                    <div className="font-semibold">{event.energy} MT</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Casualties:</span>
                    <div className="font-semibold">{event.casualties.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Impact:</span>
                    <div className="font-semibold">{event.impact}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Lessons:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {event.lessons.map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Citizen Scientist Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Citizen Scientist Tools
          </CardTitle>
          <CardDescription>
            Contribute to asteroid research and monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Data Tagging</h4>
              <p className="text-sm text-gray-600">
                Help classify asteroid images and orbital data to improve detection algorithms.
              </p>
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Start Tagging
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Impact Calculator</h4>
              <p className="text-sm text-gray-600">
                Use our interactive calculator to estimate impact effects for different scenarios.
              </p>
              <Button className="w-full" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Open Calculator
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

