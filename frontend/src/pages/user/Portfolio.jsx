import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { projectsService } from '../../services/api'
import { Github, ExternalLink } from 'lucide-react'

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

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

  const domains = ['All', ...new Set(projects.map((p) => p.domain))]
  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.domain === filter)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600">
              Showcase of our successfully completed projects
            </p>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setFilter(domain)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === domain
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card overflow-hidden group cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    {project.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${project.image}`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                        {project.title.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {project.domain}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Technologies:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-4 border-t">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <Github size={18} />
                          <span className="text-sm">GitHub</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink size={18} />
                          <span className="text-sm">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Portfolio
