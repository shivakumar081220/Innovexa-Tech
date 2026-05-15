import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { projectsService, uploadFile, API_ASSET_BASE_URL } from '../../services/api'
import { Trash2, Edit2, Plus, Upload } from 'lucide-react'

const PortfolioManagement = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    image: null,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsService.getAllProjects()
      setProjects(response.data)
    } catch (error) {
      toast.error('Error loading projects')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const response = await uploadFile(file)
        setFormData((prev) => ({ ...prev, image: response.data.filename }))
        setSelectedImage(URL.createObjectURL(file))
        toast.success('Image uploaded')
      } catch (error) {
        toast.error('Error uploading image')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        technologies: formData.technologies.split(',').map((t) => t.trim()),
      }

      if (editingId) {
        await projectsService.updateProject(editingId, submitData)
        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? submitData : p))
        )
        toast.success('Project updated')
      } else {
        const response = await projectsService.createProject(submitData)
        setProjects((prev) => [...prev, response.data])
        toast.success('Project added')
      }

      resetForm()
    } catch (error) {
      toast.error('Error saving project')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await projectsService.deleteProject(id)
        setProjects((prev) => prev.filter((p) => p._id !== id))
        toast.success('Project deleted')
      } catch (error) {
        toast.error('Error deleting project')
      }
    }
  }

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      domain: project.domain,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      image: project.image,
    })
    setEditingId(project._id)
    setShowForm(true)
    if (project.image) {
      setSelectedImage(`${API_ASSET_BASE_URL}/uploads/${project.image}`)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      domain: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
      image: null,
    })
    setSelectedImage(null)
    setEditingId(null)
    setShowForm(false)
  }

  if (loading && projects.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-800">Portfolio Management</h1>
          <p className="text-gray-600 mt-2">Manage your completed projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Project
        </button>
      </motion.div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full my-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                />
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="">Select Domain</option>
                  {['Web Development', 'MERN Stack', 'Mobile Apps', 'IoT', 'AI/ML'].map(
                    (d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    )
                  )}
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
              />

              <input
                type="text"
                name="technologies"
                placeholder="Technologies (comma-separated)"
                value={formData.technologies}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="url"
                  name="githubLink"
                  placeholder="GitHub Link (optional)"
                  value={formData.githubLink}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                />
                <input
                  type="url"
                  name="liveLink"
                  placeholder="Live Link (optional)"
                  value={formData.liveLink}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              {/* Image Upload */}
              <div className="border-2 border-dashed rounded-lg p-4">
                <label className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm font-semibold text-blue-600">
                    Click to upload project image
                  </span>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="mt-4 h-32 rounded-lg"
                  />
                )}
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">
                  {editingId ? 'Update' : 'Add'} Project
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

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="card overflow-hidden"
          >
            <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 relative">
              {project.image && (
                <img
                  src={`${API_ASSET_BASE_URL}/uploads/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-4">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {project.domain}
              </span>
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>

              <div className="flex gap-2 pt-3 border-t">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PortfolioManagement
