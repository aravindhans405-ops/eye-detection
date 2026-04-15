import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, ScanEye, Activity, Brain, Shield, MonitorSmartphone, Zap, ArrowRight, Stethoscope, Cpu, Waves } from 'lucide-react'

export default function Home() {
  const features = [
    { icon: <ScanEye className="w-8 h-8" />, title: 'Wet & Dry Eye Detection', desc: 'AI-powered classification of eye conditions using real-time webcam analysis and deep learning.' },
    { icon: <Activity className="w-8 h-8" />, title: 'Eyeball Movement Tracking', desc: 'Real-time tracking of iris position detecting left, right, up, down, and fixation patterns.' },
    { icon: <Brain className="w-8 h-8" />, title: 'LLM-Powered Insights', desc: 'Large Language Model generates medically meaningful explanations for detected conditions.' },
    { icon: <Eye className="w-8 h-8" />, title: 'Blink Detection & Counting', desc: 'Advanced blink rate monitoring using Eye Aspect Ratio analysis for fatigue detection.' },
    { icon: <Shield className="w-8 h-8" />, title: 'Non-Invasive Screening', desc: 'Cost-effective early screening using standard webcam — no specialized equipment needed.' },
    { icon: <MonitorSmartphone className="w-8 h-8" />, title: 'Web-Based Platform', desc: 'Accessible from any device through modern web browser with responsive design.' },
  ]

  const applications = [
    { icon: <Stethoscope className="w-6 h-6" />, title: 'Telemedicine', desc: 'Remote eye health screening' },
    { icon: <MonitorSmartphone className="w-6 h-6" />, title: 'Workplace Safety', desc: 'Employee fatigue detection' },
    { icon: <Cpu className="w-6 h-6" />, title: 'Assistive Tech', desc: 'Eye-based computer control' },
    { icon: <Waves className="w-6 h-6" />, title: 'Research', desc: 'Ocular movement studies' },
  ]

  return (
    <div className="page-container min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center flex-grow py-16 lg:py-24 px-4 overflow-hidden">
        <div className="content-wrapper">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-indigo-300">AI-Powered Eye Health Monitoring</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">Wet & Dry Eye</span>
                <br />
                <span className="text-white">Detection with</span>
                <br />
                <span className="gradient-text-2">Real-Time Tracking</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                An AI-powered system for detecting eye conditions and analysing eyeball movement 
                using Large Language Models, Deep Learning, and Computer Vision techniques.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn-secondary">
                  <Eye className="w-5 h-5" /> Sign In
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
                {[
                  { value: '95%+', label: 'Accuracy' },
                  { value: 'Real-Time', label: 'Detection' },
                  { value: 'AI + LLM', label: 'Powered' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative flex justify-center items-center animate-float w-full">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border-2 border-cyan-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                
                {/* Center eye */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full flex items-center justify-center animate-pulse-glow"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2), rgba(6,182,212,0.1))' }}>
                    <svg viewBox="0 0 200 120" className="w-40 h-24">
                      {/* Eye shape */}
                      <path d="M10,60 Q100,0 190,60 Q100,120 10,60" fill="none" stroke="rgba(99,102,241,0.6)" strokeWidth="2" />
                      {/* Iris */}
                      <circle cx="100" cy="60" r="30" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.8)" strokeWidth="2" />
                      {/* Pupil */}
                      <circle cx="100" cy="60" r="12" fill="rgba(15,15,35,0.9)" />
                      {/* Reflection */}
                      <circle cx="108" cy="52" r="5" fill="rgba(255,255,255,0.4)" />
                    </svg>
                  </div>
                </div>

                {/* Floating indicators */}
                {['Blink Rate', 'Iris Position', 'Tear Film', 'Movement'].map((label, i) => (
                  <div key={i}
                    className="absolute px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap"
                    style={{
                      background: 'rgba(26,26,62,0.92)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                      top: `${[10, 45, 80, 45][i]}%`,
                      left: `${[0, 80, 0, 80][i]}%`,
                      transform: `translate(${[-50, 20, -50, 20][i]}%, 0)`,
                      animation: `float ${5 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}>
                    <span className="text-cyan-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 sm:py-32 px-4 overflow-hidden" style={{ background: 'rgba(22,22,58,0.5)' }}>
        <div className="content-wrapper">
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">Key Features</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              Comprehensive eye health monitoring powered by cutting-edge AI and computer vision technology.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <div key={i} className="glass-card p-4 sm:p-6" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                  style={{ background: `linear-gradient(135deg, ${['#6366f1','#06b6d4','#8b5cf6','#10b981','#f59e0b','#ec4899'][i]}20, transparent)` }}>
                  <div style={{ color: ['#6366f1','#06b6d4','#8b5cf6','#10b981','#f59e0b','#ec4899'][i] }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-16 sm:py-20 px-4 overflow-hidden">
        <div className="content-wrapper">
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="gradient-text">How It Works</span>
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-6xl">
              {[
                { step: '01', title: 'Capture', desc: 'Webcam captures real-time eye images and video stream', icon: <ScanEye className="w-6 h-6" /> },
                { step: '02', title: 'Process', desc: 'AI preprocesses frames — noise reduction, contrast enhancement', icon: <Cpu className="w-6 h-6" /> },
                { step: '03', title: 'Analyze', desc: 'Deep learning classifies eye condition and tracks movement', icon: <Brain className="w-6 h-6" /> },
                { step: '04', title: 'Report', desc: 'LLM generates detailed explanations and recommendations', icon: <Activity className="w-6 h-6" /> },
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'var(--gradient-1)', opacity: 0.9 }}>
                    <span className="text-white">{item.icon}</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-400 mb-2">STEP {item.step}</div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-6 sm:top-8 -right-3 lg:-right-4 w-8">
                      <ArrowRight className="w-6 h-6 text-indigo-500/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="w-full py-16 sm:py-20 px-4 overflow-hidden" style={{ background: 'rgba(22,22,58,0.5)' }}>
        <div className="content-wrapper">
          <div className="text-center mb-8 sm:mb-12 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="gradient-text-2">Applications</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
              {applications.map((app, i) => (
                <div key={i} className="glass-card p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.15)' }}>
                    <span className="text-indigo-400">{app.icon}</span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{app.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 sm:py-20 px-4 overflow-hidden">
        <div className="content-wrapper max-w-3xl">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to <span className="gradient-text">Monitor Your Eye Health</span>?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">
              Start using our AI-powered eye detection system for free. No specialized equipment required.
            </p>
            <Link to="/register" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Start Detection Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-indigo-500/10 py-6 sm:py-8 px-4 overflow-hidden">
        <div className="content-wrapper">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              <span className="text-xs sm:text-sm text-slate-400">AI Eye Detection System © 2026</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-500 text-center sm:text-right">
              Kings Engineering College — Biomedical Engineering Department
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
