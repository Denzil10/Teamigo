const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const env = require('dotenv').config()
const Routes = require('./routes/Routes');

const app = express();
app.use(express.json());

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', Routes);

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        //error message to be sent to frontend
        console.log(err);
    });

module.exports = app;

