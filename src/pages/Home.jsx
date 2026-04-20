import React from 'react'
import { Link } from 'react-router-dom'
import {
  Eye, ScanEye, Activity, Brain, Shield, MonitorSmartphone,
  Zap, ArrowRight, Stethoscope, Cpu, Waves, CheckCircle2,
  Star, TrendingUp, Users
} from 'lucide-react'

const features = [
  {
    icon: <ScanEye size={22} />, iconClass: 'icon-box-blue',
    title: 'Wet & Dry Eye Detection',
    desc: 'AI classification of eye conditions using real-time webcam analysis and deep learning algorithms.',
  },
  {
    icon: <Activity size={22} />, iconClass: 'icon-box-sky',
    title: 'Eyeball Movement Tracking',
    desc: 'Real-time tracking of iris position detecting left, right, up, down, and center fixation patterns.',
  },
  {
    icon: <Brain size={22} />, iconClass: 'icon-box-purple',
    title: 'LLM-Powered Insights',
    desc: 'Large Language Model generates medically meaningful explanations for every detected condition.',
  },
  {
    icon: <Eye size={22} />, iconClass: 'icon-box-green',
    title: 'Blink Rate Monitoring',
    desc: 'Advanced blink counting using Eye Aspect Ratio (EAR) analysis for accurate fatigue detection.',
  },
  {
    icon: <Shield size={22} />, iconClass: 'icon-box-rose',
    title: 'Non-Invasive Screening',
    desc: 'Cost-effective early screening using standard webcam — no specialized equipment required.',
  },
  {
    icon: <MonitorSmartphone size={22} />, iconClass: 'icon-box-amber',
    title: 'Web-Based Platform',
    desc: 'Accessible from any device through any modern web browser with a fully responsive design.',
  },
]

const steps = [
  { step: '01', icon: <ScanEye size={20} />, title: 'Capture', desc: 'Webcam captures your real-time eye images via browser API' },
  { step: '02', icon: <Cpu size={20} />, title: 'Process', desc: 'AI preprocesses frames with noise reduction and contrast enhancement' },
  { step: '03', icon: <Brain size={20} />, title: 'Analyze', desc: 'Deep learning classifies condition and tracks eye movement patterns' },
  { step: '04', icon: <Activity size={20} />, title: 'Report', desc: 'LLM generates detailed explanations and health recommendations' },
]

const stats = [
  { value: '95%+', label: 'Detection Accuracy', icon: <TrendingUp size={18} /> },
  { value: '< 1s', label: 'Real-Time Response', icon: <Zap size={18} /> },
  { value: '6 +', label: 'Metrics Tracked', icon: <Activity size={18} /> },
  { value: '100%', label: 'Browser Native', icon: <Shield size={18} /> },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div className="page-wrapper" style={{ position: 'relative', paddingTop: '80px', paddingBottom: '100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'center' }}>
            <div style={{ maxWidth: '580px' }}>
              {/* Badge */}
              <div className="feature-tag animate-fade-up" style={{ marginBottom: '24px' }}>
                <Zap size={12} />
                AI-Powered Eye Health Monitoring
              </div>

              <h1 className="animate-fade-up delay-1" style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800, lineHeight: 1.1,
                letterSpacing: '-0.03em', color: '#0F172A',
                marginBottom: '20px',
              }}>
                Detect Eye Conditions{' '}
                <span className="text-gradient">Instantly</span>{' '}
                with AI
              </h1>

              <p className="animate-fade-up delay-2" style={{
                fontSize: '1.1rem', color: '#475569',
                lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px',
              }}>
                An intelligent system for detecting wet & dry eye conditions and analyzing eyeball movement
                using LLMs, deep learning, and computer vision — right in your browser.
              </p>

              <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '13px 28px', fontSize: '0.95rem' }}>
                  Start Free Detection <ArrowRight size={16} />
                </Link>
                <Link to="/login" className="btn-secondary" style={{ padding: '13px 28px', fontSize: '0.95rem' }}>
                  Sign In
                </Link>
              </div>

              {/* Trust signals */}
              <div className="animate-fade-up delay-4" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                  <span style={{ fontSize: '0.8rem', color: '#64748B', marginLeft: '4px' }}>Trusted platform</span>
                </div>
                <div style={{ width: '1px', height: '16px', background: '#E2E8F0' }} />
                <div style={{ display: 'flex', gap: '14px' }}>
                  {['No signup fee', 'Browser-based', 'Private & Secure'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#64748B' }}>
                      <CheckCircle2 size={13} color="#10B981" /> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="animate-fade-up delay-2" style={{ position: 'relative', flexShrink: 0 }}>
              <EyeVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: '#fff', borderTop: '1px solid #EEF2FF', borderBottom: '1px solid #EEF2FF' }}>
        <div className="page-wrapper" style={{ padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px', color: '#2563EB' }}>{s.icon}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500, marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '96px 0', background: 'var(--bg)' }}>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="feature-tag" style={{ display: 'inline-flex', marginBottom: '16px' }}>Key Features</div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800,
              color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '12px',
            }}>
              Everything you need for eye health<br/>
              <span className="text-gradient">monitoring & analysis</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
              Comprehensive AI-powered tools built for accurate, real-time eye condition detection.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ padding: '28px' }}>
                <div className={`icon-box ${f.iconClass}`} style={{ width: '48px', height: '48px', marginBottom: '16px', borderRadius: '12px' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '96px 0', background: '#fff', borderTop: '1px solid #EEF2FF' }}>
        <div className="page-wrapper">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="feature-tag" style={{ display: 'inline-flex', marginBottom: '16px' }}>How It Works</div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800,
              color: '#0F172A', letterSpacing: '-0.03em',
            }}>
              From capture to{' '}
              <span className="text-gradient">AI insights</span>
              {' '}in seconds
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', position: 'relative' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ padding: '32px 28px', position: 'relative', textAlign: 'center' }}>
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute', top: '52px', right: 0, width: '50%',
                    height: '1px', background: 'linear-gradient(90deg, #DBEAFE, transparent)',
                    display: 'none',
                  }} className="connector-line" />
                )}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 8px 20px rgba(37,99,235,0.25)',
                }}>
                  <span style={{ color: 'white' }}>{s.icon}</span>
                </div>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700, color: '#93C5FD',
                  letterSpacing: '0.1em', marginBottom: '8px',
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}>STEP {s.step}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
        <div className="page-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <div className="feature-tag" style={{ marginBottom: '16px' }}>Applications</div>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 800,
                color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '16px',
              }}>
                Trusted across multiple{' '}
                <span className="text-gradient">industries</span>
              </h2>
              <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '32px' }}>
                From telemedicine to workplace safety monitoring, our platform adapts to diverse real-world needs.
              </p>
              <Link to="/register" className="btn-primary">
                Get Started <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { icon: <Stethoscope size={20} />, title: 'Telemedicine', desc: 'Remote eye health screening', cls: 'icon-box-blue' },
                { icon: <MonitorSmartphone size={20} />, title: 'Workplace Safety', desc: 'Employee fatigue detection', cls: 'icon-box-green' },
                { icon: <Cpu size={20} />, title: 'Assistive Tech', desc: 'Eye-based computer control', cls: 'icon-box-purple' },
                { icon: <Waves size={20} />, title: 'Research', desc: 'Ocular movement studies', cls: 'icon-box-sky' },
              ].map((app, i) => (
                <div key={i} className="card" style={{ padding: '20px' }}>
                  <div className={`icon-box ${app.cls}`} style={{ width: '40px', height: '40px', marginBottom: '12px', borderRadius: '10px' }}>
                    {app.icon}
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>{app.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{app.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: '#fff', borderTop: '1px solid #EEF2FF' }}>
        <div className="page-wrapper">
          <div style={{
            background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 40%, #0369A1 100%)',
            borderRadius: '24px', padding: 'clamp(40px, 6vw, 64px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.1,
              backgroundImage: 'radial-gradient(circle at 30% 20%, #60A5FA 0%, transparent 50%), radial-gradient(circle at 70% 80%, #38BDF8 0%, transparent 50%)',
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '5px 14px', borderRadius: '99px',
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                  color: '#BFDBFE', fontSize: '0.8rem', fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}>
                  <Zap size={12} /> Free to use · No card required
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
                color: '#fff', letterSpacing: '-0.03em', marginBottom: '16px',
              }}>
                Ready to monitor your eye health?
              </h2>
              <p style={{ color: '#BFDBFE', fontSize: '1rem', marginBottom: '32px', lineHeight: 1.6 }}>
                Start using our AI-powered detection system. No specialized equipment required.
              </p>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', background: '#fff', color: '#1D4ED8',
                borderRadius: '12px', fontWeight: 700, textDecoration: 'none',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.95rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s',
              }}>
                Start Detection Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg)', borderTop: '1px solid #E2E8F0', padding: '28px 0' }}>
        <div className="page-wrapper" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '7px',
              background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Eye size={13} color="white" />
            </div>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>AI Eye Detection © 2026</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            Kings Engineering College — Biomedical Engineering Department
          </span>
        </div>
      </footer>
    </div>
  )
}

function EyeVisual() {
  return (
    <div style={{ position: 'relative', width: '340px', height: '340px' }}>
      {/* Outer decorative rings */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '1.5px dashed #BFDBFE',
        animation: 'spin-slow 30s linear infinite',
      }} />
      <div style={{
        position: 'absolute', inset: '20px', borderRadius: '50%',
        border: '1.5px dashed #DBEAFE',
        animation: 'spin-slow 20s linear infinite reverse',
      }} />

      {/* Main card */}
      <div style={{
        position: 'absolute', inset: '40px', borderRadius: '50%',
        background: 'white',
        boxShadow: '0 20px 60px rgba(37,99,235,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid #DBEAFE',
      }}>
        <svg viewBox="0 0 200 120" style={{ width: '160px', height: '100px' }}>
          <defs>
            <linearGradient id="irisGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          {/* Eye outline */}
          <path d="M10,60 Q100,5 190,60 Q100,115 10,60"
            fill="none" stroke="#DBEAFE" strokeWidth="1.5" />
          {/* Iris */}
          <circle cx="100" cy="60" r="32" fill="url(#irisGrad)" opacity="0.9" />
          {/* Pupil */}
          <circle cx="100" cy="60" r="14" fill="#0F172A" />
          {/* Highlight */}
          <circle cx="110" cy="52" r="6" fill="rgba(255,255,255,0.7)" />
          <circle cx="92" cy="68" r="3" fill="rgba(255,255,255,0.4)" />
        </svg>
      </div>

      {/* Floating metric chips */}
      {[
        { label: 'Blink Rate', val: '16/min', top: '8%', left: '60%', color: '#2563EB' },
        { label: 'EAR Value', val: '0.31', top: '38%', left: '-5%', color: '#0EA5E9' },
        { label: 'Tear Film', val: 'Normal', top: '72%', left: '55%', color: '#10B981' },
        { label: 'Movement', val: 'Center', top: '62%', left: '-10%', color: '#7C3AED' },
      ].map((chip, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: chip.top, left: chip.left,
          background: 'white',
          border: '1.5px solid #E2E8F0',
          borderRadius: '10px',
          padding: '8px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          animation: `float ${4 + i * 0.7}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
          whiteSpace: 'nowrap',
        }}>
          <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 500, marginBottom: '2px' }}>{chip.label}</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: chip.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{chip.val}</div>
        </div>
      ))}
    </div>
  )
}