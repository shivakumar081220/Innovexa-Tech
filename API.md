# API Documentation - Innovexa Tech

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, no authentication is required. All endpoints are public.

---

## User Requests Endpoints

### Get All User Requests
```
GET /user-requests
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+91 9876543210",
    "collegeName": "IIT Delhi",
    "projectTitle": "E-commerce Platform",
    "projectDomain": "MERN Stack",
    "projectType": "Major",
    "technologiesRequired": "React, Node.js, MongoDB",
    "deadline": "2024-06-30T00:00:00.000Z",
    "budget": 150000,
    "detailedRequirements": "Full-featured e-commerce...",
    "needProjectReport": "Yes",
    "preferredCommunication": "Email",
    "referenceFiles": ["file1.pdf", "file2.jpg"],
    "status": "Pending",
    "createdAt": "2024-05-15T10:00:00.000Z",
    "updatedAt": "2024-05-15T10:00:00.000Z"
  }
]
```

### Get Single User Request
```
GET /user-requests/:id
```

**Parameters:**
- `id` (string, required) - Request ID

**Response:** Single request object

### Create User Request
```
POST /user-requests
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+91 9876543210",
  "collegeName": "IIT Delhi",
  "projectTitle": "E-commerce Platform",
  "projectDomain": "MERN Stack",
  "projectType": "Major",
  "technologiesRequired": "React, Node.js, MongoDB",
  "deadline": "2024-06-30",
  "budget": 150000,
  "detailedRequirements": "Full-featured e-commerce...",
  "needProjectReport": "Yes",
  "preferredCommunication": "Email",
  "referenceFiles": ["file1.pdf"]
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  // ... rest of object
  "status": "Pending",
  "createdAt": "2024-05-15T10:00:00.000Z"
}
```

**Status Code:** 201 Created

### Update User Request
```
PUT /user-requests/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "In Progress"
}
```

**Response:** Updated request object

### Delete User Request
```
DELETE /user-requests/:id
```

**Response:**
```json
{
  "message": "Request deleted successfully"
}
```

---

## Projects Endpoints

### Get All Projects
```
GET /projects
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "E-Commerce Platform",
    "description": "Full-featured e-commerce platform with payment integration",
    "domain": "MERN Stack",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "image": "project-1.jpg",
    "githubLink": "https://github.com/example/ecommerce",
    "liveLink": "https://ecommerce-demo.com",
    "screenshots": [],
    "createdAt": "2024-05-15T10:00:00.000Z",
    "updatedAt": "2024-05-15T10:00:00.000Z"
  }
]
```

### Get Single Project
```
GET /projects/:id
```

**Response:** Single project object

### Create Project
```
POST /projects
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "E-Commerce Platform",
  "description": "Full-featured e-commerce...",
  "domain": "MERN Stack",
  "technologies": ["React", "Node.js", "MongoDB"],
  "image": "project-1.jpg",
  "githubLink": "https://github.com/example/ecommerce",
  "liveLink": "https://ecommerce-demo.com"
}
```

**Response:** 201 Created

### Update Project
```
PUT /projects/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Delete Project
```
DELETE /projects/:id
```

---

## Reports Endpoints

### Get All Reports
```
GET /reports
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "title": "APA Format Template",
    "format": "APA",
    "description": "Standard APA format report template",
    "file": "apa-template.pdf",
    "createdAt": "2024-05-15T10:00:00.000Z",
    "updatedAt": "2024-05-15T10:00:00.000Z"
  }
]
```

### Get Single Report
```
GET /reports/:id
```

### Create Report
```
POST /reports
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "APA Format Template",
  "format": "APA",
  "description": "Standard APA format",
  "file": "apa-template.pdf"
}
```

### Update Report
```
PUT /reports/:id
```

### Delete Report
```
DELETE /reports/:id
```

---

## File Upload Endpoint

### Upload File
```
POST /upload
Content-Type: multipart/form-data
```

**Parameters:**
- `file` (file, required) - File to upload

**Response:**
```json
{
  "message": "File uploaded successfully",
  "filename": "file-1234567890.jpg"
}
```

**Supported Formats:**
- Images: JPEG, JPG, PNG, GIF
- Documents: PDF, DOC, DOCX

**Max Size:** 10MB

**Error Response:**
```json
{
  "message": "Invalid file type. Only images and documents are allowed."
}
```

---

## Dashboard Endpoints

### Get Dashboard Statistics
```
GET /dashboard/stats
```

**Response:**
```json
{
  "totalRequests": 25,
  "completedProjects": 12,
  "pendingRequests": 8,
  "satisfactionRate": 99
}
```

### Get Recent Inquiries
```
GET /dashboard/recent-inquiries
```

**Response:** Array of 5 most recent user requests

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## Error Handling

### Error Response Format
```json
{
  "message": "Error description"
}
```

### Common Errors

**Validation Error:**
```json
{
  "message": "Validation failed: email is required"
}
```

**Not Found:**
```json
{
  "message": "Request not found"
}
```

**Server Error:**
```json
{
  "message": "Internal Server Error"
}
```

---

## Request Headers

### Required Headers
- `Content-Type: application/json` (for JSON requests)
- `Content-Type: multipart/form-data` (for file uploads)

---

## Rate Limiting
Currently not implemented. Recommended for production:
- 100 requests per minute per IP

---

## Pagination (Future Feature)
Not currently implemented. Consider adding:
- `?page=1&limit=10`
- Response includes `total` and `page` info

---

## Filtering (Future Feature)
```
GET /user-requests?status=Pending
GET /projects?domain=MERN
```

---

## Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import"
3. Paste collection JSON (coming soon)
4. Select your environment

### Sample Requests

**Create Request:**
```
POST http://localhost:5000/api/user-requests
{
  "fullName": "Test User",
  "email": "test@example.com",
  "phoneNumber": "+91 9876543210",
  "collegeName": "Test College",
  "projectTitle": "Test Project",
  "projectDomain": "MERN Stack",
  "projectType": "Mini",
  "technologiesRequired": "React, Node.js",
  "deadline": "2024-12-31",
  "budget": 50000,
  "detailedRequirements": "Test project requirements"
}
```

---

## Best Practices

1. **Always validate input** on frontend and backend
2. **Use appropriate HTTP methods** (GET, POST, PUT, DELETE)
3. **Include error handling** in client code
4. **Validate file uploads** for size and type
5. **Log requests** for debugging
6. **Use pagination** for large datasets
7. **Implement rate limiting** in production
8. **Add authentication** before production
9. **Use HTTPS** for all requests
10. **Document custom endpoints** clearly

---

## API Performance

### Response Times
- Average: 50-100ms
- File upload: 500-2000ms (depends on size)

### Optimization Tips
- Use indexed queries in database
- Implement caching
- Compress responses with gzip
- Use CDN for static files
- Implement pagination

---

## SDK/Client Libraries

### JavaScript/Node.js
```javascript
import api from './services/api.js'

// Already configured in frontend
const requests = await api.get('/user-requests')
```

### cURL Examples
```bash
# Get all requests
curl http://localhost:5000/api/user-requests

# Create request
curl -X POST http://localhost:5000/api/user-requests \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John", "email":"john@example.com"}'
```

---

## Changelog

### v1.0.0
- Initial API release
- All CRUD endpoints
- File upload support
- Dashboard statistics

---

For API support and documentation updates, refer to:
- Backend code: `/backend/routes/`
- Sample requests in SETUP.md
- Test with Postman collection (coming soon)
