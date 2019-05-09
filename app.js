const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const shutterRouter = require('./routes/shutters');
const customerRouter = require('./routes/customer');
const workerRouter = require('./routes/worker');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/shutters', shutterRouter);
app.use('/customer', customerRouter);
app.use('/worker', workerRouter);

module.exports = app;