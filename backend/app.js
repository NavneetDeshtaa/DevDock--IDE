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
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = [
  'http://localhost:5173', 
  'https://dev-dock-2xp7h6k57-navneet-deshtas-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Routes


app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.get('/', (req,res) => res.send("API Working"))


// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
