# Omni - Life Management Hub

A full-stack web application for managing your life - tasks, habits, goals, finance, health, and more.

## 🚀 Features

- **User Authentication** - Secure JWT-based authentication with HttpOnly cookies
- **Task Management** - Organize and track your daily tasks
- **Habit Tracker** - Build and maintain positive habits
- **Goal Manager** - Set and achieve your life goals
- **Finance Hub** - Track expenses and manage budgets
- **Health Tracker** - Monitor your health metrics
- **Analytics Dashboard** - Get insights into your productivity
- **Smart Notifications** - Stay on top of important reminders

## 🛠️ Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios
- React Context API

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt for password hashing
- Cookie-parser for HttpOnly cookies

## 📁 Project Structure

```
omni-main/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js/Express backend API
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── package.json       # Root package.json with scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd omni-main
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   Create `backend/.env`:
   ```env
   PORT=5000
   CLIENT_ORIGIN=http://localhost:3000
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=7d
   COOKIE_NAME=access_token
   COOKIE_SECURE=false
   COOKIE_SAMESITE=lax
   COOKIE_MAX_AGE_MS=604800000
   ```

   Create `frontend/.env` (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

**Option 1: Run both servers together**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/users` - List all users (debug)

### Protected Routes
- `GET /api/protected/profile` - Get user profile

### Public Routes
- `GET /api/public/health` - Health check

## 🔐 Authentication

The application uses JWT tokens stored in HttpOnly cookies for secure authentication. The frontend automatically sends cookies with every request using `withCredentials: true`.

## 🧪 Testing

Test the API endpoints using Postman or any HTTP client:

1. Register a user:
   ```json
   POST http://localhost:5000/api/auth/register
   {
     "email": "test@example.com",
     "password": "password123",
     "role": "user"
   }
   ```

2. Login:
   ```json
   POST http://localhost:5000/api/auth/login
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. Access protected route:
   ```
   GET http://localhost:5000/api/protected/profile
   ```

## 📦 Scripts

### Root Level
- `npm run dev` - Run both frontend and backend
- `npm run dev:backend` - Run backend only
- `npm run dev:frontend` - Run frontend only
- `npm run install:all` - Install all dependencies

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm start` or `npm run dev` - Start development server
- `npm run build` - Build for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Your Name

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- Express.js community for excellent documentation
