# Healthcare Management System (HMS)

The **Healthcare Management System (HMS)** is a platform designed for users to manage their profiles, book appointments with doctors, and for administrators to manage doctor listings and appointments. This system leverages **MongoDB** for data storage and **Node.js** with **Express.js** for backend functionality.

## Features

### 1. **User Authentication**
- **Sign Up & Login**: Users can **sign up** and **log in** using secure authentication via **JWT** (JSON Web Tokens).
- **Email Verification**: A **welcome email** is sent to users upon registration for account activation.
- **Profile Management**: After logging in, users can **view and edit** their profiles and see their booking history.

### 2. **User Dashboard**
- **Landing Page**: A user-friendly interface with easy navigation and core functionality.
- **Profile Page**: Users can manage their profile details and update personal information.
- **Appointment Booking**: Users can **book appointments** with doctors by selecting available dates and times.

### 3. **Appointment Booking System**
- **Search & Book Appointments**: Users can select a doctor and book appointments based on **availability**.
- **Authentication Middleware**: Ensures only authenticated users can access appointment booking.

### 4. **Admin Panel**
- **Admin Dashboard**: Admins can manage doctor details, view user appointments, and oversee the system.
- **Doctor Management**: Admins can **add**, **edit**, and **delete** doctor information.
- **CRUD Operations**: Admins have complete **CRUD** functionality for doctor management.

### 5. **Styling with Bootstrap & CSS**
- The application is styled using **Bootstrap** for responsive design and **custom CSS** for component styling.
- **Responsive Layout**: The app is mobile-friendly, using **Flexbox** and **Grid** for layout management.

### 6. **MongoDB Integration**
- **MongoDB** is used for storing user profiles, appointments, and doctor data.
- **Mongoose** is used to interact with MongoDB, making data handling and querying easier.
- **Cloud Database**: **MongoDB Atlas** can be used for cloud database hosting.

## Technologies Used
- **Node.js**: For the backend server and request handling.
- **Express.js**: For creating API routes and managing server functionality.
- **MongoDB**: For storing and retrieving user data and appointment details.
- **Mongoose**: For working with MongoDB in an easy and structured manner.
- **JWT**: For user authentication and secure token-based login.
- **Bootstrap**: For responsive design and frontend layout.
- **CSS**: For custom styling and component design.
- **Nodemailer**: For sending emails (e.g., welcome emails) to users.


