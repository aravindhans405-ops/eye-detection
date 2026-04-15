import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import { Eye, Home, LogIn, UserPlus, LayoutDashboard, ScanEye, BookOpen, BarChart3, LogOut } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className="relative z-20 border-b border-indigo-500/10" style={{ background: 'rgba(15,15,35,0.8)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-1)' }}>
              <Eye className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">AI Eye Detect</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {!user ? (
              <>
                <Link to="/login" className={`nav-link ${isActive('/login')}`}>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link to="/register" className={`nav-link ${isActive('/register')}`}>
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link to="/detection" className={`nav-link ${isActive('/detection')}`}>
                  <ScanEye className="w-4 h-4" />
                  <span className="hidden sm:inline">Detect</span>
                </Link>
                <Link to="/instructions" className={`nav-link ${isActive('/instructions')}`}>
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Guide</span>
                </Link>
                <Link to="/results" className={`nav-link ${isActive('/results')}`}>
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Results</span>
                </Link>
                <div className="flex items-center gap-3 ml-3 pl-3 border-l border-indigo-500/20">
                  <span className="text-sm text-slate-400 hidden md:block">Hi, {user.username}</span>
                  <button onClick={logout} className="nav-link text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
