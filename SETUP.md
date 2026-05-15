# Setup Instructions - Innovexa Tech

## Quick Start Guide

### Step 1: Prerequisites Installation

Ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (optional)

### Step 2: Clone/Download Project

```bash
# If using git
git clone <repository-url>
cd innovexa-tech

# Or extract the provided ZIP file
```

### Step 3: Backend Configuration

#### 3.1 Navigate to Backend
```bash
cd backend
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 Create Environment File
Create a `.env` file in the backend directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/innovexa-tech

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (change this to a strong secret)
JWT_SECRET=innovexa-tech-super-secret-key-12345
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innovexa-tech?retryWrites=true&w=majority
```

#### 3.4 Create Uploads Directory
```bash
# Windows
mkdir uploads

# macOS/Linux
mkdir -p uploads
```

#### 3.5 Seed Sample Data (Optional)
```bash
node seed.js
```

This will add sample projects and inquiries to your database.

#### 3.6 Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

Expected output:
```
MongoDB connected
Server running on http://localhost:5000
```

### Step 4: Frontend Configuration

#### 4.1 Open New Terminal - Navigate to Frontend
```bash
cd frontend
```

#### 4.2 Install Dependencies
```bash
npm install
```

#### 4.3 Verify API Configuration
Check `src/services/api.js` - API_BASE_URL should be:
```javascript
const API_BASE_URL = 'http://localhost:5000/api'
```

#### 4.4 Start Frontend Server
```bash
npm run dev
```

Expected output:
```
  VITE v4.5.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Access the Application

- **User Side:** http://localhost:3000/
- **Admin Side:** http://localhost:3000/admin
- **API Health Check:** http://localhost:5000/api/health

## 🧪 Testing the Application

### 1. Test User Side
- Visit home page
- Click domain cards
- Fill project requirement form
- Upload reference files
- View portfolio

### 2. Test Admin Side
- Go to `/admin/dashboard`
- View statistics
- Manage project requests
- Add new projects
- Manage reports

### 3. Test API Endpoints
Using Postman or curl:

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Get all requests
curl http://localhost:5000/api/user-requests

# Health check
curl http://localhost:5000/api/health
```

## 📁 Project Structure

```
innovexa-tech/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── store/              # State management
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Express server
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   ├── middleware/             # Custom middleware
│   ├── config/                 # Configuration files
│   ├── uploads/                # Uploaded files directory
│   ├── server.js               # Main server file
│   ├── seed.js                 # Database seeding script
│   └── package.json
│
└── README.md                   # Project documentation
```

## 🔧 Common Issues & Solutions

### Issue 1: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running locally or use MongoDB Atlas
- Update MONGODB_URI in `.env`

### Issue 2: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue 3: CORS Errors
Check that backend is running and API_BASE_URL in frontend is correct.

### Issue 4: File Upload Not Working
- Ensure `uploads` directory exists in backend
- Check file permissions
- Verify file size < 10MB

## 🚀 Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```
Output will be in `dist/` directory.

### Backend Deployment
Set environment variables in production:
- Update MONGODB_URI for production database
- Change JWT_SECRET to a strong value
- Set NODE_ENV=production

## 📊 Default Admin Credentials

Admin panel is accessible without login at: `/admin/dashboard`

## 🎯 Features Walkthrough

### 1. Landing Page
- Hero section with CTA buttons
- Statistics cards
- Organized domain cards
- Technology showcase
- Client testimonials
- Contact CTA

### 2. Domain Selection & Project Form
- 9 specialized project domains
- Detailed form with file upload
- Real-time form validation
- Reference file management

### 3. Portfolio Page
- Filter by domain
- Project cards with details
- GitHub and live links
- Technology tags

### 4. Admin Dashboard
- Real-time statistics
- Recent inquiries table
- Request management
- Portfolio management
- Report templates

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 💡 Tips for Best Experience

1. **Enable JavaScript** in your browser
2. **Clear browser cache** if experiencing issues
3. **Use modern browser** for best performance
4. **Ensure MongoDB is running** before starting backend
5. **Run frontend and backend separately** in different terminals

## 🔐 Security Notes

- Change JWT_SECRET in production
- Use MongoDB Atlas with IP whitelist
- Implement rate limiting for production
- Add authentication for admin panel when deploying
- Use HTTPS in production

## 📞 Support & Troubleshooting

If you encounter issues:
1. Check error messages in terminal
2. Verify all prerequisites are installed
3. Ensure ports 3000 and 5000 are available
4. Check MongoDB connection
5. Review console logs in browser DevTools

## 🎉 Next Steps

After setup:
1. Customize branding and content
2. Add real payment integration
3. Implement email notifications
4. Add user authentication
5. Deploy to production

---

**Happy coding! 🚀**
