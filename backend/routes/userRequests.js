import express from 'express'
import UserRequest from '../models/UserRequest.js'
import { sendAdminRequirementNotification } from '../services/adminNotifier.js'

const router = express.Router()

// Get all user requests
router.get('/', async (req, res) => {
  try {
    const requests = await UserRequest.find().sort({ createdAt: -1 })
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single request
router.get('/:id', async (req, res) => {
  try {
    const request = await UserRequest.findById(req.params.id)
    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }
    res.json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new request
router.post('/', async (req, res) => {
  const userRequest = new UserRequest({
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    collegeName: req.body.collegeName,
    projectTitle: req.body.projectTitle,
    projectDomain: req.body.projectDomain,
    projectType: req.body.projectType,
    technologiesRequired: req.body.technologiesRequired,
    deadline: req.body.deadline,
    budget: req.body.budget,
    detailedRequirements: req.body.detailedRequirements,
    needProjectReport: req.body.needProjectReport,
    preferredCommunication: req.body.preferredCommunication,
    referenceFiles: req.body.referenceFiles || [],
  })

  try {
    const newRequest = await userRequest.save()

    sendAdminRequirementNotification(newRequest).then((result) => {
      if (result?.sent) {
        console.log('Admin notification sent successfully')
      } else {
        console.log('Admin notification skipped:', result?.reason || 'No reason provided')
      }
    })

    res.status(201).json(newRequest)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update request
router.put('/:id', async (req, res) => {
  try {
    const request = await UserRequest.findById(req.params.id)
    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }

    Object.keys(req.body).forEach((key) => {
      request[key] = req.body[key]
    })

    const updatedRequest = await request.save()
    res.json(updatedRequest)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete request
router.delete('/:id', async (req, res) => {
  try {
    const request = await UserRequest.findByIdAndDelete(req.params.id)
    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }
    res.json({ message: 'Request deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
