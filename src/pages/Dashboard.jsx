import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import {
  ScanEye, BookOpen, BarChart3, Eye, Activity, Brain,
  Clock, ArrowRight, Sparkles, TrendingUp, Shield,
  ChevronRight, Play, AlertCircle, CheckCircle2
} from 'lucide-react'

export default function Dashboard() {
  const { user, detectionResults } = useAuth()

  const quickActions = [
    {
      to: '/detection',
      icon: <ScanEye size={24} />,
      iconClass: 'icon-box-blue',
      title: 'Start Eye Detection',
      desc: 'Begin 30-second real-time webcam analysis for wet/dry eye detection.',
      tag: 'Primary',
      tagColor: '#2563EB',
    },
    {
      to: '/instructions',
      icon: <BookOpen size={24} />,
      iconClass: 'icon-box-sky',
      title: 'View Instructions',
      desc: 'Learn preparation tips and best practices for maximum accuracy.',
      tag: 'Guide',
      tagColor: '#0284C7',
    },
    {
      to: '/results',
      icon: <BarChart3 size={24} />,
      iconClass: 'icon-box-green',
      title: 'Analysis Results',
      desc: 'Review your detection results, EAR graphs, and AI health report.',
      tag: detectionResults ? 'Available' : 'Pending',
      tagColor: detectionResults ? '#059669' : '#D97706',
    },
  ]

  const metrics = [
    {
      icon: <Eye size={18} />, iconClass: 'icon-box-blue',
      label: 'Detection Status',
      value: detectionResults ? 'Completed' : 'Not Started',
      color: detectionResults ? '#059669' : '#D97706',
      sub: detectionResults ? 'Session analyzed' : 'Run a session',
    },
    {
      icon: <Activity size={18} />, iconClass: 'icon-box-sky',
      label: 'Blink Rate',
      value: detectionResults ? `${detectionResults.blinkRate}/min` : '—',
      color: '#0284C7',
      sub: detectionResults ? (detectionResults.blinkRate >= 15 ? 'Normal range' : 'Below normal') : 'Awaiting data',
    },
    {
      icon: <Brain size={18} />, iconClass: 'icon-box-purple',
      label: 'AI Analysis',
      value: detectionResults ? 'Available' : 'Pending',
      color: '#7C3AED',
      sub: detectionResults ? 'LLM report ready' : 'Run detection first',
    },
    {
      icon: <Clock size={18} />, iconClass: 'icon-box-amber',
      label: 'Last Session',
      value: detectionResults ? 'Recent' : 'None',
      color: '#D97706',
      sub: detectionResults ? new Date(detectionResults.timestamp).toLocaleTimeString() : 'No sessions yet',
    },
  ]

  const capabilities = [
    { label: 'Eye Condition', value: 'Wet / Dry Classification' },
    { label: 'Movement Tracking', value: 'L · R · U · D · Center' },
    { label: 'Blink Detection', value: 'Real-time EAR Analysis' },
    { label: 'AI Explanation', value: 'LLM via Puter.js' },
  ]

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="page-wrapper">

        {/* Welcome banner */}
        <div className="animate-fade-up" style={{
          background: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)',
          borderRadius: '20px', padding: '32px 36px',
          marginBottom: '32px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: '-20px', top: '-20px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div style={{
            position: 'absolute', right: '60px', bottom: '-40px',
            width: '140px', height: '140px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} color="#FCD34D" />
              <span style={{ fontSize: '0.8rem', color: '#93C5FD', fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                DASHBOARD
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
              color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em',
            }}>
              Welcome back, {user?.username || 'User'} 👋
            </h1>
            <p style={{ color: '#93C5FD', fontSize: '0.95rem' }}>
              Monitor your eye health with AI-powered detection and real-time analysis.
            </p>
          </div>
        </div>

        {/* Metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {metrics.map((m, i) => (
            <div key={i} className="metric-card animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div className={`icon-box ${m.iconClass}`} style={{ width: '38px', height: '38px', borderRadius: '10px' }}>
                  {m.icon}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {m.label.toUpperCase()}
                </span>
              </div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.3rem',
                fontWeight: 800, color: m.color, marginBottom: '4px',
              }}>{m.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>
              Quick Actions
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {quickActions.map((action, i) => (
              <Link key={i} to={action.to} style={{ textDecoration: 'none' }}>
                <div className="card animate-fade-up" style={{ padding: '24px', animationDelay: `${i * 0.1}s`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div className={`icon-box ${action.iconClass}`} style={{ width: '46px', height: '46px', borderRadius: '12px' }}>
                      {action.icon}
                    </div>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, padding: '3px 9px',
                      borderRadius: '99px', background: action.tagColor + '15',
                      color: action.tagColor, border: `1px solid ${action.tagColor}30`,
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                    }}>{action.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    {action.title}
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: '#64748B', lineHeight: 1.6, marginBottom: '14px' }}>{action.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.83rem', fontWeight: 600, color: action.tagColor, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    Open <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System capabilities */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <div className="icon-box icon-box-green" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>
              <Shield size={15} />
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
              System Capabilities
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {capabilities.map((cap, i) => (
              <div key={i} style={{
                padding: '14px 16px', borderRadius: '10px',
                background: 'var(--bg)', border: '1px solid #F1F5F9',
              }}>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '5px' }}>
                  {cap.label.toUpperCase()}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>{cap.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Start CTA if no results */}
        {!detectionResults && (
          <div className="animate-fade-up" style={{
            marginTop: '24px', padding: '20px 24px',
            background: '#EFF6FF', border: '1px solid #BFDBFE',
            borderRadius: '14px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={18} color="#2563EB" />
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: '#1E3A8A', fontSize: '0.9rem' }}>
                  No detection sessions yet
                </div>
                <div style={{ fontSize: '0.8rem', color: '#60A5FA' }}>Start a session to see your eye health analysis</div>
              </div>
            </div>
            <Link to="/detection" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem', flexShrink: 0 }}>
              <Play size={14} /> Start Now
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}