import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../App'
import {
  BarChart3, Calendar, Clock, Activity, Eye, Brain,
  Droplets, Sun, Download, Share2, RefreshCw, ArrowLeft,
  CheckCircle2, TrendingUp, AlertTriangle, Sparkles
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

const earData = [
  { time: '0s', EAR: 0.32 }, { time: '5s', EAR: 0.28 },
  { time: '10s', EAR: 0.13 }, { time: '12s', EAR: 0.31 },
  { time: '15s', EAR: 0.29 }, { time: '20s', EAR: 0.27 },
  { time: '23s', EAR: 0.11 }, { time: '26s', EAR: 0.30 },
  { time: '30s', EAR: 0.29 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: '0.8rem' }}>
      <p style={{ color: '#94A3B8', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: '#2563EB' }}>EAR: {payload[0].value}</p>
    </div>
  )
}

export default function Results() {
  const { detectionResults } = useAuth()
  if (!detectionResults) return <Navigate to="/dashboard" />

  const isDry = detectionResults.condition === 'Dry'
  const blinkNormal = detectionResults.blinkRate >= 15

  const metrics = [
    { icon: <Eye size={18} />, iconCls: 'icon-box-blue', label: 'Blink Rate', value: `${detectionResults.blinkRate}/min`, badge: blinkNormal ? { text: 'Normal', cls: 'badge-green' } : { text: 'Low', cls: 'badge-yellow' } },
    { icon: <Activity size={18} />, iconCls: 'icon-box-sky', label: 'Eye Movements', value: detectionResults.movements, badge: null },
    { icon: <TrendingUp size={18} />, iconCls: 'icon-box-purple', label: 'Avg EAR', value: detectionResults.earAvg.toFixed(3), badge: null },
    { icon: <CheckCircle2 size={18} />, iconCls: 'icon-box-green', label: 'Confidence', value: `${detectionResults.accuracy}%`, badge: { text: 'High', cls: 'badge-green' } },
  ]

  return (
    <div style={{ padding: '40px 0', background: 'var(--bg)', minHeight: 'calc(100vh - 64px)' }}>
      <div className="page-wrapper">

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BarChart3 size={16} color="#2563EB" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>ANALYSIS REPORT</span>
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Session Results
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn-secondary" style={{ padding: '9px 16px', fontSize: '0.85rem' }}>
              <Download size={14} /> Export
            </button>
            <button className="btn-secondary" style={{ padding: '9px 16px', fontSize: '0.85rem' }}>
              <Share2 size={14} /> Share
            </button>
            <Link to="/detection" className="btn-primary" style={{ padding: '9px 16px', fontSize: '0.85rem' }}>
              <RefreshCw size={14} /> New Test
            </Link>
          </div>
        </div>

        {/* Condition hero card */}
        <div style={{
          borderRadius: '20px', padding: '28px 32px', marginBottom: '24px', position: 'relative', overflow: 'hidden',
          ...(isDry
            ? { background: 'linear-gradient(135deg,#FFFBEB,#FEF3C7)', border: '1.5px solid #FDE68A' }
            : { background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', border: '1.5px solid #BFDBFE' }),
        }} className="animate-fade-up">
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '160px', height: '160px', borderRadius: '50%', background: isDry ? 'rgba(253,230,138,0.4)' : 'rgba(191,219,254,0.4)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '18px', flexShrink: 0,
              background: isDry ? 'rgba(245,158,11,0.15)' : 'rgba(37,99,235,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${isDry ? '#FDE68A' : '#BFDBFE'}`,
            }}>
              {isDry ? <Sun size={32} color="#D97706" /> : <Droplets size={32} color="#2563EB" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isDry ? '#92400E' : '#1E40AF', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: '4px' }}>
                DETECTED CONDITION
              </div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: isDry ? '#D97706' : '#1D4ED8', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                {detectionResults.condition} Eye Detection
              </h2>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: isDry ? '#FFFBEB' : '#EFF6FF', color: isDry ? '#92400E' : '#1E40AF', border: `1px solid ${isDry ? '#FDE68A' : '#BFDBFE'}`, fontSize: '0.72rem' }}>
                  <CheckCircle2 size={11} /> {detectionResults.accuracy}% confidence
                </span>
                <span className="badge badge-blue">
                  <Clock size={11} /> {new Date(detectionResults.timestamp).toLocaleTimeString()}
                </span>
                <span className="badge badge-blue">
                  <Calendar size={11} /> {new Date(detectionResults.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {metrics.map((m, i) => (
            <div key={i} className="metric-card animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div className={`icon-box ${m.iconCls}`} style={{ width: '34px', height: '34px', borderRadius: '9px' }}>{m.icon}</div>
                {m.badge && <span className={`badge ${m.badge.cls}`}>{m.badge.text}</span>}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '5px', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {m.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Charts + AI */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>

          {/* EAR Chart */}
          <div className="card animate-fade-up" style={{ padding: '22px', animationDelay: '0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div className="icon-box icon-box-blue" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>
                <Activity size={16} />
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>EAR Trend</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Eye Aspect Ratio over 30s session</div>
              </div>
            </div>
            <div style={{ height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="earGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="time" stroke="#CBD5E1" fontSize={11} tick={{ fontFamily: 'DM Sans' }} />
                  <YAxis stroke="#CBD5E1" fontSize={11} domain={[0, 0.4]} tick={{ fontFamily: 'DM Sans' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="EAR" stroke="#2563EB" strokeWidth={2} fill="url(#earGrad)" dot={{ r: 3, fill: '#2563EB', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '10px', textAlign: 'center' }}>
              ↓ Dips in the graph indicate detected blinks
            </p>
          </div>

          {/* AI Assessment */}
          <div className="card animate-fade-up" style={{ padding: '22px', animationDelay: '0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div className="icon-box icon-box-purple" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>
                <Brain size={16} />
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>AI Assessment</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>LLM-generated explanation</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <span className="badge" style={{ background: '#FAF5FF', color: '#7C3AED', border: '1px solid #EDE9FE', fontSize: '0.7rem' }}>
                  <Sparkles size={10} /> Puter.js
                </span>
              </div>
            </div>

            <div style={{ maxHeight: '260px', overflowY: 'auto', padding: '14px', background: '#F8FAFF', borderRadius: '10px', border: '1px solid #EEF2FF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', padding: '8px 10px', background: isDry ? '#FFFBEB' : '#EFF6FF', borderRadius: '8px', border: `1px solid ${isDry ? '#FDE68A' : '#DBEAFE'}` }}>
                <AlertTriangle size={14} color={isDry ? '#D97706' : '#2563EB'} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isDry ? '#92400E' : '#1E40AF', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {detectionResults.condition} Eye — AI Explanation
                </span>
              </div>
              <div className="ai-prose" style={{ whiteSpace: 'pre-wrap' }}>
                {detectionResults.aiExplanation || 'Based on your clinical parameters, your eye condition has been classified. The analysis indicates potential tear film instability. Recommendations include the 20-20-20 rule and adequate hydration.'}
              </div>
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px', marginTop: '14px' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: '#0F172A', fontSize: '0.82rem', marginBottom: '8px' }}>Professional Guidance</div>
                {[
                  'Maintain ambient humidity if working in AC environments.',
                  'Consult an eye care professional if symptoms persist.',
                ].map((rec, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            Kings Engineering College © 2026 — Biomedical Engineering Dept.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}