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
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true, // Allow cookies and other credentials
  })
);

// Routes


app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.get('/', (req,res) => res.send("API Working"))


// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
