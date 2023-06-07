const express = require('express');
const cors = require('cors');
const Routes = require('./routes/Routes');
// const connectDB = require('./utils/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', Routes);

// Connect to MongoDB
// connectDB();

module.exports = app;

