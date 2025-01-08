var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const connectDB = require('./config/db');

connectDB();

var app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS setup: Allow different origins based on environment
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://dev-dock-ide-murex.vercel.app']
  : ['http://localhost:5173', 'https://dev-dock-ide-murex.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Static file serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build'))); // Serve React app in production
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html')); // Fallback to React's index.html
  });
}

// API routes
app.use('/api', indexRouter);
app.use('/users', usersRouter);

// Root route
app.get('/', (req, res) => res.send('API Working'));

// Error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
