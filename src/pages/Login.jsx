import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Zap, Shield, Cpu } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.email || !form.password) {
      setError('All fields are required')
      return
    }

    if (!form.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setTimeout(() => {
      login({ username: form.email.split('@')[0] || 'User', email: form.email })
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 500)
      setLoading(false)
    }, 1000)
  }

  const features = [
    { icon: <Cpu className="w-5 h-5" />, text: 'AI-Powered Detection' },
    { icon: <Shield className="w-5 h-5" />, text: 'Secure & Private' },
    { icon: <Zap className="w-5 h-5" />, text: 'Real-time Analysis' }
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md animate-slide-in-right">
          {/* Logo & Branding */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">EyeDetect AI</span>
            </div>
            <p className="text-slate-400 text-sm">Advanced eye detection technology</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to access your account and continue using our platform</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-sm animate-slide-up">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <span className="text-red-400 text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 backdrop-blur-sm animate-slide-up">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-green-400 text-sm font-medium">{success}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2.5">Email Address</label>
              <div className="relative group">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                <input
                  type="email"
                  className="input-field pl-4 pr-11"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-sm font-semibold text-slate-300">Password</label>
                <Link to="#" className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-4 pr-12"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  disabled={loading}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.rememberMe}
                onChange={e => setForm({ ...form, rememberMe: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 transition-colors cursor-pointer"
                disabled={loading}
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors font-medium">Keep me signed in</span>
            </label>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary w-full justify-center mt-8 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5 ml-1" /></>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 backdrop-blur-sm mb-6">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-300 leading-relaxed">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <p>Enter any email & password to test the platform</p>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Create one now
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Branding & Features */}
      <div className="hidden lg:flex flex-col items-start justify-center px-12 py-12 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl" />

        <div className="relative z-10 max-w-lg">
          {/* Main Heading */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-slate-100">Intelligent Eye</span>
              <br />
              <span className="gradient-text text-5xl">Detection Technology</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Experience advanced AI-powered eye detection that works in real-time to provide accurate and reliable results.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-12">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                  <div className="text-blue-400">{feature.icon}</div>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-slate-100 transition-colors">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-700/50">
            <div>
              <div className="text-2xl font-bold gradient-text mb-1">99.9%</div>
              <p className="text-xs text-slate-400 font-medium">Accuracy</p>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text mb-1">1M+</div>
              <p className="text-xs text-slate-400 font-medium">Detections</p>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text mb-1">24/7</div>
              <p className="text-xs text-slate-400 font-medium">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
