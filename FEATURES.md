# Innovexa Tech - Features Documentation

## User-Facing Features

### 1. Landing Page
**Components:**
- Hero Section with gradient background
- Call-to-action buttons (Get Started, Chat with us)
- Statistics section showing metrics
- Service showcase with hover effects

**Features:**
- Smooth scroll animations
- Responsive grid layout
- Mobile-optimized design
- Professional branding

### 2. Domain Selection
**Domains Offered:**
1. **Web Development** - Modern responsive web applications
2. **MERN Stack** - Full-stack JavaScript applications
3. **Mobile Apps** - Native and cross-platform apps
4. **IoT Projects** - Embedded systems and microcontrollers
5. **AI/ML** - Machine learning models and AI systems
6. **Cybersecurity** - Security solutions and penetration testing
7. **Python Projects** - Automation and backend services
8. **Java Projects** - Enterprise applications
9. **Project Reports** - Academic documentation

**Features:**
- Interactive cards with icons and gradients
- Click to submit requirements
- Categorized with domain-specific icons
- Responsive grid layout

### 3. Project Requirement Form
**Form Fields:**
- **Personal Information**
  - Full Name
  - Email Address
  - Phone Number
  - College/Organization Name

- **Project Details**
  - Project Title
  - Project Domain (dropdown)
  - Project Type (Mini/Major/Research/Startup)
  - Technologies Required
  - Detailed Requirements (textarea)

- **Timeline & Budget**
  - Deadline (date picker)
  - Budget (₹)
  - Need Project Report (Yes/No)

- **Communication & Files**
  - Preferred Communication Method
  - Reference File Upload (drag & drop)

**Features:**
- Client-side form validation
- File upload with preview
- Real-time error handling
- Toast notifications
- Async form submission

### 4. Portfolio Page
**Display Features:**
- Grid layout with project cards
- Domain-based filtering
- Each project card includes:
  - Project image/thumbnail
  - Title and domain badge
  - Description preview
  - Technology tags
  - GitHub and live demo links

**Interactions:**
- Filter projects by domain
- View full details on hover
- Direct links to GitHub and live demos
- Smooth transitions and animations

### 5. Testimonials Section
**Features:**
- Client testimonials with ratings
- College/Organization name
- 5-star rating display
- Rotating carousel effect
- Professional card design

### 6. Contact Section
**Integration:**
- WhatsApp direct chat link
- Email contact link
- Social media links
- Contact form support (backend ready)

---

## Admin-Side Features

### 1. Admin Dashboard

**Dashboard Analytics:**
- **Total Project Requests** - Total submissions count
- **Completed Projects** - Portfolio count
- **Pending Requests** - Awaiting action
- **Satisfaction Rate** - Overall metrics

**Recent Inquiries Table:**
- Client name and email
- Project domain
- Request status badge
- Quick view and manage options

**Features:**
- Real-time data updates
- Color-coded status badges
- Responsive table design
- Interactive statistics cards

### 2. Project Requests Management

**Features:**
- Display all user submissions in table/card format
- **Status Management:**
  - Pending (yellow)
  - In Progress (blue)
  - Completed (green)

- **View/Edit Options:**
  - View complete submission details
  - Update request status
  - Delete requests
  - Filter by status

**Detailed View:**
- All form fields displayed
- Timeline information
- Budget details
- Communication preferences
- Reference files list

**Bulk Actions:**
- Export requests
- Filter and search
- Batch status update
- Delete multiple requests

### 3. Portfolio Management

**Add Project Features:**
- Project title and description
- Domain selection
- Technologies (comma-separated)
- Upload project image
- GitHub repository link
- Live demo URL

**Edit/Update:**
- Modify any project detail
- Update project image
- Change technologies
- Update links

**Delete & Manage:**
- Remove completed projects
- View project cards
- Quick action buttons
- Image preview

**Display:**
- Grid layout (2-3 columns responsive)
- Project image and domain badge
- Quick edit/delete buttons
- Technology tags

### 4. Reports Management

**Report Template Management:**
- **Create Reports:**
  - Report title
  - Academic format (APA, IEEE, MLA, Chicago)
  - Detailed description
  - File upload (PDF, DOC, DOCX)

- **Manage Reports:**
  - View all templates
  - Download button for each template
  - Edit template details
  - Delete unwanted templates

**Formats Supported:**
- APA Format
- IEEE Format
- MLA Format
- Chicago Format

**Features:**
- File storage and retrieval
- Format badges
- Download links
- Organized table display

### 5. Admin Navigation

**Sidebar Menu:**
- Dashboard (analytics overview)
- Project Requests (submission management)
- Portfolio (project management)
- Reports (template management)
- Link to user-facing site

**Features:**
- Collapsible sidebar on mobile
- Active page highlighting
- Smooth transitions
- Quick navigation

---

## Technical Features

### Frontend Features
1. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: 640px, 768px, 1024px, 1280px
   - Flexible grid layouts
   - Touch-friendly buttons

2. **Animation & Transitions**
   - Framer Motion animations
   - Smooth page transitions
   - Hover effects on cards
   - Loading spinners
   - Toast notifications

3. **State Management**
   - Zustand for global state
   - Theme management (dark mode ready)
   - Sidebar toggle state
   - Admin page navigation

4. **Form Handling**
   - Real-time validation
   - Error messaging
   - File upload management
   - Async submission handling

### Backend Features
1. **RESTful API**
   - CRUD operations for all resources
   - Proper HTTP status codes
   - JSON response format
   - Error handling

2. **File Management**
   - Multer for file uploads
   - Automatic file naming
   - Size validation (10MB limit)
   - MIME type validation

3. **Database**
   - MongoDB with Mongoose
   - Schema validation
   - Indexed queries
   - Timestamps for all records

4. **Security**
   - CORS enabled
   - Input validation
   - Error handling middleware
   - Secure file storage

---

## Data Models

### User Request Model
```javascript
{
  fullName: String,
  email: String,
  phoneNumber: String,
  collegeName: String,
  projectTitle: String,
  projectDomain: String,
  projectType: String,
  technologiesRequired: String,
  deadline: Date,
  budget: Number,
  detailedRequirements: String,
  needProjectReport: String,
  preferredCommunication: String,
  referenceFiles: [String],
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  domain: String,
  technologies: [String],
  image: String,
  githubLink: String,
  liveLink: String,
  screenshots: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Report Model
```javascript
{
  title: String,
  format: String,
  description: String,
  file: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints Overview

### User Requests
- `GET /api/user-requests`
- `GET /api/user-requests/:id`
- `POST /api/user-requests`
- `PUT /api/user-requests/:id`
- `DELETE /api/user-requests/:id`

### Projects
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Reports
- `GET /api/reports`
- `GET /api/reports/:id`
- `POST /api/reports`
- `PUT /api/reports/:id`
- `DELETE /api/reports/:id`

### Dashboard
- `GET /api/dashboard/stats`
- `GET /api/dashboard/recent-inquiries`

### File Upload
- `POST /api/upload`

---

## Customization Guide

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#2563eb',
  secondary: '#7c3aed',
}
```

### Change Animations
Edit `frontend/src/index.css` for global animations

### Add New Domain
1. Update `projectDomains` array in `ProjectForm.jsx`
2. Update enum in backend `UserRequest.js` schema
3. Add corresponding icon

### Modify Form Fields
1. Update form in `ProjectForm.jsx`
2. Update schema in backend model
3. Update admin view to display new fields

---

## Performance Optimizations

- Lazy loading of images
- Code splitting with React Router
- Memoized components
- Optimized animations
- Efficient database queries
- File size optimization

---

This documentation covers all user-facing and admin features of the Innovexa Tech platform.
