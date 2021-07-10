const express = require('express');
const indexRouter = require('./routes/index.js')


const app = express();
app.use('/', indexRouter);

module.exports = app;