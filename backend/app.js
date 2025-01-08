var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const connectDB = require('./config/db');

connectDB();

var app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}

const allowedOrigins = [
  'http://localhost:5173',
  'https://dev-dock-ide-murex.vercel.app'
];

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

app.options('*', cors()); 

// Routes
app.use('/api', indexRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API is working', status: 'success' });
});

// Error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message, stack: err.stack });
  } else {
    res.status(err.status || 500).json({ message: 'Internal Server Error' });
  }
});

module.exports = app;