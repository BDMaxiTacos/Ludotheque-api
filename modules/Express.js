const express = require('express');
const CORS = require('cors');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

app.use(CORS('*'));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ExpressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});

app.use(ExpressSession);

const PassportJS = require('passport');
app.use(PassportJS.initialize());
app.use(PassportJS.session());

module.exports = { app };
