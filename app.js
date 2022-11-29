const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config;

const app = express();

const properties_route = require('./api/routes/properties/properties');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/properties', properties_route)

app.use((req, res, next) => {
    const error = new Error('Route Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;