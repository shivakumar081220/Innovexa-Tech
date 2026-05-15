import express from 'express'
import UserRequest from '../models/UserRequest.js'
import Project from '../models/Project.js'

const router = express.Router()

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalRequests = await UserRequest.countDocuments()
    const completedProjects = await Project.countDocuments()
    const pendingRequests = await UserRequest.countDocuments({
      status: 'Pending',
    })

    res.json({
      totalRequests,
      completedProjects,
      pendingRequests,
      satisfactionRate: 99,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get recent inquiries
router.get('/recent-inquiries', async (req, res) => {
  try {
    const inquiries = await UserRequest.find()
      .sort({ createdAt: -1 })
      .limit(5)

    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
