import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { userRequestsService } from '../../services/api'
import { Trash2, Eye } from 'lucide-react'

const ProjectRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await userRequestsService.getRequests()
      setRequests(response.data)
    } catch (error) {
      toast.error('Error loading requests')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    // This would typically call an update API
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
    )
    toast.success('Status updated')
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await userRequestsService.deleteRequest(id)
        setRequests((prev) => prev.filter((req) => req._id !== id))
        toast.success('Request deleted')
      } catch (error) {
        toast.error('Error deleting request')
      }
    }
  }

  const filteredRequests = requests.filter((req) => {
    if (filter === 'all') return true
    return req.status === filter
  })

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
        <h1 className="text-3xl font-bold text-gray-800">Project Requests</h1>
        <p className="text-gray-600 mt-2">Manage all user project submissions</p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex gap-4 flex-wrap">
        {['all', 'Pending', 'In Progress', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({
              status === 'all'
                ? requests.length
                : requests.filter((r) => r.status === status).length
            })
          </button>
        ))}
      </div>

      {/* Requests Grid */}
      <div className="grid gap-6">
        {filteredRequests.map((request, idx) => (
          <motion.div
            key={request._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="card p-6 hover:shadow-xl transition-shadow"
          >
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Client Name</p>
                <p className="font-bold text-lg">{request.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{request.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{request.phoneNumber}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Domain</p>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mt-1">
                  {request.projectDomain}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold text-gray-800">{request.projectType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="font-semibold text-green-600">₹{request.budget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <select
                  value={request.status}
                  onChange={(e) =>
                    handleStatusChange(request._id, e.target.value)
                  }
                  className="mt-1 px-3 py-1 border rounded-lg font-semibold text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Technologies Required</p>
              <p className="text-gray-800">{request.technologiesRequired}</p>
            </div>

            <div className="border-t pt-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Requirements</p>
              <p className="text-gray-800 line-clamp-2">{request.detailedRequirements}</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setSelectedRequest(request)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
              >
                <Eye size={18} />
                View Details
              </button>
              <button
                onClick={() => handleDelete(request._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Request Details</h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Project Title</p>
                <p className="font-semibold text-gray-800">{selectedRequest.projectTitle}</p>
              </div>
              <div>
                <p className="text-gray-600">Detailed Requirements</p>
                <p className="text-gray-800">{selectedRequest.detailedRequirements}</p>
              </div>
              <div>
                <p className="text-gray-600">Deadline</p>
                <p className="font-semibold text-gray-800">
                  {new Date(selectedRequest.deadline).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Report Needed</p>
                <p className="font-semibold text-gray-800">{selectedRequest.needProjectReport}</p>
              </div>
              <div>
                <p className="text-gray-600">Preferred Communication</p>
                <p className="font-semibold text-gray-800">{selectedRequest.preferredCommunication}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedRequest(null)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ProjectRequests
