import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { userRequestsService } from '../../services/api'
import { proposalService } from '../../services/supabaseService'

const ProjectForm = () => {
  const { domain } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    collegeName: '',
    projectTitle: '',
    projectDomain: domain ? domain.replace(/-/g, ' ') : '',
    projectType: 'Mini',
    technologiesRequired: '',
    deadline: '',
    budget: '',
    detailedRequirements: '',
    needProjectReport: 'No',
    preferredCommunication: 'Email',
  })

  const projectDomains = [
    'Web Development',
    'MERN Stack',
    'Mobile Apps',
    'IoT',
    'AI/ML',
    'Cybersecurity',
    'Python Projects',
    'Java Projects',
    'Project Reports',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Insert into Supabase proposal table
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phonenumber: formData.phoneNumber,
        college: formData.collegeName,
        title: formData.projectTitle,
        domain: formData.projectDomain,
        type: formData.projectType,
        technologies: formData.technologiesRequired,
        deadline: formData.deadline,
        budget: formData.budget,
        report: formData.needProjectReport,
        communication: formData.preferredCommunication,
        requirements: formData.detailedRequirements,
      }

      await proposalService.insertProposal(payload)
      toast.success('Project request submitted successfully! (saved to Supabase)')
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        collegeName: '',
        projectTitle: '',
        projectDomain: '',
        projectType: 'Mini',
        technologiesRequired: '',
        deadline: '',
        budget: '',
        detailedRequirements: '',
        needProjectReport: 'No',
        preferredCommunication: 'Email',
      })

      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 gradient-text">
              Project Requirements Form
            </h1>
            <p className="text-gray-600 text-lg">
              Fill in your project details and we'll get back to you with a quote
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* College Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    College/Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    required
                    placeholder="IIT Delhi"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    required
                    placeholder="E-commerce Platform"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Project Domain */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Domain <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="projectDomain"
                    value={formData.projectDomain}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Domain</option>
                    {projectDomains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="Mini">Mini Project</option>
                    <option value="Major">Major Project</option>
                    <option value="Research">Research Project</option>
                    <option value="Startup">Startup Project</option>
                  </select>
                </div>

                {/* Technologies Required */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Technologies Required <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="technologiesRequired"
                    value={formData.technologiesRequired}
                    onChange={handleChange}
                    required
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Budget (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    placeholder="50000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Project Report Needed */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Need Project Report?
                  </label>
                  <select
                    name="needProjectReport"
                    value={formData.needProjectReport}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/* Preferred Communication */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Preferred Communication Method
                  </label>
                  <select
                    name="preferredCommunication"
                    value={formData.preferredCommunication}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
              </div>

              {/* Detailed Requirements */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Detailed Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="detailedRequirements"
                  value={formData.detailedRequirements}
                  onChange={handleChange}
                  required
                  placeholder="Describe your project requirements in detail..."
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1"
                >
                  {loading ? 'Submitting...' : 'Submit Project Request'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProjectForm
