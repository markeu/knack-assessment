const express = require('express');
const httpStatus = require('http-status');

const routes = require('./routes');
const AppError = require('./utils/AppError');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

// v1 api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
