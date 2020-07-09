const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();

// Accept JSON bodies
app.use(express.json());

// Pass by JSON on POST
app.use(express.urlencoded({ extended: true }));

// Cross-origin
app.use(cors());

// Router
app.use(router);

module.exports = app;