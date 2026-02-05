# Admin Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Setup MongoDB
- Install MongoDB locally OR use MongoDB Atlas (cloud)
- Update `MONGODB_URI` in `.env.local`

## 3. Create First Admin User
Run this command to create an admin user:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dentalini.com",
    "password": "admin123",
    "name": "Admin"
  }'
```

Or use this Node.js script:
```javascript
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@dentalini.com',
    password: 'admin123',
    name: 'Admin'
  })
})
```

## 4. Login
- Go to: http://localhost:3000/admin/login
- Email: admin@dentalini.com
- Password: admin123

## 5. Change Password
After first login, change the default password immediately!

## Admin Features
- **Services**: Manage dental services
- **FAQs**: Manage frequently asked questions
- **Gallery**: Manage before/after images
- **Media**: Upload and manage media files
- **Team**: Manage team members
- **Affiliations**: Manage partner logos
- **General Info**: Update hours, address, contact, banner
- **Enquiries**: View contact form submissions
