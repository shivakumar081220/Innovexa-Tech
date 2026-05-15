import express from 'express'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// Upload file
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
  })
})

export default router
