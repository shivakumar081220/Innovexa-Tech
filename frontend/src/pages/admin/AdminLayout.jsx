import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../../store/store'
import { Menu, X, LayoutDashboard, FileText, Settings, Book } from 'lucide-react'

const AdminLayout = () => {
  const sidebarOpen = useStore((state) => state.sidebarOpen)
  const toggleSidebar = useStore((state) => state.toggleSidebar)
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Project Requests', href: '/admin/project-requests', id: 'requests' },
    { icon: Settings, label: 'Portfolio', href: '/admin/portfolio', id: 'portfolio' },
    { icon: Book, label: 'Reports', href: '/admin/reports', id: 'reports' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed md:relative w-64 bg-dark text-white h-screen overflow-y-auto shadow-lg z-40"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
              IT
            </div>
            <span className="font-bold text-xl">Innovexa Admin</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  navigate(item.href)
                  if (window.innerWidth < 768) toggleSidebar()
                }}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-md p-4 flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </div>
  )
}

export default AdminLayout
