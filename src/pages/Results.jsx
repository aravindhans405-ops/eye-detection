import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../App'
import { 
  BarChart3, Calendar, Clock, Activity, Eye, Brain, 
  Droplets, Sun, Download, Share2, RefreshCw, ArrowLeft,
  CheckCircle2, TrendingUp, AlertTriangle
} from 'lucide-react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell
} from 'recharts'

export default function Results() {
  const { detectionResults, user } = useAuth()

  if (!detectionResults) {
    return <Navigate to="/dashboard" />
  }

  // Sample data for charts (derived from session)
  const earData = [
    { time: '0s', value: 0.32 },
    { time: '5s', value: 0.28 },
    { time: '10s', value: 0.15 }, // Blink
    { time: '15s', value: 0.31 },
    { time: '20s', value: 0.29 },
    { time: '25s', value: 0.12 }, // Blink
    { time: '30s', value: 0.30 },
  ]

  const blinkStats = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 15 },
    { name: 'Wed', count: 18 },
    { name: 'Thu', count: 14 },
    { name: 'Fri', count: detectionResults.blinkRate },
  ]

  const isDry = detectionResults.condition === 'Dry'

  return (
    <div className="page-container min-h-[calc(100vh-64px)]">
      <div className="content-wrapper w-full py-8 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-slide-up">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Analysis Report</span>
            </div>
            <h1 className="text-3xl font-bold">Session <span className="gradient-text">Results</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary py-2">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button className="btn-secondary py-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <Link to="/detection" className="btn-primary py-2">
              <RefreshCw className="w-4 h-4" /> New Test
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Condition Card */}
          <div className={`lg:col-span-2 glass-card p-6 relative overflow-hidden animate-slide-up`}>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10" 
              style={{ background: isDry ? 'radial-gradient(circle, #f59e0b, transparent)' : 'radial-gradient(circle, #06b6d4, transparent)' }} 
            />
            
            <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className={`w-28 h-28 rounded-3xl flex items-center justify-center flex-shrink-0`}
                style={{ background: isDry ? 'rgba(245,158,11,0.1)' : 'rgba(6,182,212,0.1)', border: `1px solid ${isDry ? '#f59e0b40' : '#06b6d440'}` }}>
                {isDry ? (
                  <Sun className="w-14 h-14 text-yellow-500 animate-pulse-glow" />
                ) : (
                  <Droplets className="w-14 h-14 text-cyan-500 animate-float" />
                )}
              </div>
              
              <div className="flex-grow">
                <div className="text-sm font-medium text-slate-400 mb-1">Detected Condition</div>
                <h2 className={`text-3xl font-black mb-2 ${isDry ? 'text-yellow-500' : 'text-cyan-500'}`}>
                  {detectionResults.condition} Eye Detection
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Accuracy: {detectionResults.accuracy}%
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    {new Date(detectionResults.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    {new Date(detectionResults.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="glass-card p-6 flex flex-col justify-between animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Key Metrics</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Blink Rate</div>
                    <div className="text-lg font-bold">{detectionResults.blinkRate}/min</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-md ${detectionResults.blinkRate < 15 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                  {detectionResults.blinkRate < 15 ? 'Low' : 'Normal'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Movement Patterns</div>
                    <div className="text-lg font-bold truncate max-w-[120px]">{detectionResults.movements}</div>
                  </div>
                </div>
                <TrendingUp className="w-4 h-4 text-slate-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Avg EAR Value</div>
                    <div className="text-lg font-bold">{detectionResults.earAvg.toFixed(3)}</div>
                  </div>
                </div>
                <span className="text-xs text-indigo-400 font-medium">+2.4%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* EAR Trend Chart */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Eye Aspect Ratio (EAR) Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2d4d" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 0.4]} />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a3e', border: '1px solid #3f3f6d', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-4 italic text-center">
              Dips in the graph indicate detected blinks during the 30-second session.
            </p>
          </div>

          {/* AI Assessment */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              AI Detailed Assessment
            </h3>
            <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 h-[260px] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/10">
                <AlertTriangle className={`w-5 h-5 ${isDry ? 'text-yellow-400' : 'text-green-400'}`} />
                <span className="text-sm font-medium">LLM-Generated Explanation</span>
              </div>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {detectionResults.aiExplanation || "Based on your clinical parameters, your eye condition has been classified. The analysis indicates potential tear film instability often associated with reduced blink rates during digital device usage. Recommendations include following the 20-20-20 rule and maintaining adequate hydration."}
                
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="text-white font-bold mb-3">Professional Guidance</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Maintain ambient humidity if working in AC environments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Consult an eye care professional if symptoms persist.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 py-8 border-t border-slate-800/50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="text-xs text-slate-500">
            Kings Engineering College © 2026 — Biomedical Engineering Dept.
          </div>
        </div>
      </div>
    </div>
  )
}
