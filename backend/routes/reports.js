import express from 'express'
import Report from '../models/Report.js'

const router = express.Router()

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 })
    res.json(reports)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }
    res.json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create report
router.post('/', async (req, res) => {
  const report = new Report({
    title: req.body.title,
    format: req.body.format,
    description: req.body.description,
    file: req.body.file,
  })

  try {
    const newReport = await report.save()
    res.status(201).json(newReport)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update report
router.put('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }

    Object.keys(req.body).forEach((key) => {
      report[key] = req.body[key]
    })

    const updatedReport = await report.save()
    res.json(updatedReport)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id)
    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }
    res.json({ message: 'Report deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
