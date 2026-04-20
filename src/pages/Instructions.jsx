import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ChevronRight, ChevronLeft, Check, CheckCircle2, 
  AlertTriangle, Lightbulb, Info, HelpCircle, ThumbsUp, ThumbsDown,
  Camera, Play, FileText, Brain, BookOpen
} from 'lucide-react'

// Subcomponents for Guide elements
const Callout = ({ type, title, children }) => {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-100',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-100',
    tip: 'bg-[#00D4AA]/10 border-[#00D4AA]/30 text-[#00D4AA]'
  }
  const icons = {
    info: <Info className="w-5 h-5 text-blue-400 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />,
    tip: <Lightbulb className="w-5 h-5 text-[#00D4AA] mt-0.5" />
  }

  return (
    <div className={`p-4 rounded-xl border flex gap-4 my-6 ${styles[type]}`}>
      <div className="flex-shrink-0">{icons[type]}</div>
      <div>
        {title && <h3 className="font-bold mb-1">{title}</h3>}
        <div className="text-[16px] leading-[1.8] opacity-90">{children}</div>
      </div>
    </div>
  )
}

const FeedbackWidget = () => {
  const [voted, setVoted] = useState(null)
  if (voted) return <div className="text-sm text-[#00D4AA] font-bold mt-8 flex items-center gap-2"><Check className="w-4 h-4"/> Thank you for your feedback!</div>
  return (
    <div className="mt-8 flex items-center gap-4 py-4 border-t border-[#2E3E56]">
      <span className="text-sm text-[#9CA3AF] font-bold">Was this section helpful?</span>
      <button onClick={() => setVoted('up')} className="p-2 rounded-lg bg-[#1B263B] text-[#9CA3AF] hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-colors"><ThumbsUp className="w-4 h-4" /></button>
      <button onClick={() => setVoted('down')} className="p-2 rounded-lg bg-[#1B263B] text-[#9CA3AF] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"><ThumbsDown className="w-4 h-4" /></button>
    </div>
  )
}

const FAQAccordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#2E3E56] rounded-xl mb-4 bg-[#0D1B2A] overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center justify-between text-left hover:bg-[#1B263B] transition-colors">
        <span className="font-bold text-white text-[16px]">{question}</span>
        <ChevronRight className={`w-5 h-5 text-[#00D4AA] transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div className="p-4 pt-1 border-t border-[#2E3E56] text-[#9CA3AF] text-[16px] leading-[1.8]">{answer}</div>}
    </div>
  )
}

export default function Instructions() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeSection, setActiveSection] = useState('stepper') // 'stepper', 'faq', 'disclaimer'

  const steps = [
    {
      id: 'setup',
      title: 'Setup & Positioning',
      icon: <Camera className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-[22px] font-bold text-white mb-4">Step 1: Environmental Setup</h2>
          <p className="text-[16px] leading-[1.8] text-[#9CA3AF]">Before initiating the detection sequence, ensure your physical environment is optimized for the optical sensors. Our deep learning models require clear visibility of your facial landmarks.</p>
          
          <Callout type="warning" title="Lighting is Critical">
            Avoid strong backlighting (sitting with a window behind you). Ensure the light source is in front of you, illuminating your face evenly without casting harsh shadows on your eyes.
          </Callout>

          <ul className="list-disc pl-5 mt-4 space-y-2 text-[16px] leading-[1.8] text-[#9CA3AF]">
            <li>Position yourself 30-50cm from the webcam.</li>
            <li>Remove glasses or heavily tinted lenses if possible.</li>
            <li>Maintain a neutral head position facing directly at the camera.</li>
          </ul>
          <FeedbackWidget />
        </div>
      )
    },
    {
      id: 'detection',
      title: 'Start Detection',
      icon: <Play className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-[22px] font-bold text-white mb-4">Step 2: Running the Scan</h2>
          <p className="text-[16px] leading-[1.8] text-[#9CA3AF]">The core detection protocol lasts for exactly 30 seconds. During this window, the system captures localized EAR (Eye Aspect Ratio) values to determine your ocular state.</p>
          
          <Callout type="tip" title="Blink Naturally">
            Do not force yourself to stare or blink unnaturally. The AI is calibrated against standard human baseline rates (15-20 blinks per minute). Altering your behavior will skew the results.
          </Callout>

          <div className="bg-[#1B263B] p-4 rounded-xl border border-[#2E3E56] my-4">
            <h3 className="text-white font-bold mb-2">What you will see in the HUD:</h3>
            <ul className="space-y-2 text-[16px] leading-[1.8] text-[#9CA3AF]">
              <li><strong className="text-[#00D4AA]">Confidence Bar:</strong> Real-time neural network certainty limit.</li>
              <li><strong className="text-[#00D4AA]">Terminal Output:</strong> Live tracking of EAR values and coordinate vectors.</li>
            </ul>
          </div>
          <FeedbackWidget />
        </div>
      )
    },
    {
      id: 'results',
      title: 'Read Results',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-[22px] font-bold text-white mb-4">Step 3: Reviewing Metrics</h2>
          <p className="text-[16px] leading-[1.8] text-[#9CA3AF]">Once the 30-second timer completes, you will be redirected to the Results dashboard. This comprehensive view translates raw tracking data into actionable insights.</p>
          
          <Callout type="info" title="Understanding EAR">
            EAR (Eye Aspect Ratio) measures the ratio of distances between facial landmarks on the eyes. A sharp drop in EAR indicates a blink. Sustained low EAR indicates fatigue or micro-sleep.
          </Callout>
          
          <FeedbackWidget />
        </div>
      )
    },
    {
      id: 'ai',
      title: 'Interpret AI',
      icon: <Brain className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-[22px] font-bold text-white mb-4">Step 4: LLM Analysis</h2>
          <p className="text-[16px] leading-[1.8] text-[#9CA3AF]">Our system passes your aggregate metrics to an integrated Large Language Model (Puter.js) to generate a summarized medical assessment.</p>
          
          <p className="text-[16px] leading-[1.8] text-[#9CA3AF] mt-4">
            The AI considers your total blink count, condition classification (Wet/Dry), and vector tracking patterns to formulate personalized recommendations. If the AI detects severe abnormalities (e.g., extremely low blink rates indicating severe dry eye), it will flag the report for professional review.
          </p>
          
          <FeedbackWidget />
        </div>
      )
    }
  ]

  const faqs = [
    { q: "Is my video data stored on your servers?", a: "No. All video processing and frame analysis occurs locally in your browser leveraging WebAssembly and client-side scripts. No image data ever leaves your device." },
    { q: "Can I use this on my mobile phone?", a: "Yes, the system is fully responsive. Ensure your mobile browser has permission to access the front-facing camera." },
    { q: "What is considered a 'normal' blink rate?", a: "A healthy human blink rate usually falls between 15 and 20 blinks per minute. Rates significantly below this while focusing on screens can contribute to dry eye condition." }
  ]

  return (
    <div className="w-full flex flex-col flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Mobile Tab Nav (hidden on desktop) */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-hide border-b border-[#2E3E56]">
          {['stepper', 'faq', 'disclaimer'].map(sec => (
            <button key={sec} onClick={() => setActiveSection(sec)} 
              className={`px-4 py-2 font-bold whitespace-nowrap rounded-t-lg transition-colors ${activeSection === sec ? 'text-[#00D4AA] bg-[#1B263B] border-b-2 border-[#00D4AA]' : 'text-[#9CA3AF] hover:text-white'}`}>
              {sec.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Desktop + Mobile Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative">
          
          {/* Desktop Sticky TOC Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 bg-[#0D1B2A] border border-[#2E3E56] rounded-xl p-6 shadow-lg animate-slide-up">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#00D4AA]"/> Contents
            </h3>
            <nav className="flex flex-col gap-3">
              <button onClick={() => {setActiveSection('stepper'); window.scrollTo({top:0, behavior:'smooth'})}} 
                className={`text-left px-4 py-2 rounded-lg transition-colors font-semibold text-sm ${activeSection === 'stepper' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'text-[#9CA3AF] hover:text-white hover:bg-[#1B263B]'}`}>
                Interactive Guide
              </button>
              <button onClick={() => {setActiveSection('faq'); document.getElementById('faq-section')?.scrollIntoView({behavior:'smooth'})}} 
                className={`text-left px-4 py-2 rounded-lg transition-colors font-semibold text-sm ${activeSection === 'faq' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'text-[#9CA3AF] hover:text-white hover:bg-[#1B263B]'}`}>
                FAQ
              </button>
              <button onClick={() => {setActiveSection('disclaimer'); document.getElementById('disclaimer-section')?.scrollIntoView({behavior:'smooth'})}} 
                className={`text-left px-4 py-2 rounded-lg transition-colors font-semibold text-sm ${activeSection === 'disclaimer' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'text-[#9CA3AF] hover:text-white hover:bg-[#1B263B]'}`}>
                Medical Disclaimer
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            
            {/* Header */}
            <div className="mb-10 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white mb-3">Platform Documentation</h1>
              <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">Comprehensive guide to utilizing the optical health screening tools effectively.</p>
            </div>
            
            {/* INTERACTIVE STEPPER */}
            <div id="guide-section" className={`glass-card p-6 sm:p-8 mb-14 ${activeSection !== 'stepper' && 'lg:block hidden'} animate-slide-up`}>
              
              {/* Progress Bar Header */}
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex gap-2">
                  {steps.map((s, i) => (
                    <div key={s.id} className="flex-1 flex flex-col gap-3" onClick={() => setActiveStep(i)} role="button">
                      <div className={`h-2 rounded-full transition-colors ${i <= activeStep ? 'bg-[#00D4AA] shadow-[0_0_10px_rgba(0,212,170,0.4)]' : 'bg-[#2E3E56]'}`} />
                      <span className={`text-xs font-bold uppercase text-center ${i <= activeStep ? 'text-[#00D4AA]' : 'text-[#9CA3AF]'}`}>
                        {i < activeStep && <CheckCircle2 className="w-3 h-3 inline mr-1"/>} 
                        Step {i+1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[350px] mb-10 animate-fade-in">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D4AA] to-[#7F77DD] flex items-center justify-center shadow-lg text-[#0D1B2A] text-[#0D1B2A] flex-shrink-0">
                    {steps[activeStep].icon}
                  </div>
                  <div className="text-sm font-bold text-[#7F77DD] tracking-widest uppercase">Phase {activeStep + 1} of 4</div>
                </div>
                {steps[activeStep].content}
              </div>

              {/* Next/Back Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 border-t border-[#2E3E56]">
                <button 
                  onClick={() => setActiveStep(p => Math.max(0, p - 1))}
                  disabled={activeStep === 0}
                  className="order-2 sm:order-1 btn-outline border-none text-[#9CA3AF] hover:text-white disabled:opacity-30 px-6 py-3 sm:p-0 rounded-lg sm:rounded-none"
                >
                  <ChevronLeft className="w-5 h-5 inline mr-1"/> Previous
                </button>
                
                {activeStep < steps.length - 1 ? (
                  <button onClick={() => setActiveStep(p => Math.min(steps.length - 1, p + 1))} className="order-1 sm:order-2 btn-primary py-3 sm:py-2 rounded-lg sm:rounded">
                    Next Step <ChevronRight className="w-5 h-5 ml-1"/>
                  </button>
                ) : (
                  <Link to="/detection" className="order-1 sm:order-2 btn-primary bg-[#7F77DD] hover:bg-[#6c64ce] py-3 sm:py-2 rounded-lg sm:rounded text-center">
                    Start Scanning <Play className="w-5 h-5 ml-1"/>
                  </Link>
                )}
              </div>
            </div>

            {/* FAQ SECTION */}
            <div id="faq-section" className={`mb-14 ${activeSection !== 'faq' && 'lg:block hidden'} animate-slide-up`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-[#7F77DD] flex-shrink-0" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((f, i) => <FAQAccordion key={i} question={f.q} answer={f.a} />)}
              </div>
            </div>

            {/* MEDICAL DISCLAIMER */}
            <div id="disclaimer-section" className={`mb-12 ${activeSection !== 'disclaimer' && 'lg:block hidden'} animate-slide-up`}>
              <Callout type="warning" title="Medical Disclaimer">
                This application is designed strictly for screening and informational purposes. The AI analysis and optical metrics provided do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of an ophthalmologist, optometrist, or other qualified health provider with any questions regarding a medical eye condition. Never disregard professional medical advice due to information obtained from this software.
              </Callout>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
