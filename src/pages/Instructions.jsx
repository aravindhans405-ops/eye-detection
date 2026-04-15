import React from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, CheckCircle2, AlertCircle, Camera, 
  Lightbulb, User, ShieldCheck, ArrowRight, Home 
} from 'lucide-react'

export default function Instructions() {
  const steps = [
    {
      icon: <User className="w-6 h-6 text-indigo-400" />,
      title: "Positioning",
      desc: "Sit comfortably in front of your computer. Ensure your face is centered within the camera frame, approximately 30-50cm away."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      title: "Lighting",
      desc: "Ensure your face is well-lit. Avoid strong backlighting or shadows on your eyes, as this may affect detection accuracy."
    },
    {
      icon: <Camera className="w-6 h-6 text-cyan-400" />,
      title: "Testing Process",
      desc: "The test lasts for 30 seconds. During this time, look naturally at the screen and follow any on-screen movement prompts."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
      title: "Privacy",
      desc: "All processing happens locally in your browser. No video data is ever sent to our servers or stored permanently."
    }
  ]

  const tips = [
    "Don't wear glasses or tinted lenses if possible for maximum accuracy.",
    "Keep your head relatively still during the 30-second measurement.",
    "Blink naturally — do not force or suppress blinks.",
    "Ensure your hair or other objects aren't obscuring your eyes."
  ]

  return (
    <div className="page-container min-h-[calc(100vh-64px)]">
      <div className="content-wrapper max-w-4xl w-full py-12 overflow-hidden">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            <span>User Preparation Guide</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            How to Use <span className="gradient-text">AI Eye Detect</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Follow these simple steps and tips to ensure the most accurate detection of your eye condition and movement tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="glass-card p-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(15,15,35,0.6)' }}>
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Best Practices for Accuracy</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-3 text-sm text-slate-300">
                <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Link to="/detection" className="btn-primary w-full sm:w-auto px-8 py-3">
            Go to Detection <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/dashboard" className="btn-secondary w-full sm:w-auto px-8 py-3">
            <Home className="w-5 h-5" /> Back to Dashboard
          </Link>
        </div>

        <div className="mt-12 p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-3 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-300 leading-relaxed">
            <strong>Disclaimer:</strong> This tool is for screening and informational purposes only. It does not provide a formal medical diagnosis. 
            If you are experiencing severe eye discomfort, vision loss, or persistent irritation, please consult a qualified healthcare professional immediately.
          </p>
        </div>
      </div>
    </div>
  )
}
