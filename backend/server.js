import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'express-async-errors'
import { fileURLToPath } from 'url'
import path from 'path'

import { connectDB } from './config/db.js'

// Routes
import uploadRoutes from './routes/upload.js'
import userRequestsRoutes from './routes/userRequests.js'
import projectsRoutes from './routes/projects.js'
import reportsRoutes from './routes/reports.js'
import contactsRoutes from './routes/contacts.js'
import dashboardRoutes from './routes/dashboard.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/upload', uploadRoutes)
app.use('/api/user-requests', userRequestsRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/reports', reportsRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
