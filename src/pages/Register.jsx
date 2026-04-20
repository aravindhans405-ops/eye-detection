import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Zap, Shield, Cpu } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', agreeToTerms: false })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, label: '', color: '' }
    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    const levels = [
      { level: 0, label: '', color: '' },
      { level: 1, label: 'Weak', color: 'bg-red-500' },
      { level: 2, label: 'Fair', color: 'bg-yellow-500' },
      { level: 3, label: 'Good', color: 'bg-blue-500' },
      { level: 4, label: 'Strong', color: 'bg-green-500' },
      { level: 5, label: 'Very Strong', color: 'bg-green-600' }
    ]
    return levels[strength]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.username || !form.email || !form.password) {
      setError('All fields are required')
      return
    }
    if (form.username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (!form.agreeToTerms) {
      setError('Please agree to the Terms & Conditions')
      return
    }

    setLoading(true)
    setTimeout(() => {
      register({ username: form.username, email: form.email })
      setSuccess('Account created successfully! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 500)
      setLoading(false)
    }, 1000)
  }

  const passwordStrength = getPasswordStrength(form.password)

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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-teal-500">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-2">EyeDetect AI</span>
            </div>
            <p className="text-slate-400 text-sm">Advanced eye detection technology</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-slate-400">Join our platform and start detecting eye movements in real-time</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-sm animate-slide-up">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
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
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2.5">Username</label>
              <div className="relative group">
                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                <input
                  type="text"
                  className="input-field pl-4 pr-11"
                  placeholder="john_doe"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

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
              <label className="block text-sm font-semibold text-slate-300 mb-2.5">Password</label>
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

              {/* Password Strength Indicator */}
              {form.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Password Strength</span>
                    {passwordStrength.label && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${passwordStrength.color} text-white`}>
                        {passwordStrength.label}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= passwordStrength.level ? passwordStrength.color : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2.5">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input-field pl-4 pr-12"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  disabled={loading}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.confirmPassword && form.password === form.confirmPassword && (
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Passwords match
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={form.agreeToTerms}
                onChange={e => setForm({ ...form, agreeToTerms: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 transition-colors mt-1 flex-shrink-0 cursor-pointer"
                disabled={loading}
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                I agree to the <Link to="#" className="text-blue-400 hover:text-blue-300 font-medium">Terms & Conditions</Link> and <Link to="#" className="text-blue-400 hover:text-blue-300 font-medium">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary w-full justify-center mt-8 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading || !form.agreeToTerms}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5 ml-1" /></>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Branding & Features */}
      <div className="hidden lg:flex flex-col items-start justify-center px-12 py-12 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl" />

        <div className="relative z-10 max-w-lg">
          {/* Main Heading */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-slate-100">Join Our Community</span>
              <br />
              <span className="gradient-text-2 text-5xl">Start Detecting Today</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Get instant access to our advanced eye detection platform. No credit card required. Start detecting eye movements in seconds.
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

          {/* Testimonial Section */}
          <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-slate-300 italic mb-4 leading-relaxed">
              "The eye detection technology is incredibly accurate. Our team uses it daily for research and it hasn't let us down."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500" />
              <div>
                <p className="text-sm font-semibold text-slate-100">Sarah Johnson</p>
                <p className="text-xs text-slate-400">Research Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}