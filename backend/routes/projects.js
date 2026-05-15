import express from 'express'
import Project from '../models/Project.js'

const router = express.Router()

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create project
router.post('/', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    domain: req.body.domain,
    technologies: req.body.technologies || [],
    image: req.body.image,
    githubLink: req.body.githubLink,
    liveLink: req.body.liveLink,
  })

  try {
    const newProject = await project.save()
    res.status(201).json(newProject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    Object.keys(req.body).forEach((key) => {
      project[key] = req.body[key]
    })

    const updatedProject = await project.save()
    res.json(updatedProject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
