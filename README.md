# Innovexa Tech - Full Stack Project Development Platform

A modern, professional full-stack MERN website for a startup that provides academic and industry project development services.

## 🎯 Features

### User Side
- **Landing Page** - Comprehensive introduction with services and testimonials
- **Domain Selection** - Browse 9+ project categories with interactive cards
- **Project Requirement Form** - Submit detailed project requirements with file uploads
- **Portfolio** - View completed projects with filtering by domain
- **Responsive Design** - Mobile-friendly interface with smooth animations

### Admin Side
- **Dashboard** - Analytics and statistics overview
- **Project Requests Management** - View, filter, update, and delete user requests
- **Portfolio Management** - Add, edit, and manage completed projects
- **Reports Management** - Manage report templates in various academic formats
- **File Upload Support** - Multer-based file upload with image preview

## 🛠 Tech Stack

### Frontend
- **React.js 18** - UI library
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 📁 Folder Structure

```
innovexa-tech/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DomainCard.jsx
│   │   │   └── TestimonialCard.jsx
│   │   ├── pages/
│   │   │   ├── user/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Portfolio.jsx
│   │   │   │   └── ProjectForm.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ProjectRequests.jsx
│   │   │       ├── PortfolioManagement.jsx
│   │   │       └── ReportsManagement.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── models/
│   │   ├── UserRequest.js
│   │   ├── Project.js
│   │   ├── Report.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── userRequests.js
│   │   ├── projects.js
│   │   ├── reports.js
│   │   ├── contacts.js
│   │   ├── dashboard.js
│   │   └── upload.js
│   ├── middleware/
│   │   └── upload.js
│   ├── config/
│   │   └── db.js
│   ├── uploads/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Installation

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/innovexa-tech
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

4. Seed sample data (optional):
```bash
node seed.js
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📋 API Endpoints

### User Requests
- `GET /api/user-requests` - Get all requests
- `GET /api/user-requests/:id` - Get single request
- `POST /api/user-requests` - Create new request
- `PUT /api/user-requests/:id` - Update request
- `DELETE /api/user-requests/:id` - Delete request

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Reports
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create new report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report

### File Upload
- `POST /api/upload` - Upload file

### Dashboard
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/recent-inquiries` - Get recent inquiries

## 🎨 Design Features

- **Modern UI** - Clean and professional design
- **Smooth Animations** - Framer Motion for transitions
- **Gradient Effects** - Beautiful gradient backgrounds and text
- **Responsive Cards** - Interactive cards with hover effects
- **Dark Mode Ready** - Zustand store for theme management
- **Professional Footer** - Complete with social links
- **Mobile Optimized** - Full responsive design

## 📊 Database Collections

### UserRequest
- Full name, email, phone, college name
- Project title, domain, type
- Technologies required, deadline, budget
- Detailed requirements, project report needed
- Reference files, status (Pending/In Progress/Completed)

### Project
- Title, description, domain
- Technologies array
- Project image, GitHub link, live link
- Screenshots array

### Report
- Title, format (APA/IEEE/MLA/Chicago)
- Description, file reference

### Contact
- Name, email, message

## 🎯 Project Domains

1. Web Development
2. MERN Stack
3. Mobile Apps
4. IoT Projects
5. AI/ML Projects
6. Cybersecurity
7. Python Projects
8. Java Projects
9. Project Reports

## 🔐 File Upload Support

- Supported formats: JPEG, JPG, PNG, GIF, PDF, DOC, DOCX
- Max file size: 10MB
- Auto-generated unique filenames
- Accessible via `/uploads` endpoint

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Heroku/Railway)
```bash
npm start
```

Ensure environment variables are set in your deployment platform.

## 🔄 API Response Format

### Success Response
```json
{
  "_id": "...",
  "field": "value",
  "createdAt": "2024-05-15T...",
  "updatedAt": "2024-05-15T..."
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

## 📞 Contact Information

- Email: info@innovexa.tech
- WhatsApp: +91 98765 43210
- Social: GitHub, LinkedIn, Twitter

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

Developed with best practices for modular architecture and clean code.

---

**Ready to launch your startup's project platform!** 🚀
