const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);
app.use(cookieParser());

// Connect to DB
connectDB();

// Routes
app.use(userRoutes);
app.use(adminRoutes);

module.exports = app;
