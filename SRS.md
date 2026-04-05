Software Requirements Specification
Project Title
College Management Web Application with Admin CRUD Operations and Attendance Management (React.js Stack)

1. Introduction
   1.1 Purpose
   The purpose of this project is to evaluate the full-stack web development skills of internship applicants within a constrained 5-day timeline.
   Candidates are required to develop a React.js-based web application for a college that includes:
   A public interface to display college information.
   An admin dashboard for managing departments, classes, students, and courses using CRUD operations.
   A teacher interface for managing daily student attendance.
   The project will test candidates’ skills in:
   React.js frontend development
   Backend API development
   Database modeling
   Authentication and role-based access
   UI/UX design
   Deployment

1.2 Scope
The application will provide the following functionality:
Public Interface
A publicly accessible interface that displays:
College details
Departments
Classes
Courses
Contact information
Public users will only be able to view information and will not have permission to modify any data.
Admin Interface
An authenticated admin dashboard that enables management of:
Departments
Classes
Students
Courses
The system must automatically create a default admin account during the initial setup.
Teacher Interface
A login system for teachers that allows them to:
View assigned classes
View student lists
Take daily attendance
View past attendance records
Platform Requirements
The application will be a web application built with React.js, accessible via browsers on desktop and mobile devices.
Deployment Requirements
Frontend: Deployed on Netlify
Backend: Deployed on Render (or similar platform)
Timeline
The entire project must be:
Developed
Tested
Deployed
Submitted
within 3 days from the start date.

2. Functional Requirements

2.1 Public Interface
The public interface should display general information about the college.
2.1.1 College Information
The homepage must include:
College name
College logo
Tagline or slogan
Brief "About the College" description (maximum 100 words)
2.1.2 Departments
The system must display at least 3 departments, including:
Department name
List of classes under each department
2.1.3 Classes
Each department should display its associated classes.
Each class must:
Contain exactly 10 students
2.1.4 Courses
The application must display at least 5 courses offered by the college.
Each course should contain:
Course name
Optional course description
2.1.5 Contact Information
The application must display:
College address
Phone number
Email address
Optional feature:
Contact form for submitting inquiries.
Access Control
Public users:
Can view all public information
Cannot add, edit, or delete any data

2.2 Admin Authentication
The application must provide authentication for the administrator.
Default Admin Account
An admin account must be automatically created during the initial application setup.
Example credentials:
Email:
admin@college.com
Password:
admin123
Authentication Rules
Only the admin user can access the admin dashboard.
No registration system is required.
Only one admin account is needed.

2.3 Admin CRUD Operations
The admin dashboard must allow the administrator to manage the following entities.

2.3.1 Department Management
The admin must be able to:
Create new departments
View department list
Edit department information
Delete departments
Example fields:
Department Name
Description (optional)

2.3.2 Class Management
The admin must be able to:
Add classes under a department
View all classes
Edit class details
Delete classes
Constraints:
Each class must contain exactly 10 students
Example fields:
Class Name
Department
Assigned Teacher (optional)

2.3.3 Student Management
The admin must be able to:
Add students
Edit student details
Delete students
View student list
Constraints:
Each student must belong to one class
Each class must contain a maximum of 10 students
Example fields:
Student Name
Roll Number
Email
Assigned Class

2.3.4 Course Management
The admin must be able to:
Add courses
Edit courses
Delete courses
View course list
Example fields:
Course Name
Course Description

2.3.5 Contact Submissions (Optional)
If the contact form is implemented, the admin must be able to:
View contact submissions
Read messages from users
No editing or deleting is required.

2.4 Teacher Attendance Management
Teachers must be able to log in using predefined credentials.
Teacher credentials may be:
Hardcoded in the backend
Managed by the admin

Teacher Dashboard
After logging in, teachers must be able to view:
Assigned department(s)
Assigned class(es)
Student list for each class
Each class must contain 10 students.

Attendance Features
Teachers must be able to take daily attendance for their classes.
For each student, the teacher must select one of the following statuses:
Present
Absent
Late
Attendance must be:
Stored date-wise
Saved in the database

Attendance Records
Teachers must be able to:
View past attendance records
Filter attendance by date or class (optional)

Admin Attendance Access
The admin may optionally be able to:
View attendance reports
Access attendance data in read-only mode

3. Non-Functional Requirements

3.1 Technology Stack
The application must use the following stack:
Frontend
React.js
Backend
Node.js with Express.js
Database
MongoDB

3.2 UI/UX Requirements
The application must have:
Clean and modern UI
Responsive layout
Mobile-friendly design
Simple and intuitive navigation
Interfaces required:
Public interface
Admin dashboard
Teacher dashboard
The design should maintain:
Consistent layout
Readable typography
Minimal learning curve

3.3 Security Requirements
The system must implement the following security practices:
Password hashing using bcrypt
Role-based access control
Roles include:
Public User
Admin
Teacher
Protected routes must prevent unauthorized access.

3.4 Deployment Requirements
The application must be deployed online.
Frontend deployment:
Netlify
Backend deployment:
Render or similar Node.js hosting service
The frontend must communicate with the deployed backend API.

3.5 Time Constraint
All project stages must be completed within 5 days, including:
Development
Testing
Deployment
Submission

4. Deliverables
   Candidates must submit the following:
1. Source Code
   A public GitHub repository containing:
   Complete project source code
   Clear commit history

1. README File
   The repository must include a README containing:
   Project overview
   Setup and installation instructions
   Backend setup instructions
   Netlify deployment steps
   Environment configuration details

1. Deployment Links
   Candidates must provide:
   Live Netlify deployment link
   Deployed backend API link

1. Build Instructions
   Instructions to generate:
   Production frontend build
   Optional mobile build if implemented

1. Evaluation Criteria
   Candidates will be evaluated based on the following criteria.
   Feature Completeness
   All required features implemented correctly
   Data Structure and Logic
   Proper implementation of:
   Departments
   Classes
   Students (10 per class)
   Authentication
   Functional admin login system
   CRUD Functionality
   Fully working CRUD operations for admin dashboard
   Attendance System
   Functional teacher attendance management
   UI/UX
   Clean and user-friendly interface
   Proper responsiveness
   Deployment
   Successful live deployment on Netlify
   Code Quality
   Clean project structure
   Maintainable code
   Meaningful commit history
   Timeline Compliance
   Submission within the 5-day deadline
