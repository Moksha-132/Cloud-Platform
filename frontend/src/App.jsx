import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Dashboard from './pages/Dashboard'
import Share from './pages/Share'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotificationHandler from './components/NotificationHandler'

function App() {
  return (
    <Router>
      <NotificationHandler />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<Navigate to="/" />} />
        <Route path="/about" element={<Navigate to="/" />} />
        <Route path="/features" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/share/:token" element={<Share />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
