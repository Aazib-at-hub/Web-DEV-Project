# Campus Connect Hub

A complete College Management System built with React.js, Node.js, Express.js, and MongoDB.

## Features

- **Public Interface**: View college info, departments, classes, courses, and submit inquiries.
- **Admin Dashboard**: Full CRUD for Departments, Classes, Students, and Courses.
- **Teacher Dashboard**: Take daily attendance for assigned classes, see student lists, and view history.
- **Authentication**: Role-based access control with JWT and bcrypt.
- **Business Logic**: Max 10 students per class, unique roll numbers, and single attendance per day.

## Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, Shadcn/UI, Lucide React, Sonner.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. Seed the Database (Important for initial admin/test data):
   ```bash
   npm run data:import
   ```
5. Start the Server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure API URL in the root `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Start the Frontend:
   ```bash
   npm run dev
   ```

## Deployment on Render (Backend)
1. Create a "Web Service" on Render.
2. Link your GitHub repo and set the root directory to `backend`.
3. Set the build command to `npm install`.
4. Set the start command to `npm start`.
5. Add your environment variables in the Render dashboard.

## Deployment on Netlify (Frontend)
1. Create a new site from your GitHub repo.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Set `VITE_API_URL` environment variable for your live backend.

## API Documentation

### Auth
- `POST /api/auth/login`: Login with email and password.
- `GET /api/auth/teachers`: Get list of teachers (Admin only).

### CRUD
- `/api/departments`: CRUD for departments.
- `/api/classes`: CRUD for classes.
- `/api/students`: CRUD for students.
- `/api/courses`: CRUD for courses.

### Attendance
- `POST /api/attendance`: Save or update daily attendance.
- `GET /api/attendance`: Filter by classId and date.
- `GET /api/attendance/history`: View all records (Admin only).

### Stats
- `GET /api/stats/dashboard`: Get aggregate counts for the dashboard.
