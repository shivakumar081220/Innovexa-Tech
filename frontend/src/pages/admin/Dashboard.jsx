import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { dashboardService, userRequestsService, projectsService } from '../../services/api'
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [recentInquiries, setRecentInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, projectRes, inquiriesRes] = await Promise.all([
        dashboardService.getStats(),
        projectsService.getAllProjects(),
        userRequestsService.getRequests(),
      ])

      setStats({
        totalRequests: inquiriesRes.data.length,
        completedProjects: projectRes.data.length,
        pendingRequests: inquiriesRes.data.filter((r) => r.status === 'Pending').length,
        satisfactionRate: 99,
      })

      setRecentInquiries(inquiriesRes.data.slice(0, 5))
    } catch (error) {
      toast.error('Error loading dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card p-6 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-4xl text-opacity-20" />
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Requests"
          value={stats?.totalRequests || 0}
          color="bg-blue-50"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed Projects"
          value={stats?.completedProjects || 0}
          color="bg-green-50"
        />
        <StatCard
          icon={Clock}
          label="Pending Requests"
          value={stats?.pendingRequests || 0}
          color="bg-yellow-50"
        />
        <StatCard
          icon={TrendingUp}
          label="Satisfaction Rate"
          value={`${stats?.satisfactionRate || 0}%`}
          color="bg-purple-50"
        />
      </div>

      {/* Recent Inquiries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-4">Recent Inquiries</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Domain</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{inquiry.fullName}</td>
                  <td className="py-3 px-4 text-gray-600">{inquiry.email}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {inquiry.projectDomain}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        inquiry.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : inquiry.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
