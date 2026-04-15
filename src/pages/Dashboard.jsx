import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import { ScanEye, BookOpen, BarChart3, Eye, Activity, Brain, Clock, ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react'

export default function Dashboard() {
  const { user, detectionResults } = useAuth()

  const quickActions = [
    { to: '/detection', icon: <ScanEye className="w-8 h-8" />, title: 'Start Eye Detection', desc: 'Begin real-time webcam analysis for wet/dry eye detection and movement tracking', color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #818cf8)' },
    { to: '/instructions', icon: <BookOpen className="w-8 h-8" />, title: 'View Instructions', desc: 'Learn how to use the system effectively for accurate results', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
    { to: '/results', icon: <BarChart3 className="w-8 h-8" />, title: 'View Results', desc: 'Check your detection results, analysis graphs, and AI explanations', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
  ]

  const stats = [
    { icon: <Eye className="w-5 h-5" />, label: 'Detection Status', value: detectionResults ? 'Completed' : 'Not Started', color: detectionResults ? '#10b981' : '#f59e0b' },
    { icon: <Activity className="w-5 h-5" />, label: 'Blink Rate', value: detectionResults ? `${detectionResults.blinkRate}/min` : '—', color: '#06b6d4' },
    { icon: <Brain className="w-5 h-5" />, label: 'AI Analysis', value: detectionResults ? 'Available' : 'Pending', color: '#8b5cf6' },
    { icon: <Clock className="w-5 h-5" />, label: 'Last Session', value: detectionResults ? 'Just now' : 'No sessions', color: '#ec4899' },
  ]

  return (
    <div className="page-container min-h-[calc(100vh-64px)]">
      <div className="content-wrapper w-full py-8 overflow-hidden">
        {/* Welcome Header */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-sm font-medium text-indigo-300">Dashboard</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{user?.username || 'User'}</span>
              </h1>
              <p className="text-slate-400 text-lg">
                Monitor your eye health with AI-powered detection and real-time analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}>
                  <span style={{ color: stat.color }}>{stat.icon}</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.to} className="no-underline group">
                <div className="glass-card p-6 h-full animate-slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: action.gradient }}>
                    <span className="text-white">{action.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-indigo-300 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{action.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: action.color }}>
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            System Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Eye Condition', value: 'Wet/Dry Classification' },
              { label: 'Movement Tracking', value: 'Left, Right, Up, Down' },
              { label: 'Blink Detection', value: 'Real-time EAR Analysis' },
              { label: 'AI Explanation', value: 'LLM-Powered via Puter.js' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(15,15,35,0.6)' }}>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-sm font-medium text-slate-300">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}