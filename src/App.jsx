import React, { useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EyeDetection from './pages/EyeDetection'
import Instructions from './pages/Instructions'
import Results from './pages/Results'
import ParticlesBg from './components/ParticlesBg'

// Auth Context
export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

function App() {
  const [user, setUser] = useState(null)
  const [detectionResults, setDetectionResults] = useState(null)

  const login = (userData) => setUser(userData)
  const logout = () => {
    setUser(null)
    setDetectionResults(null)
  }
  const register = (userData) => setUser(userData)

  return (
    <AuthContext.Provider value={{ user, login, logout, register, detectionResults, setDetectionResults }}>
      <Router>
        <div className="min-h-screen relative">
          <ParticlesBg />
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/detection" element={user ? <EyeDetection /> : <Navigate to="/login" />} />
              <Route path="/instructions" element={user ? <Instructions /> : <Navigate to="/login" />} />
              <Route path="/results" element={user ? <Results /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
