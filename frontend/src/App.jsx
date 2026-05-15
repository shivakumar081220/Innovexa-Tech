import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useStore } from './store/store'

// User Pages
import Home from './pages/user/Home'
import Portfolio from './pages/user/Portfolio'
import ProjectForm from './pages/user/ProjectForm'

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import ProjectRequests from './pages/admin/ProjectRequests'
import PortfolioManagement from './pages/admin/PortfolioManagement'
import ReportsManagement from './pages/admin/ReportsManagement'

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/project-form/:domain?" element={<ProjectForm />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="project-requests" element={<ProjectRequests />} />
            <Route path="portfolio" element={<PortfolioManagement />} />
            <Route path="reports" element={<ReportsManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </div>
  )
}

export default App
