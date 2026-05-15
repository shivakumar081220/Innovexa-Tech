# Deployment Guide - Innovexa Tech

## Prerequisites for Deployment

1. GitHub account (for version control)
2. Hosting platforms account (Vercel, Netlify, Heroku, Railway, etc.)
3. MongoDB Atlas account (free tier available)

---

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import GitHub repository
- Select "frontend" as root directory
- Set environment variables (if needed)
- Deploy

3. **Configure Environment**
Create `frontend/.env.production`:
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

4. **Update API Base URL**
In `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
```

### Option 2: Deploy to Netlify

**Steps:**

1. **Build locally first**
```bash
cd frontend
npm run build
```

2. **Deploy on Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop `dist` folder or connect GitHub
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variables if needed

3. **Configure Redirects**
Create `frontend/public/_redirects`:
```
/*    /index.html   200
```

### Option 3: Deploy to GitHub Pages

**Steps:**

1. **Update vite.config.js**
```javascript
export default defineConfig({
  base: '/innovexa-tech/',
  // ... rest of config
})
```

2. **Build and Deploy**
```bash
cd frontend
npm run build
npm install gh-pages --save-dev
npx gh-pages -d dist
```

---

## Backend Deployment

### Option 1: Deploy to Railway (Recommended)

**Steps:**

1. **Connect GitHub Repository**
- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "Deploy from GitHub"
- Authorize and select your repository

2. **Configure Environment Variables**
In Railway project settings, add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innovexa-tech
PORT=5000
NODE_ENV=production
JWT_SECRET=your-very-secure-secret-key
```

3. **Deploy**
- Connect to GitHub repo
- Select `backend` as root directory
- Railway auto-deploys on push

4. **Database Setup**
- Create MongoDB Atlas cluster
- Get connection string
- Add to Railway environment variables

### Option 2: Deploy to Heroku

**Steps:**

1. **Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Create Heroku App**
```bash
cd backend
heroku create innovexa-backend
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=<secure-key>
```

4. **Deploy**
```bash
git push heroku main
```

### Option 3: Deploy to AWS or Azure

For enterprise deployments, consider:
- AWS Elastic Beanstalk
- Azure App Service
- DigitalOcean App Platform
- Google Cloud Run

---

## Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Cluster

1. **Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**

2. **Create New Cluster**
- Select free tier
- Choose region (choose closest to users)
- Click "Create Cluster"

3. **Configure Network Access**
- Go to "Network Access"
- Click "Add IP Address"
- Select "Allow Access from Anywhere" (0.0.0.0/0) for development
- For production, use specific IPs

4. **Create Database User**
- Go to "Database Access"
- Click "Add New Database User"
- Create username and password
- Save credentials securely

5. **Get Connection String**
- Go to "Databases"
- Click "Connect"
- Select "Connect your application"
- Copy connection string
- Replace `<password>` with your user password

### Connection String Format
```
mongodb+srv://username:password@cluster0.mongodb.net/innovexa-tech?retryWrites=true&w=majority
```

---

## Environment Variables Checklist

### Frontend (.env.production)
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### Backend (.env production)
```
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=production
JWT_SECRET=super-secret-production-key
```

---

## Domain Configuration

### Connect Custom Domain

**For Frontend (Vercel):**
1. Go to Project Settings
2. Domains section
3. Add custom domain
4. Follow DNS configuration

**For Backend (Railway):**
1. Go to Railway project
2. Add custom domain
3. Update DNS records with Railway's values

### DNS Setup
Update your domain registrar's DNS records:
```
Frontend: example.com → Vercel IP
Backend: api.example.com → Railway/Heroku domain
```

---

## SSL/HTTPS

Most modern hosting platforms include free SSL:
- Vercel: Automatic
- Netlify: Automatic
- Railway: Automatic
- Heroku: Free dyno gets automatic SSL

For custom domains, enable HTTPS in platform settings.

---

## Monitoring & Logging

### Frontend Monitoring
- Vercel Analytics
- Google Analytics integration
- Browser Console logs

### Backend Monitoring
- Railway logs: `railway logs`
- Heroku logs: `heroku logs --tail`
- MongoDB Atlas Monitoring

### Setup Monitoring Tools
1. **Sentry** - Error tracking
2. **LogRocket** - Session replay
3. **New Relic** - Performance monitoring

---

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS and JavaScript
- Optimize images
- Use CDN for static files
- Lazy load components

### Backend
- Enable MongoDB indexes
- Implement caching (Redis)
- Use API rate limiting
- Compress responses

### CDN Setup
Consider CloudFlare for:
- DNS management
- DDoS protection
- Image optimization
- Caching

---

## Backup & Recovery

### MongoDB Backup
```bash
# Enable automated backups in MongoDB Atlas
# Settings → Backup → Enable Continuous Backup
```

### Application Backup
- GitHub as primary backup
- Regular code commits
- Environment variable backups (secure storage)

---

## Post-Deployment Checklist

- [ ] Frontend and backend URLs configured
- [ ] Database backups enabled
- [ ] SSL certificates active
- [ ] Environment variables set
- [ ] Error logging configured
- [ ] Monitoring tools installed
- [ ] Custom domain connected
- [ ] Email notifications setup
- [ ] CDN configured (optional)
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Database indexed
- [ ] Staging environment tested
- [ ] Production deployment successful
- [ ] Domain DNS pointing correctly

---

## Troubleshooting Deployment

### Frontend Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Backend Connection Issues
- Verify MongoDB URI
- Check network access settings
- Ensure environment variables set
- Review application logs

### CORS Errors
Update backend `server.js`:
```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'http://localhost:3000'],
  credentials: true
}))
```

### File Upload Issues
Ensure:
- Backend has write permissions for uploads
- Frontend API URL is correct
- Max file size is sufficient

---

## Cost Estimation

### Free Tier Options
- **Vercel**: Free with 100GB bandwidth
- **Netlify**: Free with 300GB bandwidth
- **Railway**: $5/month free credits
- **MongoDB Atlas**: 512MB database free
- **Heroku**: Paid (approx $7/month)

### Production Pricing
- Frontend hosting: $5-20/month
- Backend hosting: $10-50/month
- Database: $10-100/month
- Custom domain: $10-15/year
- **Estimated total: $50-100/month**

---

## Scaling Considerations

As your application grows:
1. Implement database sharding
2. Use message queues (Redis)
3. Add caching layer
4. Load balancing
5. Auto-scaling policies
6. CDN for global distribution

---

For more deployment support, visit:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express Deployment Guide](https://expressjs.com/en/advanced/best-practice-performance.html)
