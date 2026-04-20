import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Zap, Shield, Cpu, ScanEye, Activity, Brain } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!form.email || !form.password) { setError('All fields are required'); return }
    if (!form.email.includes('@')) { setError('Please enter a valid email address'); return }
    setLoading(true)
    setTimeout(() => {
      login({ username: form.email.split('@')[0], email: form.email })
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 500)
      setLoading(false)
    }, 1000)
  }

  const highlights = [
    { icon: <ScanEye size={18} />, title: 'Wet & Dry Eye Detection', desc: '95%+ accuracy using EAR analysis' },
    { icon: <Activity size={18} />, title: 'Real-Time Movement Tracking', desc: 'Left, right, up, down, center' },
    { icon: <Brain size={18} />, title: 'LLM-Powered Health Insights', desc: 'AI explanations and recommendations' },
  ]

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

      {/* ─── Left: Form ─── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 40px', background: '#fff',
        borderRight: '1px solid #EEF2FF',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-up">

          <div style={{ marginBottom: '36px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px', boxShadow: '0 8px 20px rgba(37,99,235,0.25)',
            }}>
              <LogIn size={22} color="white" />
            </div>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: '1.8rem', fontWeight: 800,
              color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '8px',
            }}>Welcome back</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Sign in to continue to your account</p>
          </div>

          {/* Alerts */}
          {error && (
            <div style={{
              padding: '12px 16px', borderRadius: '10px',
              background: '#FEF2F2', border: '1px solid #FECACA',
              color: '#DC2626', fontSize: '0.875rem', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>!</span>
              </div>
              {error}
            </div>
          )}
          {success && (
            <div style={{
              padding: '12px 16px', borderRadius: '10px',
              background: '#ECFDF5', border: '1px solid #A7F3D0',
              color: '#059669', fontSize: '0.875rem', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <CheckCircle size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Email address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input
                  type="email" className="input-field" style={{ paddingRight: '40px' }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Password</label>
                <Link to="#" style={{ fontSize: '0.8rem', color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Forgot?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input
                  type={showPw ? 'text' : 'password'} className="input-field" style={{ paddingRight: '70px' }}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  disabled={loading}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px',
                }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.rememberMe} onChange={e => setForm({ ...form, rememberMe: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#2563EB' }} disabled={loading} />
              <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Keep me signed in</span>
            </label>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }} disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin-slow 0.7s linear infinite' }} />
                  Signing in…
                </span>
              ) : (<>Sign In <ArrowRight size={16} /></>)}
            </button>
          </form>

          {/* Demo hint */}
          <div style={{
            marginTop: '20px', padding: '12px 14px', borderRadius: '10px',
            background: '#EFF6FF', border: '1px solid #BFDBFE',
            display: 'flex', gap: '8px',
          }}>
            <CheckCircle size={15} color="#2563EB" style={{ flexShrink: 0, marginTop: '1px' }} />
            <div style={{ fontSize: '0.8rem', color: '#1E40AF' }}>
              <strong>Demo:</strong> Enter any email & password to test the platform.
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: '#64748B' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Create one free</Link>
          </p>
        </div>
      </div>

      {/* ─── Right: Branding ─── */}
      <div style={{
        background: 'linear-gradient(145deg, #1E3A8A 0%, #1D4ED8 50%, #0369A1 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '60px 48px',
        position: 'relative', overflow: 'hidden',
      }} className="hide-on-mobile">
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-40px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        <div style={{ position: 'relative', maxWidth: '420px', width: '100%' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93C5FD', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              TRUSTED PLATFORM
            </div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800,
              color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15,
              marginBottom: '14px',
            }}>
              AI-powered eye<br />health in your browser
            </h2>
            <p style={{ color: '#93C5FD', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Advanced real-time detection using computer vision and large language models — no downloads required.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
            {highlights.map((h, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                padding: '16px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93C5FD',
                }}>
                  {h.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.875rem', marginBottom: '3px' }}>{h.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#93C5FD' }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[{ val: '95%+', lbl: 'Accuracy' }, { val: '< 1s', lbl: 'Response' }, { val: '24/7', lbl: 'Available' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: '#93C5FD', marginTop: '2px' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hide-on-mobile { display: none !important; } }
        @media (max-width: 768px) { div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}