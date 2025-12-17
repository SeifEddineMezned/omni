# Omni Backend API

Node.js + Express backend with JWT authentication using HttpOnly cookies.

## Features

- JWT authentication stored in HttpOnly cookies
- User registration and login
- Protected routes with authentication middleware
- Role-based access (admin/user)
- CORS configured for React frontend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (see `.env.example` or copy from `.env` template)

3. Start development server:
```bash
npm run dev
```

4. Start production server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/users` - List all users (debug only)

### Protected Routes
- `GET /api/protected/profile` - Get user profile (requires authentication)

### Public Routes
- `GET /api/public/health` - Health check endpoint

## Environment Variables

See `.env` file for configuration options:
- `PORT` - Server port (default: 5000)
- `CLIENT_ORIGIN` - React frontend URL (default: http://localhost:3000)
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - Token expiration time (default: 7d)
- `COOKIE_NAME` - Cookie name for JWT (default: access_token)
- `COOKIE_SECURE` - Use secure cookies (default: false for dev)
- `COOKIE_SAMESITE` - SameSite cookie policy (default: lax)
- `COOKIE_MAX_AGE_MS` - Cookie max age in milliseconds (default: 7 days)

## Testing with Postman

1. Register a user:
   - POST `http://localhost:5000/api/auth/register`
   - Body: `{ "email": "test@test.com", "password": "test123", "role": "admin" }`

2. Login:
   - POST `http://localhost:5000/api/auth/login`
   - Body: `{ "email": "test@test.com", "password": "test123" }`
   - Check Cookies tab in Postman for `access_token`

3. Access protected route:
   - GET `http://localhost:5000/api/protected/profile`
   - Cookie will be sent automatically if using same Postman session

## Frontend Integration

Configure Axios to send cookies:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // IMPORTANT: Send HttpOnly cookies
});
```

