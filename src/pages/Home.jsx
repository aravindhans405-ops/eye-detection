import React from 'react'
import { Link } from 'react-router-dom'
import { ScanEye, Activity, Brain, ArrowRight, ShieldCheck, Zap, ArrowDown, Eye, Github, Twitter, Linkedin } from 'lucide-react'

export default function Home() {
  const features = [
    { 
      icon: <ScanEye className="w-8 h-8" />, 
      title: 'Real-time Detection', 
      desc: 'Instant classification of wet & dry eye states using deep learning models.', 
      color: '#00D4AA' 
    },
    { 
      icon: <Brain className="w-8 h-8" />, 
      title: 'AI-Powered Analysis', 
      desc: 'Integrated LLMs generate medically actionable explanations of conditions.', 
      color: '#7F77DD' 
    },
    { 
      icon: <Activity className="w-8 h-8" />, 
      title: 'Movement Tracking', 
      desc: 'High-precision tracking of pupil positions and blink rates (EAR algorithm).', 
      color: '#f59e0b' 
    },
  ]

  return (
    <div className="w-full flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00D4AA]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7F77DD]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Content */}
            <div className="lg:w-1/2 z-10 animate-slide-up">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 mb-6 w-fit">
                <Zap className="w-4 h-4 text-[#00D4AA] animate-pulse" />
                <span className="text-sm text-[#00D4AA] font-semibold tracking-wide">Next-Gen Optical AI</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Protect Your <br/>
                <span className="text-gradient-teal">Vision with AI</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#9CA3AF] mb-8 max-w-lg leading-relaxed">
                Real-time eye health monitoring powered by deep learning and large language models. Track blink rates, detect fatigue, and analyze ocular conditions seamlessly through your webcam.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/detection" className="btn-primary py-3 px-6 sm:py-4 sm:px-8">
                  Start Detection <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/instructions" className="btn-outline py-3 px-6 sm:py-4 sm:px-8">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center z-10 animate-float">
              <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                {/* Outline rings */}
                <div className="absolute inset-4 rounded-full border border-[#2E3E56] border-dashed animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-12 rounded-full border border-[#00D4AA]/30 animate-[spin_20s_linear_infinite_reverse]" />
                
                {/* Center Eye SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-[#1B263B] shadow-[0_0_50px_rgba(0,212,170,0.2)] border border-[#00D4AA]/50 flex items-center justify-center overflow-hidden animate-pulse-teal">
                    <svg viewBox="0 0 200 120" className="w-48 h-32 relative z-10">
                      <path d="M10,60 Q100,0 190,60 Q100,120 10,60" fill="none" stroke="#00D4AA" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="100" cy="60" r="35" fill="rgba(127, 119, 221, 0.2)" stroke="#7F77DD" strokeWidth="3" />
                      <circle cx="100" cy="60" r="14" fill="#00D4AA" />
                      <circle cx="105" cy="55" r="5" fill="white" />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_white] animate-[vertical-sweep_4s_linear_infinite]" />
                  </div>
                </div>

                {/* floating badges */}
                <div className="absolute top-10 left-0 bg-[#0D1B2A] border border-[#7F77DD]/50 rounded-lg p-3 shadow-lg animate-float delay-100">
                  <span className="text-[#7F77DD] text-sm font-semibold">Scanning...</span>
                </div>
                <div className="absolute bottom-10 right-0 bg-[#0D1B2A] border border-[#00D4AA]/50 rounded-lg p-3 shadow-lg animate-float delay-300">
                  <span className="text-[#00D4AA] text-sm font-semibold">99.4% Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="w-full bg-[#1B263B] border-y border-[#2E3E56] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x divide-[#2E3E56]">
            {[
              { metric: '10K+', label: 'Active Users' },
              { metric: '99.2%', label: 'Detection Accuracy' },
              { metric: '< 50ms', label: 'Response Time' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 text-center hover:scale-105 transition-transform">
                <h3 className="text-3xl sm:text-4xl font-bold text-gradient-teal mb-2">{stat.metric}</h3>
                <p className="text-[#9CA3AF] font-medium text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Advanced Capabilities</h2>
            <p className="text-[#9CA3AF] text-base sm:text-lg max-w-3xl mx-auto">Our custom-tuned deep learning models are optimized for lightning-fast inference directly inside your browser.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feat, i) => (
              <div key={i} className="glass-card p-8 group animate-slide-up" style={{animationDelay: `${(i+1)*150}ms`}}>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${feat.color}20`, color: feat.color }}
                >
                  {feat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-[#9CA3AF] leading-relaxed text-sm sm:text-base">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full bg-[#1B263B]/50 py-20 lg:py-28 border-y border-[#2E3E56] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-[#9CA3AF] text-base sm:text-lg">Achieve professional-grade detection in 3 simple steps.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 relative">
            {/* Connecting line (Desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-[15%] w-[70%] h-[2px] bg-[#2E3E56] -z-10" />

            {[
              { step: '1', title: 'Mount & Grant Access', desc: 'Securely allow webcam access. No data leaves your device.', icon: <ScanEye className="w-8 h-8" /> },
              { step: '2', title: 'Optical Scan', desc: 'Our AI processes facial landmarks and tracks eye movement.', icon: <Activity className="w-8 h-8" /> },
              { step: '3', title: 'Get Insights', desc: 'Receive real-time EAR scores, blink rates, and LLM analysis.', icon: <Brain className="w-8 h-8" /> }
            ].map((st, i) => (
              <div key={i} className="flex flex-col items-center text-center w-full sm:max-w-sm relative group animate-slide-up" style={{animationDelay: `${(i+1)*200}ms`}}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0D1B2A] border-4 border-[#1B263B] flex items-center justify-center mb-6 group-hover:border-[#00D4AA] transition-colors relative shadow-2xl">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#7F77DD] text-white font-bold rounded-full flex items-center justify-center shadow-lg text-xs">
                    {st.step}
                  </div>
                  <div className="text-[#00D4AA] group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{st.title}</h3>
                <p className="text-[#9CA3AF] text-sm sm:text-base">{st.desc}</p>
                
                {i < 2 && (
                  <ArrowDown className="lg:hidden w-6 h-6 text-[#2E3E56] mt-6 opacity-50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#0D1B2A] border-t border-[#2E3E56] mt-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-teal flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#0D1B2A]" />
              </div>
              <span className="text-xl font-bold text-gradient-teal tracking-wide">VisionAI</span>
            </div>
            
            <div className="flex items-center gap-6 sm:gap-8 text-[#9CA3AF] text-xs sm:text-sm">
              <Link to="/instructions" className="hover:text-[#00D4AA] transition-colors">Documentation</Link>
              <Link to="#" className="hover:text-[#00D4AA] transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-[#00D4AA] transition-colors">Terms</Link>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1B263B] flex items-center justify-center text-[#9CA3AF] hover:bg-[#00D4AA] hover:text-[#0D1B2A] transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1B263B] flex items-center justify-center text-[#9CA3AF] hover:bg-[#00D4AA] hover:text-[#0D1B2A] transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#2E3E56] text-center text-[#9CA3AF] text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} VisionAI Eye Detection System. All rights reserved. Built for Kings Engineering College.
          </div>
        </div>
      </footer>
    </div>
  )
}
