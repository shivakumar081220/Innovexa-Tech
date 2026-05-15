import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://innovexa-backend.onrender.com/api'
export const API_ASSET_BASE_URL = import.meta.env.VITE_API_ASSET_BASE_URL || 'https://innovexa-backend.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// User Requests
export const userRequestsService = {
  submitRequest: (data) => api.post('/user-requests', data),
  getRequests: () => api.get('/user-requests'),
  getRequestById: (id) => api.get(`/user-requests/${id}`),
  deleteRequest: (id) => api.delete(`/user-requests/${id}`),
}

// Projects
export const projectsService = {
  getAllProjects: () => api.get('/projects'),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
}

// Reports
export const reportsService = {
  getAllReports: () => api.get('/reports'),
  getReportById: (id) => api.get(`/reports/${id}`),
  createReport: (data) => api.post('/reports', data),
  updateReport: (id, data) => api.put(`/reports/${id}`, data),
  deleteReport: (id) => api.delete(`/reports/${id}`),
}

// Dashboard
export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentInquiries: () => api.get('/dashboard/recent-inquiries'),
}

// File upload
export const uploadFile = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export default api
