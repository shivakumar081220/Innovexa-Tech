# Architecture Overview - Innovexa Tech

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
├──────────────────────┬──────────────────────┬───────────────┤
│   User Interface     │   Admin Interface    │  Navigation   │
│   (React Components) │   (React Components) │  (React Router)│
└──────────────────────┴──────────────────────┴───────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 PRESENTATION LAYER                          │
├──────────────────────┬──────────────────────┬───────────────┤
│   State Management   │    API Service       │  Animations   │
│   (Zustand)          │    (Axios)           │ (Framer Motion)│
└──────────────────────┴──────────────────────┴───────────────┘
                           ↓
         ┌─────────────────────────────────────┐
         │       HTTP/REST API LAYER           │
         │   BASE_URL: localhost:5000/api      │
         └─────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  SERVER LAYER (Node.js)                     │
├────────────┬────────────┬────────────┬────────────┬─────────┤
│  Routes    │ Controllers│ Middleware │ Validation │ Errors  │
│            │            │ (CORS, Auth)│           │         │
└────────────┴────────────┴────────────┴────────────┴─────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              DATA ACCESS LAYER (Mongoose)                   │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ User Request │   Projects   │   Reports    │   Contacts     │
│   Model      │   Model      │   Model      │   Model        │
└──────────────┴──────────────┴──────────────┴────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              DATABASE LAYER (MongoDB)                        │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ user_requests│   projects   │   reports    │   contacts     │
│  collection  │  collection  │ collection   │  collection    │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

---

## Frontend Architecture

### Component Hierarchy

```
App.jsx
├── Routes
│   ├── User Routes
│   │   ├── Home
│   │   │   ├── Navbar
│   │   │   ├── Hero Section
│   │   │   ├── Stats Section
│   │   │   ├── Domain Cards Grid
│   │   │   ├── Technologies Section
│   │   │   ├── Testimonials Section
│   │   │   ├── CTA Section
│   │   │   └── Footer
│   │   ├── Portfolio
│   │   │   ├── Navbar
│   │   │   ├── Filter Buttons
│   │   │   ├── Project Cards Grid
│   │   │   └── Footer
│   │   └── ProjectForm
│   │       ├── Navbar
│   │       ├── Form Component
│   │       ├── File Upload
│   │       └── Footer
│   │
│   └── Admin Routes
│       └── AdminLayout
│           ├── Sidebar Navigation
│           ├── Top Bar
│           └── Content Area
│               ├── Dashboard
│               ├── ProjectRequests
│               ├── PortfolioManagement
│               └── ReportsManagement
│
└── Toaster (Toast notifications)
```

### State Management (Zustand)

```
Store
├── Theme
│   ├── isDarkMode
│   └── toggleDarkMode()
├── Admin UI
│   ├── sidebarOpen
│   └── toggleSidebar()
├── Navigation
│   ├── currentAdminPage
│   └── setCurrentAdminPage()
└── Search & Filter
    ├── searchQuery
    ├── filterStatus
    ├── setSearchQuery()
    └── setFilterStatus()
```

---

## Backend Architecture

### Route Structure

```
API Routes
├── /user-requests
│   ├── GET     - Get all requests
│   ├── GET/:id - Get single request
│   ├── POST    - Create request
│   ├── PUT/:id - Update request
│   └── DELETE/:id - Delete request
│
├── /projects
│   ├── GET     - Get all projects
│   ├── GET/:id - Get single project
│   ├── POST    - Create project
│   ├── PUT/:id - Update project
│   └── DELETE/:id - Delete project
│
├── /reports
│   ├── GET     - Get all reports
│   ├── GET/:id - Get single report
│   ├── POST    - Create report
│   ├── PUT/:id - Update report
│   └── DELETE/:id - Delete report
│
├── /contacts
│   ├── GET     - Get all contacts
│   ├── POST    - Create contact
│   └── DELETE/:id - Delete contact
│
├── /upload
│   └── POST    - Upload file
│
└── /dashboard
    ├── /stats - Get statistics
    └── /recent-inquiries - Get recent inquiries
```

### Middleware Stack

```
Express App
├── CORS Middleware
├── JSON Parser
├── URL Encoded Parser
├── Static File Serving (/uploads)
├── Route Handlers
└── Error Handling Middleware
```

---

## Data Flow Diagrams

### User Submission Flow

```
User Fills Form
      ↓
Validation (Client-side)
      ↓
API Call (POST /user-requests)
      ↓
Server Validation
      ↓
Save to Database
      ↓
Return Response
      ↓
Show Toast Notification
      ↓
Redirect to Home
```

### Admin Project Add Flow

```
Admin Clicks "Add Project"
      ↓
Modal Opens
      ↓
Admin Fills Form + Uploads Image
      ↓
Image Upload → Multer → Save to /uploads
      ↓
Form Submission → API (POST /projects)
      ↓
Database Insert
      ↓
Update Frontend State
      ↓
Show Success Toast
      ↓
Refresh Project List
```

### File Upload Flow

```
User Selects File(s)
      ↓
Client Validation (Type, Size)
      ↓
FormData Creation
      ↓
POST /upload (multipart/form-data)
      ↓
Multer Processing
      ↓
File Saved to /uploads
      ↓
Filename Returned
      ↓
Store in Array
      ↓
Display in UI with Remove Option
```

---

## Technology Stack Details

### Frontend Stack

```
React 18
├── UI Rendering
└── Component State

Tailwind CSS
├── Utility Classes
└── Responsive Design

Framer Motion
├── Page Transitions
├── Component Animations
└── Hover Effects

Zustand
├── Global State
└── Theme Management

Axios
├── HTTP Requests
└── API Communication

React Router
├── Client-side Routing
└── Navigation

React Hot Toast
├── Notifications
└── User Feedback

Lucide Icons
├── SVG Icons
└── Lightweight Icons

Vite
├── Build Tool
└── Development Server
```

### Backend Stack

```
Express.js
├── Web Framework
└── Route Management

MongoDB
├── NoSQL Database
└── Document Storage

Mongoose
├── Schema Validation
└── ODM (Object Document Mapper)

Multer
├── File Upload
└── Middleware

CORS
├── Cross-Origin Support
└── API Accessibility

Dotenv
├── Environment Variables
└── Configuration

Node.js
├── Runtime
└── Server
```

---

## Database Schema

### UserRequest Schema
```javascript
{
  fullName: String (required),
  email: String (required),
  phoneNumber: String (required),
  collegeName: String (required),
  projectTitle: String (required),
  projectDomain: String (enum, required),
  projectType: String (enum, required),
  technologiesRequired: String (required),
  deadline: Date (required),
  budget: Number (required),
  detailedRequirements: String (required),
  needProjectReport: String (enum),
  preferredCommunication: String (enum),
  referenceFiles: [String],
  status: String (enum: Pending, In Progress, Completed),
  timestamps: { createdAt, updatedAt }
}
```

### Project Schema
```javascript
{
  title: String (required),
  description: String (required),
  domain: String (required),
  technologies: [String],
  image: String,
  githubLink: String,
  liveLink: String,
  screenshots: [String],
  timestamps: { createdAt, updatedAt }
}
```

### Report Schema
```javascript
{
  title: String (required),
  format: String (enum: APA, IEEE, MLA, Chicago),
  description: String,
  file: String,
  timestamps: { createdAt, updatedAt }
}
```

---

## API Communication Pattern

### Request Format
```javascript
// Example API call
const response = await axios.post('/api/user-requests', {
  fullName: 'John Doe',
  email: 'john@example.com',
  // ... other fields
})
```

### Response Format
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  // ... other fields
  "createdAt": "2024-05-15T10:00:00.000Z",
  "updatedAt": "2024-05-15T10:00:00.000Z"
}
```

### Error Handling
```javascript
try {
  const response = await api.post('/user-requests', data)
} catch (error) {
  const message = error.response?.data?.message || error.message
  console.error(message)
}
```

---

## Deployment Architecture

### Development Environment
```
Local Machine
├── Frontend (localhost:3000)
├── Backend (localhost:5000)
└── MongoDB (localhost:27017 or Atlas)
```

### Production Environment
```
Frontend Hosting (Vercel/Netlify)
├── Built React App
├── CDN Distribution
└── Auto SSL

Backend Hosting (Railway/Heroku)
├── Node.js Server
├── Environment Variables
└── Auto Scaling

Database (MongoDB Atlas)
├── Cloud MongoDB
├── Auto Backups
└── Redundancy
```

---

## Performance Considerations

### Frontend Optimization
- Code splitting with React Router
- Lazy loading of components
- Image optimization
- Memoization of expensive computations
- Efficient CSS with Tailwind

### Backend Optimization
- Database indexing
- Query optimization
- Response compression
- Caching strategies
- Connection pooling

### Network Optimization
- API request batching
- Pagination for large datasets
- Gzip compression
- CDN for static assets

---

## Security Architecture

### Frontend Security
- Input validation
- XSS prevention (React escaping)
- CSRF token support (when added)
- Secure file upload validation

### Backend Security
- Input validation (Mongoose)
- CORS configuration
- File type validation
- Size limit validation
- Error message sanitization

### Data Security
- MongoDB connection string in .env
- No sensitive data in frontend
- HTTPS for production
- Rate limiting (recommended)
- Authentication (future enhancement)

---

## Scalability Plan

### Current Architecture
- Single server backend
- Single database
- Monolithic structure

### Scaling Strategy
1. **Phase 1**: Horizontal scaling (load balancer)
2. **Phase 2**: Database sharding
3. **Phase 3**: Microservices
4. **Phase 4**: Cache layer (Redis)
5. **Phase 5**: Message queue (RabbitMQ)

---

## Monitoring & Logging

### Frontend Monitoring
- Error tracking (Sentry)
- Performance monitoring
- User analytics

### Backend Monitoring
- Request logging
- Error tracking
- Database query performance
- Response time metrics

---

## Development Workflow

```
Feature Development
├── Local development (localhost)
├── Testing in browser
├── API testing with Postman/curl
├── Database verification
├── Code review (if team)
├── Git commit and push
└── Deployment to production
```

---

This architecture ensures:
✅ Scalability
✅ Maintainability
✅ Performance
✅ Security
✅ User Experience

For more details, refer to specific documentation files.
