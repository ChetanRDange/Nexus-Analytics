# Authentication Setup - Blackcoffer Dashboard

## ✅ Completed Setup

### 1. User Created in MongoDB

- **Email**: dangechetan3@gmail.com
- **Password**: chetan3242#
- **Role**: admin
- **Status**: Active

### 2. Authentication API Endpoints

#### Login

- **URL**: `POST http://localhost:5000/api/auth/login`
- **Body**:

```json
{
  "email": "dangechetan3@gmail.com",
  "password": "chetan3242#"
}
```

- **Response**:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "email": "dangechetan3@gmail.com",
      "name": "Chetan Dange",
      "role": "admin",
      "lastLogin": "2025-11-24T..."
    },
    "token": "mock-jwt-token-..."
  }
}
```

#### Register

- **URL**: `POST http://localhost:5000/api/auth/register`
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

#### Get Profile

- **URL**: `GET http://localhost:5000/api/auth/profile?email=dangechetan3@gmail.com`

### 3. Frontend Login Integration

The Login page (`frontend/src/pages/Login.jsx`) has been updated to:

- Use the new authentication API
- Store token and user data in localStorage
- Redirect to `/dashboard` on successful login
- Display success/error messages with toast notifications

### 4. Files Created/Modified

**Backend:**

- `models/User.js` - User schema
- `controllers/auth-controller.js` - Login, register, profile handlers
- `routes/auth.js` - Auth route definitions
- `server.js` - Added auth routes
- `scripts/createUser.js` - Script to create/update user
- `scripts/testLogin.js` - Script to test login API

**Frontend:**

- `pages/Login.jsx` - Updated to use new auth API

## 🚀 How to Use

### Start Backend Server

```bash
cd backend
npm run dev
```

Server will run on http://localhost:5000

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173

### Login Steps

1. Open http://localhost:5173/login
2. Enter credentials:
   - Email: dangechetan3@gmail.com
   - Password: chetan3242#
3. Click "Login"
4. You will be redirected to the dashboard

## 📝 Notes

- The authentication is basic (no JWT encryption, no bcrypt)
- For production, you should:
  - Use bcrypt to hash passwords
  - Use proper JWT token generation and verification
  - Add token expiration
  - Add refresh token mechanism
  - Add middleware for route protection
  - Add password reset functionality

## 🔧 Create New User Manually

Run the script:

```bash
cd backend
node scripts/createUser.js
```

Or modify the script to create different users.

## 🧪 Test Login API

You can test the API using:

### Method 1: Test Script

```bash
cd backend
node scripts/testLogin.js
```

### Method 2: Postman or similar tool

POST http://localhost:5000/api/auth/login
Body (JSON):

```json
{
  "email": "dangechetan3@gmail.com",
  "password": "chetan3242#"
}
```

### Method 3: Browser Console

```javascript
fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "dangechetan3@gmail.com",
    password: "chetan3242#",
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

## ✨ Features

- ✅ User login with email/password
- ✅ User registration
- ✅ Profile retrieval
- ✅ Last login tracking
- ✅ Remember me functionality
- ✅ Toast notifications for success/error
- ✅ Token storage in localStorage
- ✅ Auto-redirect to dashboard after login
