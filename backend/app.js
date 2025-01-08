var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

var app = express();

// Middleware setup
app.use(express.json({ limit: '1mb' })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}


// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://dev-dock-ide-murex.vercel.app'
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
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
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;

  console.error(`[${status}] ${err.message}`);
  res.status(status).json({ message, stack });
});

module.exports = app;
