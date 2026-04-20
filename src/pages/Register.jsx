import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Zap, Shield, ScanEye, Activity, Brain } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', agreeToTerms: false })
  const [showPw, setShowPw] = useState(false)
  const [showConfPw, setShowConfPw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const getPwStrength = (pw) => {
    if (!pw) return { level: 0, label: '', color: '' }
    let s = 0
    if (pw.length >= 6) s++
    if (pw.length >= 12) s++
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^a-zA-Z0-9]/.test(pw)) s++
    return [
      { level: 0, label: '', color: '' },
      { level: 1, label: 'Weak', color: '#EF4444' },
      { level: 2, label: 'Fair', color: '#F59E0B' },
      { level: 3, label: 'Good', color: '#3B82F6' },
      { level: 4, label: 'Strong', color: '#10B981' },
      { level: 5, label: 'Very Strong', color: '#059669' },
    ][s]
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSuccess('')
    if (!form.username || !form.email || !form.password) return setError('All fields are required')
    if (form.username.length < 3) return setError('Username must be at least 3 characters')
    if (!form.email.includes('@')) return setError('Please enter a valid email')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    if (!form.agreeToTerms) return setError('Please agree to the Terms & Conditions')
    setLoading(true)
    setTimeout(() => {
      register({ username: form.username, email: form.email })
      setSuccess('Account created! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 500)
      setLoading(false)
    }, 1000)
  }

  const pwStrength = getPwStrength(form.password)

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

      {/* ─── Left: Form ─── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 40px', background: '#fff',
        borderRight: '1px solid #EEF2FF',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-up">
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px', boxShadow: '0 8px 20px rgba(124,58,237,0.25)',
            }}>
              <UserPlus size={22} color="white" />
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '8px' }}>Create account</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Start detecting eye conditions for free today</p>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.875rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={15} /> {error}
            </div>
          )}
          {success && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', fontSize: '0.875rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={15} /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Username */}
            <Field label="Username">
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input type="text" className="input-field" style={{ paddingRight: '40px' }} placeholder="john_doe"
                  value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} disabled={loading} />
              </div>
            </Field>

            {/* Email */}
            <Field label="Email address">
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input type="email" className="input-field" style={{ paddingRight: '40px' }} placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} disabled={loading} />
              </div>
            </Field>

            {/* Password */}
            <Field label="Password">
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input type={showPw ? 'text' : 'password'} className="input-field" style={{ paddingRight: '70px' }} placeholder="Min. 6 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} disabled={loading} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '5px' }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= pwStrength.level ? pwStrength.color : '#E2E8F0', transition: 'background 0.2s' }} />
                    ))}
                  </div>
                  {pwStrength.label && <span style={{ fontSize: '0.75rem', color: pwStrength.color, fontWeight: 600 }}>{pwStrength.label}</span>}
                </div>
              )}
            </Field>

            {/* Confirm password */}
            <Field label="Confirm password">
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input type={showConfPw ? 'text' : 'password'} className="input-field" style={{ paddingRight: '70px' }} placeholder="Repeat password"
                  value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} disabled={loading} />
                <button type="button" onClick={() => setShowConfPw(!showConfPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  {showConfPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.confirmPassword && form.password === form.confirmPassword && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px', fontSize: '0.75rem', color: '#059669' }}>
                  <CheckCircle size={12} /> Passwords match
                </div>
              )}
            </Field>

            {/* Terms */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFF' }}>
              <input type="checkbox" checked={form.agreeToTerms} onChange={e => setForm({ ...form, agreeToTerms: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#7C3AED', marginTop: '1px', flexShrink: 0 }} disabled={loading} />
              <span style={{ fontSize: '0.83rem', color: '#64748B', lineHeight: 1.5 }}>
                I agree to the <Link to="#" style={{ color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}>Terms & Conditions</Link> and{' '}
                <Link to="#" style={{ color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem', marginTop: '4px', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', boxShadow: '0 8px 20px rgba(124,58,237,0.25)' }} disabled={loading || !form.agreeToTerms}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin-slow 0.7s linear infinite' }} />
                  Creating Account…
                </span>
              ) : (<>Create Account <ArrowRight size={16} /></>)}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: '#64748B' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#7C3AED', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </div>

      {/* ─── Right: Branding ─── */}
      <div style={{
        background: 'linear-gradient(145deg, #3B0764 0%, #6D28D9 50%, #7C3AED 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '60px 48px',
        position: 'relative', overflow: 'hidden',
      }} className="hide-on-mobile">
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-40px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        <div style={{ position: 'relative', maxWidth: '420px', width: '100%' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C4B5FD', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>JOIN TODAY</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '14px' }}>
            Start monitoring<br />your eye health today
          </h2>
          <p style={{ color: '#C4B5FD', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
            Get instant access — no credit card, no downloads. Just your browser and webcam.
          </p>

          {[
            { icon: <ScanEye size={18} />, text: 'Wet & Dry eye detection in 30 seconds' },
            { icon: <Activity size={18} />, text: 'Real-time movement & blink tracking' },
            { icon: <Brain size={18} />, text: 'LLM-powered health insights & tips' },
            { icon: <Shield size={18} />, text: 'Privacy-first — all processing in browser' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C4B5FD', flexShrink: 0 }}>
                {f.icon}
              </div>
              <span style={{ fontSize: '0.875rem', color: '#E9D5FF' }}>{f.text}</span>
            </div>
          ))}

          <div style={{
            marginTop: '32px', padding: '20px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <p style={{ fontSize: '0.875rem', color: '#E9D5FF', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '14px' }}>
              "The eye detection technology is incredibly accurate. Our team uses it daily for research."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #EC4899)' }} />
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Sarah Johnson</div>
                <div style={{ fontSize: '0.75rem', color: '#C4B5FD' }}>Research Lead, BioMed Dept.</div>
              </div>
            </div>
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

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '7px', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        {label}
      </label>
      {children}
    </div>
  )
}