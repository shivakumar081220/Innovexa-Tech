import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useStore } from '../store/store'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isAdmin = location.pathname.startsWith('/admin')

  const links = isAdmin
    ? [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Project Requests', href: '/admin/project-requests' },
        { label: 'Portfolio', href: '/admin/portfolio' },
        { label: 'Reports', href: '/admin/reports' },
        { label: 'View Site', href: '/', external: true },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Get Project', href: '/project-form' },
      ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              IT
            </div>
            <span className="font-bold text-xl hidden sm:inline gradient-text dark:text-white">
              Innovexa Tech
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                target={link.external ? '_blank' : undefined}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                target={link.external ? '_blank' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
