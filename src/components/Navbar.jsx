import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import { Eye, Home, LogIn, UserPlus, LayoutDashboard, ScanEye, BookOpen, BarChart3, LogOut } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0D1B2A]/90 backdrop-blur-md border-b border-[#00D4AA]/20 shadow-lg shadow-[#00D4AA]/5' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-teal group-hover:shadow-[0_0_15px_rgba(0,212,170,0.5)] transition-all duration-300">
              <Eye className="w-7 h-7 text-[#0D1B2A]" />
            </div>
            <span className="text-xl font-bold text-gradient-teal hidden sm:block tracking-wide">VisionAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link to="/" className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${isActive('/') ? 'text-[#00D4AA] bg-[#00D4AA]/10' : 'text-[#9CA3AF] hover:text-[#00D4AA] hover:bg-[#00D4AA]/5'}`}>
              <Home className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Home</span>
            </Link>

            {!user ? (
              <>
                <Link to="/login" className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${isActive('/login') ? 'text-[#00D4AA] bg-[#00D4AA]/10' : 'text-[#9CA3AF] hover:text-[#00D4AA] hover:bg-[#00D4AA]/5'}`}>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden md:inline font-medium">Login</span>
                </Link>
                <Link to="/register" className="ml-2 btn-primary animate-pulse-teal">
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden md:inline">Start Free</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${isActive('/dashboard') ? 'text-[#00D4AA] bg-[#00D4AA]/10' : 'text-[#9CA3AF] hover:text-[#00D4AA] hover:bg-[#00D4AA]/5'}`}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden md:inline font-medium">Dashboard</span>
                </Link>
                <Link to="/detection" className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${isActive('/detection') ? 'text-[#00D4AA] bg-[#00D4AA]/10' : 'text-[#9CA3AF] hover:text-[#00D4AA] hover:bg-[#00D4AA]/5'}`}>
                  <ScanEye className="w-4 h-4" />
                  <span className="hidden md:inline font-medium">Detect</span>
                </Link>
                <Link to="/instructions" className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${isActive('/instructions') ? 'text-[#00D4AA] bg-[#00D4AA]/10' : 'text-[#9CA3AF] hover:text-[#00D4AA] hover:bg-[#00D4AA]/5'}`}>
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden md:inline font-medium">Guide</span>
                </Link>
                <Link to="/results" className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${isActive('/results') ? 'text-[#00D4AA] bg-[#00D4AA]/10' : 'text-[#9CA3AF] hover:text-[#00D4AA] hover:bg-[#00D4AA]/5'}`}>
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden md:inline font-medium">Results</span>
                </Link>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#2E3E56]">
                  <span className="text-sm text-[#7F77DD] font-medium hidden lg:block">Hi, {user.username}</span>
                  <button onClick={logout} className="px-3 py-2 rounded-lg text-[#ef4444] hover:bg-[#ef4444]/10 transition-all duration-200 flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
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
