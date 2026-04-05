# Campus Connect Hub - Technical Documentation

## 1. Project Overview
Campus Connect Hub is a full-stack College Management System designed to streamline academic operations. It provides a public interface for prospective students, an Administrative dashboard for record management, and a Teacher portal for attendance tracking.

### Core Features
- **Public Website**: View Departments, Classes, and Courses.
- **Admin Dashboard**: Full CRUD (Create, Read, Update, Delete) for fundamental entities.
- **Teacher Portal**: Class-specific student lists and daily attendance management.
- **Security**: JWT Authentication and Role-Based Access Control (RBAC).

## 2. Technology Stack
- **Frontend**: React.js 18, TypeScript, TailwindCSS, Lucide Icons, Shadcn/UI.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (NoSQL).
- **Authentication**: JSON Web Tokens (JWT) & BcryptJS.

## 3. System Architecture
The application follows a client-server architecture:
- **Client**: Single Page Application (SPA) built with React.
- **Server**: RESTful API built with Express.
- **Data Layer**: Mongoose ODM for MongoDB interactions.

## 4. Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)

### Local Development
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aazib-at-hub/Web-DEV-Project.git
   cd Web-DEV-Project
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in `/backend`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret_key
   ```
   Seed the initial data:
   ```bash
   npm run data:import
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ..
   npm install
   ```
   Create a `.env` file in the root:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

## 5. Deployment Guide

### Backend (Render)
1. Create a new **Web Service** on Render.com.
2. Connect your GitHub repository.
3. Set **Root Directory** to `backend`.
4. Build Command: `npm install`.
5. Start Command: `node server.js`.
6. Add Environment Variables: `MONGO_URI`, `JWT_SECRET`, `PORT`.

### Frontend (Netlify)
1. Create a new site on Netlify.com.
2. Connect your GitHub repository.
3. Build Command: `npm run build`.
4. Publish Directory: `dist`.
5. Add Environment Variable: `VITE_API_URL` (Set to your Render backend URL).

## 6. API Reference

### Authentication
- `POST /api/auth/login`: Authenticate user and return token.
- `GET /api/auth/teachers`: Fetch list of all teachers (Admin only).

### Management (Admin Only)
- `/api/departments`: CRUD for departments.
- `/api/classes`: CRUD for classes.
- `/api/students`: CRUD for students (Max 10 per class).
- `/api/courses`: CRUD for courses.

### Attendance
- `POST /api/attendance`: Save daily attendance (Teacher only).
- `GET /api/attendance`: Fetch attendance by class and date.
- `GET /api/stats/dashboard`: Real-time aggregate statistics.

## 7. Build Instructions
To generate a production-ready build of the frontend:
```bash
npm run build
```
The output will be located in the `/dist` directory, ready to be served by any static hosting provider.
