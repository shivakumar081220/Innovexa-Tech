# Innovexa Tech - Quick Start Guide

## 🚀 5-Minute Quick Start

### Prerequisites Checklist
- ✅ Node.js installed? ([Download](https://nodejs.org/))
- ✅ MongoDB running? (Local or Atlas)
- ✅ Ports 3000 & 5000 available?

### Step 1: Backend Setup (2 minutes)
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Update MongoDB URI in .env (if using MongoDB Atlas)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innovexa-tech

# Seed sample data (optional)
node seed.js

# Start server
npm run dev
```

**Expected Output:**
```
MongoDB connected
Server running on http://localhost:5000
```

### Step 2: Frontend Setup (2 minutes)
```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v4.5.0  ready in 123 ms
  ➜  Local:   http://localhost:3000/
```

### Step 3: Access Application
- **User Interface:** http://localhost:3000/
- **Admin Panel:** http://localhost:3000/admin
- **API Health:** http://localhost:5000/api/health

---

## 📋 Common Commands

### Frontend Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Backend Commands
```bash
npm install         # Install dependencies
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start server
node seed.js       # Seed sample data
```

### MongoDB Atlas Setup
1. Go to [atlas.mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Add to `.env`: `MONGODB_URI=<your-connection-string>`

---

## 🧪 Testing Checklist

### User Side Tests
- [ ] Home page loads with smooth animations
- [ ] Domain cards are clickable
- [ ] Project form fills and submits
- [ ] File upload works
- [ ] Portfolio page displays projects
- [ ] Filter functionality works
- [ ] Portfolio page is responsive on mobile
- [ ] Links (GitHub, WhatsApp) work

### Admin Tests
- [ ] Dashboard displays stats
- [ ] Project requests table shows data
- [ ] Status can be updated
- [ ] Requests can be deleted
- [ ] Can add new project
- [ ] Can upload project image
- [ ] Can manage reports
- [ ] Mobile sidebar works

### API Tests
```bash
# In terminal or Postman
curl http://localhost:5000/api/health
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/user-requests
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
```

### Frontend Connection Error
- Verify backend is running on `http://localhost:5000`
- Check `API_BASE_URL` in `frontend/src/services/api.js`
- Check browser console for errors

### MongoDB Connection Failed
```bash
# Test connection string
# Update MongoDB URI in .env
# Ensure MongoDB is running or Atlas is accessible
```

### File Upload Not Working
- Check `backend/uploads/` directory exists
- Verify file size < 10MB
- Check browser console for errors

---

## 📁 Project Structure at a Glance

```
innovexa-tech/
├── frontend/                   # React app
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/api.js    # API calls
│   │   └── store/store.js     # State management
│   └── package.json
│
├── backend/                    # Express server
│   ├── models/                # Database schemas
│   ├── routes/                # API routes
│   ├── server.js              # Main server
│   ├── seed.js                # Sample data
│   └── package.json
│
├── README.md                  # Full documentation
├── SETUP.md                   # Detailed setup guide
├── FEATURES.md                # Feature documentation
├── API.md                     # API documentation
└── DEPLOYMENT.md              # Deployment guide
```

---

## 🎨 Key Features Summary

### User-Facing
✨ Landing page with animations
🎯 9 project domains with icons
📝 Complete requirement form
📂 File upload support
🏆 Portfolio showcase
⭐ Client testimonials
📱 Fully responsive

### Admin Features
📊 Dashboard with analytics
📋 Project request management
🖼️ Portfolio management
📄 Report template management
🎛️ Status tracking and filtering

---

## 💡 Next Steps

1. **Customize Branding**
   - Update logo in Navbar
   - Change colors in `tailwind.config.js`
   - Update company info in Footer

2. **Add Your Content**
   - Replace sample projects in `seed.js`
   - Update testimonials in Home page
   - Add real WhatsApp/Email links

3. **Setup Production**
   - Create MongoDB Atlas database
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Railway/Heroku
   - Connect custom domain

4. **Add Authentication** (future)
   - Implement JWT login for admin
   - Add email verification
   - Add password reset

---

## 📚 Documentation Quick Links

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Full project overview |
| [SETUP.md](SETUP.md) | Detailed installation |
| [FEATURES.md](FEATURES.md) | Feature documentation |
| [API.md](API.md) | API endpoints |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment |

---

## 🔗 Important Links

- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Backend API:** http://localhost:5000/api
- **MongoDB Atlas:** https://atlas.mongodb.com
- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion/

---

## 📞 Support Resources

1. **Check Documentation** - See SETUP.md or FEATURES.md
2. **Review API Docs** - Check API.md for endpoint details
3. **Check Console Logs** - Browser DevTools for frontend errors
4. **Check Terminal** - Terminal for backend errors
5. **MongoDB Logs** - Check MongoDB connection

---

## ✅ Pre-Deployment Checklist

Before going to production:
- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] Error logging setup
- [ ] Security review completed
- [ ] Performance optimized
- [ ] Mobile responsiveness tested
- [ ] API rate limiting configured
- [ ] CORS configured correctly
- [ ] SSL certificates enabled

---

## 🎉 You're Ready!

Your Innovexa Tech platform is now ready to use!

**Happy coding!** 🚀

For detailed guidance, refer to specific documentation files.
