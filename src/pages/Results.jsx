import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import {
  BarChart3, Calendar, Clock, Activity, Eye, Brain,
  Download, RefreshCw, ArrowLeft, TrendingUp, Search,
  ChevronLeft, ChevronRight, Droplets, Sun, AlertTriangle
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts'

export default function Results() {
  const { detectionResults } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  // Handle Empty State
  if (!detectionResults) {
    return (
      <div className="w-full flex flex-col flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh]">
          <div className="max-w-md w-full glass-card p-10 sm:p-12 text-center flex flex-col items-center animate-slide-up">
            <div className="w-24 h-24 rounded-full bg-[#1B263B] border-2 border-[#2E3E56] flex items-center justify-center mb-8">
              <BarChart3 className="w-10 h-10 text-[#9CA3AF]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">No Results Found</h2>
            <p className="text-base text-[#9CA3AF] mb-8 leading-relaxed">
              You haven't run any detection sessions yet. Start a scan to generate your comprehensive optical health report.
            </p>
            <Link to="/detection" className="btn-primary w-full py-3 text-center rounded-lg">
              Start First Session
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Derived Data
  const isDry = detectionResults.condition === 'Dry'
  const computedScore = isDry ? 65 : 92
  const riskLevel = computedScore > 85 ? 'Low' : computedScore > 60 ? 'Medium' : 'High'
  const gaugeColor = computedScore > 85 ? '#10b981' : computedScore > 60 ? '#f59e0b' : '#ef4444'

  // Dummy Chart Data
  const earData = [
    { time: '0s', value: 0.32 }, { time: '5s', value: 0.28 },
    { time: '10s', value: 0.15 }, { time: '15s', value: 0.31 },
    { time: '20s', value: 0.29 }, { time: '25s', value: 0.12 },
    { time: '30s', value: 0.30 },
  ]
  const blinkHistory = [
    { session: 'S1', blinks: 12 }, { session: 'S2', blinks: 15 },
    { session: 'S3', blinks: 18 }, { session: 'S4', blinks: 14 },
    { session: 'Current', blinks: detectionResults.blinkRate },
  ]
  const conditionDistribution = [
    { name: 'Wet (Normal)', value: 65, color: '#00D4AA' },
    { name: 'Dry', value: 35, color: '#f59e0b' },
  ]

  // Dummy Session History Table Data
  const sessionHistory = Array.from({ length: 12 }).map((_, i) => ({
    id: `SES-${8012 - i}`,
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    time: new Date(Date.now() - i * 86400000).toLocaleTimeString(),
    condition: i === 0 ? detectionResults.condition : (Math.random() > 0.5 ? 'Wet' : 'Dry'),
    blinkRate: i === 0 ? detectionResults.blinkRate : Math.floor(Math.random() * 10 + 10),
    earAvg: (0.2 + Math.random() * 0.1).toFixed(3)
  }))

  const paginatedSessions = sessionHistory.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  const totalPages = Math.ceil(sessionHistory.length / rowsPerPage)

  return (
    <div className="w-full flex flex-col flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-slide-up">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white mb-3">Optical Health Report</h1>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">Aggregated analytics and AI insights from your sessions.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="btn-outline border-[#2E3E56] text-[#9CA3AF] hover:text-white bg-[#1B263B] flex-1 md:flex-none text-sm py-2.5">
              <Download className="w-4 h-4" /> CSV
            </button>
            <button className="btn-primary bg-[#7F77DD] hover:bg-[#6c64ce] flex-1 md:flex-none text-sm py-2.5">
              <Download className="w-4 h-4" /> PDF Report
            </button>
          </div>
        </div>

        {/* Top Section: Health Score & AI Insights */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">

          {/* Health Score Gauge */}
          <div className="glass-card p-8 flex flex-col items-center justify-center animate-slide-up text-center">
            <h2 className="text-lg font-bold text-white mb-6">Overall Optical Health</h2>
            <div className="relative w-48 h-48 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2E3E56" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke={gaugeColor} strokeWidth="8"
                  strokeDasharray={`${(computedScore / 100) * 283} 283`} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black" style={{ color: gaugeColor }}>{computedScore}</span>
                <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mt-1">Score</span>
              </div>
            </div>
            <div className="px-4 py-1 rounded-full border text-sm font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${gaugeColor}15`, borderColor: `${gaugeColor}40`, color: gaugeColor }}>
              {riskLevel} RISK
            </div>
          </div>

          {/* 4 Summary Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 animate-slide-up delay-100">
            {[
              { label: 'Total Sessions', val: '12', trend: '+2', chart: earData, key: 'value', color: '#7F77DD' },
              { label: 'Avg Blink Rate', val: `${detectionResults.blinkRate}/m`, trend: 'Normal', chart: blinkHistory, key: 'blinks', color: '#00D4AA' },
              { label: 'Avg EAR Score', val: detectionResults.earAvg.toFixed(3), trend: '-0.02', chart: earData, key: 'value', color: '#f59e0b' },
              { label: 'Total Track Time', val: '6.0m', trend: '+30s', chart: blinkHistory, key: 'blinks', color: '#3B82F6' }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">{stat.label}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1B263B] text-white">{stat.trend}</span>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <span className="text-2xl font-bold text-white">{stat.val}</span>
                  <div className="w-1/2 h-10 opacity-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stat.chart}>
                        <Area type="monotone" dataKey={stat.key} stroke={stat.color} fill={stat.color} fillOpacity={0.2} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* AI Recommendations */}
        <div className="mb-12 animate-slide-up delay-200">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Brain className="w-6 h-6 text-[#7F77DD] flex-shrink-0" /> AI Clinical Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="glass-card p-6 border-l-4 border-l-[#f59e0b] flex flex-col">
              <h3 className="font-bold text-white mb-2">Blink Behavior</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Your blink rate indicates potential digital eye strain. Conscious blinking exercises recommended.
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-[#00D4AA] flex flex-col">
              <h3 className="font-bold text-white mb-2">Tear Film Stability</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Based on EAR variance, tear film integrity is moderate. Consider 20-20-20 rule implementation.
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-[#7F77DD] flex flex-col">
              <h3 className="font-bold text-white mb-2">Ocular Motility</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Tracking vectors show healthy eye muscle coordination with no fixation anomalies detected.
              </p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12 animate-slide-up delay-300">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-6">EAR Value Fluctuations</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E3E56" vertical={false} />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 0.4]} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0D1B2A', borderColor: '#2E3E56', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="value" name="EAR Value" stroke="#00D4AA" strokeWidth={3} dot={{ fill: '#00D4AA', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-6">Blink Count per Session</h3>
            <div className="h-64 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={blinkHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E3E56" vertical={false} />
                  <XAxis dataKey="session" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0D1B2A', borderColor: '#2E3E56', borderRadius: '8px' }} cursor={{ fill: '#1B263B' }} />
                  <Bar dataKey="blinks" name="Blinks" radius={[4, 4, 0, 0]}>
                    {blinkHistory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === blinkHistory.length - 1 ? '#00D4AA' : '#7F77DD'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">Condition Mapping</h3>
            <div className="h-64 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={conditionDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {conditionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0D1B2A', borderColor: '#2E3E56', borderRadius: '8px' }} />
                  <Legend verticalAlign="bottom" align="center" wrapperStyle={{ color: '#9CA3AF', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Session History Table */}
        <div className="glass-card p-6 lg:p-8 mb-12 animate-slide-up delay-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-xl font-bold text-white">Full Session History</h3>
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input type="text" placeholder="Search sessions..." className="w-full sm:w-64 bg-[#0D1B2A] border border-[#2E3E56] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00D4AA]" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#2E3E56] bg-[#0D1B2A]">
                  <th className="py-4 px-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">Session ID</th>
                  <th className="py-4 px-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">Date & Time</th>
                  <th className="py-4 px-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">Condition</th>
                  <th className="py-4 px-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider text-right whitespace-nowrap">Blinks/min</th>
                  <th className="py-4 px-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider text-right whitespace-nowrap">Avg EAR</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSessions.map((session, i) => (
                  <tr key={session.id} className="border-b border-[#2E3E56]/50 hover:bg-[#1B263B]/50 transition-colors cursor-pointer">
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">{session.id}</td>
                    <td className="py-4 px-4 text-[#9CA3AF] whitespace-nowrap">{session.date} - {session.time}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap ${session.condition === 'Wet' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'bg-[#f59e0b]/10 text-[#f59e0b]'}`}>
                        {session.condition === 'Wet' ? <Droplets className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                        {session.condition}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-white text-right whitespace-nowrap">{session.blinkRate}</td>
                    <td className="py-4 px-4 font-bold text-white text-right whitespace-nowrap">{session.earAvg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 pt-6 border-t border-[#2E3E56]">
            <span className="text-xs sm:text-sm text-[#9CA3AF]">
              Showing <span className="font-bold text-white">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-bold text-white">{Math.min(currentPage * rowsPerPage, sessionHistory.length)}</span> of <span className="font-bold text-white">{sessionHistory.length}</span> results
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded bg-[#1B263B] border border-[#2E3E56] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-[#00D4AA] disabled:opacity-50 disabled:hover:border-[#2E3E56] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded bg-[#1B263B] border border-[#2E3E56] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-[#00D4AA] disabled:opacity-50 disabled:hover:border-[#2E3E56] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
