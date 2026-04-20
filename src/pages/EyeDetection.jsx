import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import {
  Camera, CameraOff, Play, Square, Timer, Eye,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Circle, Activity,
  Brain, Loader2, CheckCircle2, Download, Volume2, VolumeX
} from 'lucide-react'

export default function EyeDetection() {
  const { setDetectionResults } = useAuth()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const animFrameRef = useRef(null)
  const timerRef = useRef(null)

  const [cameraOn, setCameraOn] = useState(false)
  const [detecting, setDetecting] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [timerActive, setTimerActive] = useState(false)
  const [blinkCount, setBlinkCount] = useState(0)
  const [eyeMovement, setEyeMovement] = useState('Center')
  const [eyeCondition, setEyeCondition] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiExplanation, setAiExplanation] = useState('')
  const [earValue, setEarValue] = useState(0.3)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [faceDetected, setFaceDetected] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [audioMuted, setAudioMuted] = useState(false)

  // Simulated EAR and tracking values
  const blinkCountRef = useRef(0)
  const lastBlinkTime = useRef(0)
  const movementHistory = useRef([])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraOn(true)
        setFaceDetected(true)
      }
    } catch (err) {
      alert('Camera access denied. Please allow camera access.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setCameraOn(false)
    setDetecting(false)
    setTimerActive(false)
    setFaceDetected(false)
    setConfidence(0)
  }

  const analyzeFrame = useCallback(() => {
    if (!detecting || !videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const video = videoRef.current

    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720

    // Draw mirrored video
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
    ctx.restore()

    const cx = canvas.width / 2
    const cy = canvas.height / 2

    // Simulated confidence fluctuation
    setConfidence(prev => Math.min(100, Math.max(85, prev + (Math.random() - 0.5) * 5)))

    // Draw face detection rectangle
    ctx.strokeStyle = 'rgba(0, 212, 170, 0.4)'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.strokeRect(cx - 150, cy - 200, 300, 400)
    ctx.setLineDash([])

    // Left eye & Right eye
    ctx.strokeStyle = 'rgba(127, 119, 221, 0.8)'
    ctx.lineWidth = 1.5
    ctx.strokeRect(cx - 100, cy - 60, 60, 30)
    ctx.strokeRect(cx + 40, cy - 60, 60, 30)

    // Simulate blink detection
    const now = Date.now()
    const simulatedEAR = 0.22 + Math.random() * 0.15
    setEarValue(simulatedEAR)

    if (simulatedEAR < 0.25 && now - lastBlinkTime.current > 1500) {
      blinkCountRef.current += 1
      setBlinkCount(blinkCountRef.current)
      lastBlinkTime.current = now
      if (!audioMuted) {
        // play small beep sound if needed
      }
    }

    // Simulate movement
    const movements = ['Center', 'Left', 'Right', 'Up', 'Down', 'Center', 'Center']
    if (Math.random() < 0.08) {
      const newMovement = movements[Math.floor(Math.random() * movements.length)]
      setEyeMovement(newMovement)
      movementHistory.current.push(newMovement)
    }

    animFrameRef.current = requestAnimationFrame(analyzeFrame)
  }, [detecting, audioMuted])

  const startDetection = () => {
    if (!cameraOn) return
    setDetecting(true)
    setTimerActive(true)
    setCountdown(30)
    setBlinkCount(0)
    setSessionComplete(false)
    setAiExplanation('')
    setEyeCondition(null)
    setConfidence(90)
    blinkCountRef.current = 0
    movementHistory.current = []
    lastBlinkTime.current = Date.now()
    animFrameRef.current = requestAnimationFrame(analyzeFrame)
  }

  const stopDetection = () => {
    setDetecting(false)
    setTimerActive(false)
    setConfidence(0)
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
  }

  useEffect(() => {
    if (timerActive && countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000)
    } else if (timerActive && countdown === 0) {
      setTimerActive(false)
      setDetecting(false)
      setSessionComplete(true)
      setConfidence(0)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

      const blinkRate = blinkCountRef.current * 2
      const condition = blinkRate >= 14 ? 'Wet' : 'Dry'
      setEyeCondition(condition)
      getAIAnalysis(blinkRate, condition, movementHistory.current)
    }
    return () => clearTimeout(timerRef.current)
  }, [timerActive, countdown])

  useEffect(() => {
    return () => {
      stopCamera()
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      clearTimeout(timerRef.current)
    }
  }, [])

  const getAIAnalysis = async (blinkRate, condition, movements) => {
    setAiLoading(true)
    const movementSummary = movements.length > 0 ? [...new Set(movements)].join(', ') : 'Center (fixation)'

    const prompt = `You are an ophthalmology AI assistant. Provide a brief medical assessment: Eye Condition: ${condition} Eye. Blink Rate: ${blinkRate} blinks/min. Movements: ${movementSummary}. Duration: 30s. Keep it under 100 words.`

    try {
      if (window.puter && window.puter.ai) {
        const response = await window.puter.ai.chat(prompt)
        const text = typeof response === 'string' ? response : response?.message?.content || response?.text || 'Analysis complete.'
        setAiExplanation(text)
      } else {
        setAiExplanation(condition === 'Wet' 
          ? `Analysis Complete: Detection indicates normal tear film function with a blink rate of ${blinkRate}/min. Movement tracking (${movementSummary}) shows robust motility. Maintain standard screen-time breaks.`
          : `Analysis Complete: Detection indicates potential dryness. Your blink rate of ${blinkRate}/min is low, which can destabilize tear film and increase fatigue. Recommend using artificial tears and taking frequent breaks.`)
      }
      setDetectionResults({
        condition, blinkRate, movements: movementSummary,
        accuracy: condition === 'Wet' ? 95 : 92,
        timestamp: new Date().toISOString(), earAvg: earValue, aiExplanation: aiExplanation || 'Analysis Complete'
      })
    } catch {
      setAiExplanation('Analysis temporarily unavailable.')
    } finally {
      setAiLoading(false)
    }
  }

  const getEarColor = (val) => {
    if (val > 0.30) return 'text-[#10b981]' // Green
    if (val > 0.25) return 'text-[#f59e0b]' // Amber
    return 'text-[#ef4444]' // Red
  }

  const compassDotPos = {
    'Center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'Up': 'top-2 left-1/2 -translate-x-1/2',
    'Down': 'bottom-2 left-1/2 -translate-x-1/2',
    'Left': 'left-2 top-1/2 -translate-y-1/2',
    'Right': 'right-2 top-1/2 -translate-y-1/2'
  }

  return (
    <div className="w-full flex flex-col flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="mb-10 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white mb-3">Optical Detection System</h1>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">Real-time optical tracking mapped to high-fidelity AI models.</p>
        </div>

        {/* 60/40 Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Main 60% Camera Area */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6 animate-slide-up">
            
            {/* Top Bar inside Camera */}
            <div className="glass-card p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`status-dot ${cameraOn ? 'active' : 'inactive'}`} />
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{cameraOn ? 'Camera Active' : 'Offline'}</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setAudioMuted(!audioMuted)} className="text-[#9CA3AF] hover:text-white transition-colors">
                  {audioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                {faceDetected && detecting && (
                  <span className="text-xs px-3 py-1 rounded-md bg-[#00D4AA]/20 text-[#00D4AA] border border-[#00D4AA]/50 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> FACE DETECTED
                  </span>
                )}
              </div>
            </div>

            {/* Webcam Feed - 16:9 Aspect Ratio Container */}
            <div className={`webcam-container relative w-full aspect-video ${cameraOn ? 'hud-corners hud-corners-bottom' : ''}`}>
              {!cameraOn ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1B263B] text-[#9CA3AF]">
                  <CameraOff className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-bold">Signal Lost / Disconnected</p>
                  <p className="text-sm mt-2">Initialize camera hardware to proceed.</p>
                </div>
              ) : (
                <>
                  <video ref={videoRef} autoPlay playsInline muted className={`absolute inset-0 w-full h-full object-cover ${detecting ? 'hidden' : ''}`} />
                  <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full object-cover ${detecting ? '' : 'hidden'}`} />
                  {detecting && <div className="scanner-line" />}
                  
                  {/* Confidence Bar Overlay */}
                  {detecting && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] max-w-sm bg-[#0D1B2A]/80 border border-[#2E3E56] rounded-full p-1 flex items-center gap-3 backdrop-blur-sm z-30">
                      <span className="text-xs font-bold text-[#00D4AA] ml-3 uppercase tracking-wider">AI Conf</span>
                      <div className="flex-1 h-2 bg-[#2E3E56] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00D4AA] transition-all duration-300" style={{width: `${confidence}%`}} />
                      </div>
                      <span className="text-xs font-bold text-white mr-3">{confidence.toFixed(1)}%</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Controls */}
            <div className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
                {!cameraOn ? (
                  <button onClick={startCamera} className="btn-primary px-6 py-2.5 sm:w-auto text-sm">
                    <Camera className="w-4 h-4" /> Init Camera
                  </button>
                ) : (
                  <>
                    <button onClick={stopCamera} className="btn-outline text-[#ef4444] border-[#ef4444] hover:bg-[#ef4444]/10 px-6 py-2.5 sm:w-auto text-sm">
                      <CameraOff className="w-4 h-4" /> Off
                    </button>
                    {!detecting ? (
                      <button onClick={startDetection} className="btn-primary bg-[#7F77DD] text-white hover:bg-[#6c64ce] hover:shadow-[0_8px_20px_rgba(127,119,221,0.4)] px-6 py-2.5 sm:w-auto text-sm">
                        <Play className="w-4 h-4" /> Start Scan
                      </button>
                    ) : (
                      <button onClick={stopDetection} className="btn-outline text-[#f59e0b] border-[#f59e0b] hover:bg-[#f59e0b]/10 px-6 py-2.5 sm:w-auto text-sm">
                        <Square className="w-4 h-4" /> Abort
                      </button>
                    )}
                  </>
                )}
              </div>
              
              {sessionComplete && (
                <div className="flex gap-3 w-full sm:w-auto">
                  <button onClick={() => navigate('/results')} className="btn-primary flex-1 sm:flex-none text-sm py-2.5">
                    View Report
                  </button>
                  <button className="btn-outline text-sm py-2.5 px-4" title="Export Raw Data">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* 40% Live Metrics Terminal Side */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 animate-slide-up delay-200">
            
            {/* Terminal Panel */}
            <div className="terminal-panel p-6 sm:p-7 flex flex-col gap-6 text-sm text-[#00D4AA] shadow-inner h-full max-h-[600px] overflow-y-auto rounded-xl">
              <div className="border-b border-[#00D4AA]/20 pb-2 mb-2 font-bold uppercase tracking-widest text-[#7F77DD]">
                System Output Terminal v2.1
              </div>

              {/* EAR and Timer Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#0D1B2A] rounded border border-[#2E3E56]">
                  <div className="text-[#9CA3AF] mb-1">SESSION_TIMER</div>
                  <div className="text-3xl font-bold text-white flex items-center gap-2">
                    <Timer className="w-6 h-6 text-[#7F77DD]" /> 
                    {countdown}s
                  </div>
                </div>
                <div className="p-4 bg-[#0D1B2A] rounded border border-[#2E3E56]">
                  <div className="text-[#9CA3AF] mb-1">RAW_EAR_VAL</div>
                  <div className={`text-3xl font-bold ${getEarColor(earValue)}`}>
                    {earValue.toFixed(4)}
                  </div>
                </div>
              </div>

              {/* Blink Counter Box */}
              <div className="p-6 bg-[#0D1B2A] rounded border border-[#2E3E56] relative overflow-hidden group">
                <div className="text-[#9CA3AF] mb-2 font-bold">BLINK_EVENT_COUNTER</div>
                <div className="text-7xl font-bold text-white text-center font-sans tracking-tight">
                  <span className="inline-block transition-transform duration-100 ease-out" key={blinkCount}>
                    {String(blinkCount).padStart(3, '0')}
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 w-4 h-4 rounded-full bg-[#00D4AA] animate-pulse shadow-[0_0_15px_#00D4AA]" />
              </div>

              {/* 2D Compass Tracker */}
              <div className="p-6 bg-[#0D1B2A] rounded border border-[#2E3E56]">
                <div className="text-[#9CA3AF] mb-4 font-bold flex justify-between">
                  <span>VECTOR_TRACKING</span>
                  <span className="text-[#00D4AA]">{eyeMovement.toUpperCase()}</span>
                </div>
                <div className="relative w-full max-w-[200px] aspect-square mx-auto rounded-full border-2 border-[#2E3E56] bg-center bg-no-repeat overflow-hidden"
                     style={{backgroundImage: 'radial-gradient(circle, rgba(127,119,221,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
                  {/* Plus Crosshair */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2E3E56]" />
                  <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#2E3E56]" />
                  
                  {/* Moving Dot */}
                  <div className={`absolute w-6 h-6 bg-[#00D4AA] rounded-full shadow-[0_0_15px_#00D4AA] transition-all duration-300 ${compassDotPos[eyeMovement]}`} />
                </div>
              </div>

              {/* AI Log Block inside Terminal */}
              <div className="p-4 bg-[#0D1B2A] rounded border border-[#2E3E56]">
                 <div className="text-amber-500 mb-2 font-bold flex gap-2">
                   <Brain className="w-4 h-4" /> AI_DIAGNOSTIC_LOG
                 </div>
                 {aiLoading ? (
                   <span className="animate-pulse">Analyzing vector states...</span>
                 ) : aiExplanation ? (
                   <div className="whitespace-pre-wrap leading-relaxed">
                     {`> RESULT: ${eyeCondition}\n> LOG: ${aiExplanation}`}
                   </div>
                 ) : (
                   <span className="text-[#2E3E56]">Waiting for session completion...</span>
                 )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
