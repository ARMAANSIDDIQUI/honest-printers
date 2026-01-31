const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');

// Load Passport Config
require('./config/passport');
const connectDB = require('./config/db');
const mongoose = require('mongoose');


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'https://honestprinters.in',
      'https://www.honestprinters.in',
      'https://honestprinters.in',
      'https://backend.honestprinters.in',
      'https://www.backend.honestprinters.in'
    ];
    // Allow requests with no origin (like mobile apps, curl, or same-origin in some cases)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// DB Connection Resilience Middleware
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 0) {
    console.log('⚠️ DB is disconnected. Attempting to reconnect...');
    try {
      await connectDB();
      console.log('✅ Reconnected to DB successfully');
    } catch (error) {
      console.error('❌ Failed to reconnect to DB:', error.message);
      // We don't block the request here, but it will likely fail later if it needs DB
    }
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Health/Debug Check
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const dbState = mongoose.connection.readyState;

  res.json({
    status: 'ok',
    timestamp: new Date(),
    dbState: stateMap[dbState] || dbState,
    dbHost: mongoose.connection.host,
    env: process.env.NODE_ENV
  });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
