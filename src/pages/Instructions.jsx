import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle2, AlertCircle, Camera, Lightbulb, User, ShieldCheck, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: <User size={20} />, 
    iconClass: 'icon-box-blue',
    step: '01', 
    title: 'Positioning',
    desc: 'Sit comfortably with your face centered in the camera frame, approximately 30–50 cm away from the screen.',
  },
  {
    icon: <Lightbulb size={20} />, 
    iconClass: 'icon-box-amber',
    step: '02', 
    title: 'Lighting',
    desc: 'Ensure your face is evenly lit. Avoid strong backlighting or deep shadows, as these may reduce detection accuracy.',
  },
  {
    icon: <Camera size={20} />, 
    iconClass: 'icon-box-sky',
    step: '03', 
    title: 'Testing Process',
    desc: 'The test lasts 30 seconds. Look naturally at the screen and follow any on-screen movement cues throughout.',
  },
  {
    icon: <ShieldCheck size={20} />, 
    iconClass: 'icon-box-green',
    step: '04', 
    title: 'Privacy & Security',
    desc: 'All processing happens locally in your browser. No video data is ever transmitted to servers or stored permanently.',
  },
]

const tips = [
  'Remove glasses or tinted lenses if possible for maximum detection accuracy.',
  'Keep your head relatively still during the full 30-second measurement period.',
  'Blink naturally — do not force or suppress blinks during the session.',
  'Make sure your hair or other objects are not obscuring either of your eyes.',
  'Ensure you\'re in a quiet environment to avoid distracting movements.',
  'Allow the camera permission prompt when prompted by the browser.',
]

export default function Instructions() {
  return (
    <div style={{ padding: '60px 0', background: 'var(--bg)', minHeight: 'calc(100vh - 64px)' }}>
      <div className="page-wrapper" style={{ maxWidth: '900px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }} className="animate-fade-up">
          <div className="feature-tag" style={{ marginBottom: '20px' }}>
            <BookOpen size={14} /> 
            <span>User Preparation Guide</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)', 
            fontWeight: 800,
            color: 'var(--text-primary)', 
            letterSpacing: '-0.03em', 
            marginBottom: '16px',
            lineHeight: 1.1
          }}>
            How to use <span className="text-gradient">AI Eye Detect</span>
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.1rem', 
            maxWidth: '580px', 
            margin: '0 auto', 
            lineHeight: 1.65 
          }}>
            Follow these essential steps and best practices to ensure the most accurate detection of your eye condition and movement patterns.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          {steps.map((step, i) => (
            <div key={i} className="card animate-fade-up" style={{ padding: '28px', animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className={`icon-box ${step.iconClass}`} style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: 'var(--text-muted)', 
                    letterSpacing: '0.1em',
                    marginBottom: '2px'
                  }}>
                    STEP {step.step}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {step.title}
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Best practices */}
        <div className="card animate-fade-up" style={{ padding: '32px', marginBottom: '32px', animationDelay: '0.4s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div className="icon-box icon-box-green" style={{ width: '44px', height: '44px', borderRadius: '11px' }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Best Practices for Accuracy
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Follow these tips for the most reliable screening results</p>
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '16px' 
          }}>
            {tips.map((tip, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '12px', 
                alignItems: 'flex-start', 
                padding: '16px', 
                borderRadius: '12px', 
                background: 'var(--blue-50)', 
                border: '1px solid var(--blue-100)',
                transition: 'all 0.2s ease'
              }}>
                <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div 
          className="animate-fade-up" 
          style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            marginBottom: '40px',
            animationDelay: '0.5s' 
          }}
        >
          <Link to="/detection" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            Go to Detection <ArrowRight size={18} />
          </Link>
          <Link to="/dashboard" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            Back to Dashboard
          </Link>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '20px 24px', 
          borderRadius: '16px',
          background: '#FFF5F5', 
          border: '1px solid #FEE2E2',
          display: 'flex', 
          gap: '16px', 
          alignItems: 'flex-start',
        }} className="animate-fade-up">
          <AlertCircle size={20} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ fontSize: '0.875rem', color: '#991B1B', lineHeight: 1.6 }}>
              <strong style={{ color: '#7F1D1D' }}>Medical Disclaimer:</strong> This tool is for screening and informational purposes only and does not provide a formal medical diagnosis. 
              If you experience severe eye discomfort, vision loss, or persistent irritation, please consult a qualified healthcare professional immediately.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}