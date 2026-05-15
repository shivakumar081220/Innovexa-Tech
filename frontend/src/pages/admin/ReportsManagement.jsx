import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { reportsService, uploadFile } from '../../services/api'
import { Trash2, Download, Plus } from 'lucide-react'

const ReportsManagement = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    format: 'APA',
    description: '',
    file: null,
  })

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await reportsService.getAllReports()
      setReports(response.data)
    } catch (error) {
      toast.error('Error loading reports')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const response = await uploadFile(file)
        setFormData((prev) => ({ ...prev, file: response.data.filename }))
        toast.success('File uploaded')
      } catch (error) {
        toast.error('Error uploading file')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        await reportsService.updateReport(editingId, formData)
        setReports((prev) =>
          prev.map((r) => (r._id === editingId ? { _id: editingId, ...formData } : r))
        )
        toast.success('Report updated')
      } else {
        const response = await reportsService.createReport(formData)
        setReports((prev) => [...prev, response.data])
        toast.success('Report added')
      }

      resetForm()
    } catch (error) {
      toast.error('Error saving report')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this report?')) {
      try {
        await reportsService.deleteReport(id)
        setReports((prev) => prev.filter((r) => r._id !== id))
        toast.success('Report deleted')
      } catch (error) {
        toast.error('Error deleting report')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      format: 'APA',
      description: '',
      file: null,
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading && reports.length === 0) {
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
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports Management</h1>
          <p className="text-gray-600 mt-2">Manage report templates and formats</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Report
        </button>
      </motion.div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Report' : 'Add New Report'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Report Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
              />

              <select
                name="format"
                value={formData.format}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
              >
                <option value="APA">APA Format</option>
                <option value="IEEE">IEEE Format</option>
                <option value="MLA">MLA Format</option>
                <option value="Chicago">Chicago Format</option>
              </select>

              <textarea
                name="description"
                placeholder="Report Description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
              />

              <div className="border-2 border-dashed rounded-lg p-4">
                <label className="cursor-pointer block text-center">
                  <span className="text-sm font-semibold text-blue-600">
                    Click to upload report file
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
                {formData.file && (
                  <p className="mt-2 text-sm text-gray-600">
                    File: {formData.file}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">
                  {editingId ? 'Update' : 'Add'} Report
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 overflow-x-auto"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Format</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-semibold">{report.title}</td>
                <td className="py-3 px-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {report.format}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 line-clamp-1">
                  {report.description}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  {report.file && (
                    <a
                      href={`http://localhost:5000/uploads/${report.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Download size={18} />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

export default ReportsManagement
