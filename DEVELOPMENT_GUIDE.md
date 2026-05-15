# Development Guide - Innovexa Tech

## 👨‍💻 For Developers & Contributors

This guide provides best practices and workflows for developing and maintaining Innovexa Tech.

---

## 🎯 Development Workflow

### Before You Start
1. Read project documentation
2. Understand the architecture
3. Setup development environment
4. Review existing code patterns
5. Check for similar implementations

### Feature Development Process

```
1. Create Feature Branch
   git checkout -b feature/feature-name

2. Develop Locally
   - Make changes
   - Test thoroughly
   - Follow code style

3. Commit Changes
   - Write clear commit messages
   - Keep commits atomic

4. Push & Create PR
   - Push to feature branch
   - Create pull request
   - Add description

5. Code Review
   - Address feedback
   - Update code

6. Merge
   - Squash commits if needed
   - Delete feature branch
```

---

## 📝 Coding Standards

### JavaScript/React

**File Naming**
```
Components: PascalCase (MyComponent.jsx)
Utilities: camelCase (myUtils.js)
Hooks: camelCase (useMyHook.js)
```

**Component Structure**
```javascript
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Component.module.css'

const Component = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null)

  const handleClick = () => {
    setState(true)
  }

  return (
    <motion.div>
      {/* Content */}
    </motion.div>
  )
}

export default Component
```

**Best Practices**
- Use functional components
- Hooks for state management
- Destructure props
- Add PropTypes or TypeScript (future)
- Comment complex logic
- Keep functions small and focused

### Backend (Node.js/Express)

**File Organization**
```
routes/
├── resource.js        # All CRUD operations
└── index.js          # Route aggregation

models/
└── Resource.js       # Mongoose schema

controllers/
└── resourceController.js
```

**API Endpoint Pattern**
```javascript
// GET - Retrieve
router.get('/', async (req, res) => {})
router.get('/:id', async (req, res) => {})

// POST - Create
router.post('/', async (req, res) => {})

// PUT - Update
router.put('/:id', async (req, res) => {})

// DELETE - Delete
router.delete('/:id', async (req, res) => {})
```

**Error Handling**
```javascript
try {
  // Logic
} catch (error) {
  res.status(400).json({ message: error.message })
}
```

---

## 🧪 Testing

### Unit Tests (Future)
```bash
npm test
```

### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Forms validate correctly
- [ ] API returns correct data
- [ ] Database updates correctly

### Testing Different Scenarios

**Form Submission**
- Empty fields
- Invalid email
- Valid submission
- File upload errors

**API Calls**
- Success response
- Error response
- Network timeout
- Invalid data

**UI Elements**
- Hover effects
- Click actions
- Navigation
- Mobile menu

---

## 🔍 Code Review Checklist

### Before Submitting PR
- [ ] Code follows style guide
- [ ] No console.log left
- [ ] No commented code
- [ ] Tests pass
- [ ] No new warnings
- [ ] Documentation updated
- [ ] Branch is up to date

### When Reviewing Code
- [ ] Logic is correct
- [ ] Edge cases handled
- [ ] Error handling present
- [ ] Performance acceptable
- [ ] Security concerns addressed
- [ ] Code is readable
- [ ] Tests are adequate

---

## 🐛 Debugging Guide

### Frontend Debugging

**Browser DevTools**
```
F12 or Right-click → Inspect

Console Tab:
- Check for errors
- Log values: console.log()
- Break on errors: Pause on exceptions

Network Tab:
- Check API responses
- Monitor request/response
- Check timing

Sources Tab:
- Set breakpoints
- Step through code
- Watch expressions
```

**React DevTools**
```
Install React DevTools extension
- Inspect component tree
- Check props and state
- Highlight re-renders
```

### Backend Debugging

**Console Logging**
```javascript
console.log('Debug:', variable)
console.error('Error:', error)
```

**Check Logs**
```bash
# In terminal running server
# Look for error messages
```

**MongoDB Debugging**
```javascript
// Log queries
db.collection.find().explain("executionStats")

// Check data
db.collection.find().pretty()
```

---

## 📦 Dependency Management

### Adding Dependencies

**Frontend**
```bash
cd frontend
npm install package-name
npm install --save-dev dev-package
```

**Backend**
```bash
cd backend
npm install package-name
npm install --save-dev dev-package
```

### Updating Dependencies
```bash
npm update              # Update to latest minor/patch
npm install package@latest  # Update to latest version
npm outdated           # Check for outdated packages
```

### Removing Dependencies
```bash
npm uninstall package-name
```

---

## 🎨 Component Development

### Creating a New Page

**Steps:**
1. Create file in `src/pages/user/` or `src/pages/admin/`
2. Import necessary components and hooks
3. Create component with proper structure
4. Add route in `App.jsx`
5. Add navigation link in Navbar

**Template:**
```javascript
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NewPage = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetch data
  }, [])

  return (
    <div>
      <Navbar />
      {/* Page content */}
      <Footer />
    </div>
  )
}

export default NewPage
```

### Creating a New API Endpoint

**Steps:**
1. Create/update route in `backend/routes/resource.js`
2. Add handler logic
3. Add MongoDB query in model
4. Test with API client
5. Update API documentation

**Template:**
```javascript
import express from 'express'
import Model from '../models/Model.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await Model.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
```

---

## 🔒 Security Best Practices

### Input Validation
```javascript
// Frontend
if (!email.includes('@')) {
  showError('Invalid email')
  return
}

// Backend
const schema = userRequestSchema.validate(req.body)
if (schema.error) {
  return res.status(400).json({ message: schema.error })
}
```

### XSS Prevention
```javascript
// React automatically escapes values
// Never use dangerouslySetInnerHTML
<div>{userInput}</div>  // Safe
<div dangerouslySetInnerHTML={{ __html: html }} /> // Unsafe
```

### SQL/NoSQL Injection Prevention
```javascript
// Use ORM/ODM (Mongoose)
// Avoid string concatenation
Model.find({ email: userEmail })  // Safe

// Never do:
db.collection('users').find(JSON.parse(userInput))  // Unsafe
```

---

## 📊 Performance Optimization

### Frontend

**Image Optimization**
```javascript
// Use appropriate formats
// .jpg for photos
// .png for graphics
// .webp for modern browsers

// Compress before upload
// Use tools like TinyPNG
```

**Code Splitting**
```javascript
// React Router already handles this
// Dynamic imports for lazy loading
const Component = React.lazy(() => import('./Component'))
```

**Memoization**
```javascript
import { memo } from 'react'

const Component = memo(({ prop }) => {
  return <div>{prop}</div>
})
```

### Backend

**Database Indexing**
```javascript
// In MongoDB
db.users.createIndex({ email: 1 })
```

**Query Optimization**
```javascript
// Select specific fields
Model.find({}, { name: 1, email: 1 })

// Limit results
Model.find().limit(10).skip(offset)

// Use lean() for read-only queries
Model.find().lean()
```

---

## 📚 Git Workflow

### Common Commands

```bash
# Clone repository
git clone <repo-url>

# Create feature branch
git checkout -b feature/feature-name

# Check status
git status

# Stage changes
git add .
git add file-name

# Commit
git commit -m "feat: Add new feature"

# Push
git push origin feature/feature-name

# Pull latest
git pull origin main

# View history
git log --oneline

# Undo last commit
git reset HEAD~1

# Stash changes
git stash
```

### Branch Naming
```
feature/user-authentication
bugfix/form-validation
docs/api-documentation
refactor/database-queries
```

### Commit Messages
```
feat: Add user login
fix: Resolve form validation bug
docs: Update API documentation
style: Format code
refactor: Optimize database queries
test: Add unit tests
chore: Update dependencies
```

---

## 🚀 Deployment Workflow

### Pre-Deployment

**Checklist**
- [ ] All tests pass
- [ ] No console errors
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Environment variables set
- [ ] Database backups created

**Testing**
```bash
# Build frontend
cd frontend && npm run build

# Test backend
npm test

# Run locally with production settings
NODE_ENV=production npm start
```

### Deployment

**Steps**
1. Merge to main branch
2. Pull latest on server
3. Install dependencies: `npm install`
4. Run migrations (if any)
5. Restart server
6. Monitor for errors

---

## 🔄 Continuous Integration (CI/CD)

### Recommended Setup
```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - run: deploy-to-production
```

---

## 📖 Documentation Standards

### Code Comments
```javascript
// ✅ Good
// Calculate total price including tax
const total = price * (1 + TAX_RATE)

// ❌ Bad
// Add tax
const total = price * 1.18
```

### Function Documentation
```javascript
/**
 * Calculates the total price
 * @param {number} price - Base price
 * @param {number} taxRate - Tax rate (0.18 for 18%)
 * @returns {number} Total price
 */
function calculateTotal(price, taxRate) {
  return price * (1 + taxRate)
}
```

### README Updates
- Document new features
- Update configuration sections
- Add troubleshooting if needed

---

## 🎓 Onboarding Checklist

For new developers:
- [ ] Read project documentation
- [ ] Setup development environment
- [ ] Run project locally
- [ ] Understand project structure
- [ ] Review existing code
- [ ] Make first contribution
- [ ] Get code reviewed
- [ ] Deploy to staging

---

## ❓ Common Questions

**Q: Where should I add a new component?**
A: If it's reusable → `components/`, if it's page-specific → `pages/`

**Q: How do I add a new API endpoint?**
A: Create route in `backend/routes/`, add handler, register in `server.js`

**Q: What if database is full?**
A: Check MongoDB Atlas quotas, delete old data, upgrade plan

**Q: How do I handle authentication?**
A: Use JWT tokens (currently not implemented, planned for future)

**Q: Can I use external libraries?**
A: Yes, but check bundle size and maintainability

---

## 🔗 Useful Resources

### Tools
- VS Code - Code editor
- MongoDB Compass - Database GUI
- Postman - API testing
- Git - Version control

### Documentation
- [React Docs](https://react.dev)
- [Express Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)

### Communities
- Stack Overflow
- GitHub Discussions
- Dev.to
- Reddit (r/webdev, r/node)

---

## 🐞 Bug Reporting

### Report Format
```
**Description:** Clear description of the bug

**Steps to Reproduce:**
1. Step 1
2. Step 2

**Expected Behavior:** What should happen

**Actual Behavior:** What actually happens

**Environment:** Browser, OS, Node version

**Screenshots:** If applicable
```

---

## 💡 Contributing Guidelines

1. Fork the repository
2. Create feature branch
3. Make changes
4. Write/update tests
5. Update documentation
6. Submit pull request
7. Address review comments
8. Get merged!

---

## 📋 Project Maintenance

### Weekly
- Review and merge PRs
- Update dependencies
- Monitor performance

### Monthly
- Review and close issues
- Plan next features
- Security audit
- Performance optimization

### Quarterly
- Major version updates
- Architecture review
- Team planning

---

## 🎯 Best Practices Summary

✅ DO:
- Write clean, readable code
- Add comments for complex logic
- Test your changes
- Follow naming conventions
- Keep functions small
- Update documentation
- Commit regularly

❌ DON'T:
- Leave console.log in production code
- Use var (use const/let)
- Ignore error messages
- Make huge commits
- Modify without testing
- Hardcode values
- Copy-paste code

---

**Happy coding! 🚀**

For questions or suggestions, refer to main documentation or create an issue.
