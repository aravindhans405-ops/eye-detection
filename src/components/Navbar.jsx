import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import {
  Eye, Home, LogIn, UserPlus, LayoutDashboard,
  ScanEye, BookOpen, BarChart3, LogOut, Menu, X, ChevronDown
} from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const navItems = user ? [
    { to: '/dashboard', icon: <LayoutDashboard size={15} />, label: 'Dashboard' },
    { to: '/detection', icon: <ScanEye size={15} />, label: 'Detect' },
    { to: '/instructions', icon: <BookOpen size={15} />, label: 'Guide' },
    { to: '/results', icon: <BarChart3 size={15} />, label: 'Results' },
  ] : [
    { to: '/', icon: <Home size={15} />, label: 'Home' },
  ]

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? '#E2E8F0' : '#EEF2FF'}`,
        boxShadow: scrolled ? '0 1px 20px rgba(15,23,42,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="page-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
            }}>
              <Eye size={18} color="white" />
            </div>
            <div>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: '1rem',
                color: '#0F172A', letterSpacing: '-0.02em',
              }}>EyeDetect</span>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: '1rem',
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginLeft: '2px',
              }}>AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hidden-mobile">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden-mobile">
            {!user ? (
              <>
                <Link to="/login" className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                  Get Started
                </Link>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '6px 12px', borderRadius: '8px',
                  background: '#F8FAFF', border: '1px solid #E2E8F0',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700, color: 'white',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={logout}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 14px', borderRadius: '8px', border: '1px solid #FEE2E2',
                    background: '#FFF5F5', color: '#DC2626', cursor: 'pointer',
                    fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.2s',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FEE2E2' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#FFF5F5' }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '8px',
              border: '1px solid #E2E8F0', background: 'white',
              cursor: 'pointer', color: '#475569',
            }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            borderTop: '1px solid #E2E8F0', padding: '12px 0 16px',
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '8px' }}>
              {!user ? (
                <>
                  <Link to="/login" className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }} onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link to="/register" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }} onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </>
              ) : (
                <button onClick={() => { logout(); setMobileOpen(false) }} className="btn-ghost" style={{ color: '#DC2626', width: '100%', justifyContent: 'center' }}>
                  <LogOut size={14} /> Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}