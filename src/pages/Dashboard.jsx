import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import { ScanEye, BookOpen, BarChart3, Activity, Brain, Clock, Shield, ChevronRight, ActivitySquare, AlertCircle, FileText } from 'lucide-react'

export default function Dashboard() {
  const { user, detectionResults } = useAuth()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const quickActions = [
    { to: '/detection', icon: <ScanEye className="w-8 h-8" />, title: 'Start Eye Detection', desc: 'Securely start real-time optical tracking.', color: '#00D4AA' },
    { to: '/instructions', icon: <BookOpen className="w-8 h-8" />, title: 'View Guide', desc: 'Step-by-step setup and troubleshooting.', color: '#f59e0b' },
    { to: '/results', icon: <BarChart3 className="w-8 h-8" />, title: 'Analyze Results', desc: 'Review historical health data metrics.', color: '#7F77DD' },
  ]

  // Dummy recent activities
  const recentActivities = [
    { id: 1, type: 'session', date: '2 mins ago', summary: 'Detection Session completed. High Blink Rate detected.', icon: <ActivitySquare className="w-5 h-5 text-amber-500" /> },
    { id: 2, type: 'ai', date: '5 hrs ago', summary: 'AI Health Assessment generated for Dry Eye symptoms.', icon: <Brain className="w-5 h-5 text-[#7F77DD]" /> },
    { id: 3, type: 'export', date: '2 days ago', summary: 'Monthly Data Export downloaded (PDF).', icon: <FileText className="w-5 h-5 text-[#00D4AA]" /> },
  ]

  return (
    <div className="w-full flex flex-col flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Welcome Header */}
        <div className="mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-white">
            {greeting}, <span className="text-gradient-teal">{user?.username || 'Guest'}</span>
          </h1>
          <p className="text-[#9CA3AF] text-base sm:text-lg">
            Dashboard overview of your optical health metrics.
          </p>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          {/* Status Card */}
          <div className="glass-card p-4 sm:p-6 flex flex-col justify-between h-[140px] animate-slide-up delay-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs sm:text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">Detection Status</span>
              <ScanEye className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <div className="flex items-center gap-3">
              <div className={`status-dot ${detectionResults ? 'active' : 'inactive'}`} />
              <span className={`text-lg sm:text-xl font-bold ${detectionResults ? 'text-[#10b981]' : 'text-white'}`}>
                {detectionResults ? 'Active' : 'Standby'}
              </span>
            </div>
          </div>

          {/* Blink Rate Card */}
          <div className="glass-card p-4 sm:p-6 flex flex-col justify-between h-[140px] animate-slide-up delay-200">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs sm:text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">Blink Rate</span>
              <Activity className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <div className="flex items-end gap-2 text-white">
              <span className="text-2xl sm:text-3xl font-bold">{detectionResults?.blinkRate || '—'}</span>
              <span className="text-xs sm:text-sm text-[#9CA3AF] mb-1">/ min</span>
            </div>
          </div>

          {/* AI Analysis Card */}
          <div className="glass-card p-4 sm:p-6 flex flex-col justify-between h-[140px] animate-slide-up delay-300 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2 relative z-10">
              <span className="text-xs sm:text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">AI Analysis</span>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Circular Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#2E3E56" strokeWidth="3" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#7F77DD" strokeWidth="3" 
                    strokeDasharray="125" strokeDashoffset={detectionResults ? "25" : "125"} 
                    className="transition-all duration-1000 ease-out" />
                </svg>
                <Brain className={`w-5 h-5 ${detectionResults ? 'text-[#7F77DD]' : 'text-[#9CA3AF]'}`} />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">
                {detectionResults ? 'Complete' : 'Pending'}
              </span>
            </div>
          </div>

          {/* Last Session Card */}
          <div className="glass-card p-4 sm:p-6 flex flex-col justify-between h-[140px] animate-slide-up" style={{animationDelay: '400ms'}}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs sm:text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">Last Session</span>
              <Clock className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {detectionResults ? 'Just now' : 'No records'}
            </div>
          </div>

        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '200ms'}}>
          <h2 className="text-lg sm:text-xl font-bold mb-6 text-white flex items-center gap-2">
            <ActivitySquare className="w-5 h-5 text-[#00D4AA]" /> Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.to} className="group no-underline">
                <div className="glass-card p-4 sm:p-6 h-[200px] flex flex-col justify-between transition-all duration-200">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${action.color}20` }}>
                      <div style={{ color: action.color }} className="w-6 h-6 sm:w-8 sm:h-8">{action.icon}</div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">{action.title}</h3>
                    <p className="text-xs sm:text-sm text-[#9CA3AF] line-clamp-2">{action.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm font-bold" style={{ color: action.color }}>
                    Proceed <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System & Recent Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* System Capabilities (Span 2/3) */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 animate-slide-up" style={{animationDelay: '300ms'}}>
            <h2 className="text-base sm:text-lg font-bold mb-6 text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#7F77DD]" />
              System Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: 'Condition Classifier', value: 'Wet/Dry Neural Net' },
                { label: 'Ocular Tracking', value: '4-Axis Coordinate Map' },
                { label: 'Fatigue Monitor', value: 'EAR Calculation Engine' },
                { label: 'Diagnostic Engine', value: 'LLM Report Generator' },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-3 sm:p-4 flex flex-col justify-center">
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1 font-semibold">{item.label}</div>
                  <div className="text-sm font-bold text-white tracking-wide">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity (Span 1/3) */}
          <div className="lg:col-span-1 glass-card p-6 sm:p-8 animate-slide-up" style={{animationDelay: '400ms'}}>
            <h2 className="text-base sm:text-lg font-bold mb-6 text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#f59e0b]" />
              Recent Activity
            </h2>
            <div className="space-y-6">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#1B263B] border border-[#2E3E56] flex items-center justify-center flex-shrink-0">
                      {act.icon}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium text-white mb-1 line-clamp-2">{act.summary}</h4>
                    <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">{act.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}