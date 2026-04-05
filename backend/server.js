require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));
// Department Routes
app.use('/api/departments', require('./routes/departmentRoutes'));
// Class Routes
app.use('/api/classes', require('./routes/classRoutes'));
// Student Routes
app.use('/api/students', require('./routes/studentRoutes'));
// Course Routes
app.use('/api/courses', require('./routes/courseRoutes'));
// Attendance Routes
app.use('/api/attendance', require('./routes/attendanceRoutes'));
// Contact Routes
app.use('/api/contact', require('./routes/contactRoutes'));
// Stats Routes
app.use('/api/stats', require('./routes/statsRoutes'));

// Error Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
