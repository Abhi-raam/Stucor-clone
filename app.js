var createError = require('http-errors');
var express = require('express');
var negotiate = require('express-negotiate')
var path = require('path');
var helpers = require('./helpers/news-helpers')
var cseHelper = require('./helpers/cse-helpers')
var civilHelper = require('./helpers/civil-helpers')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars')
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var fileUpload = require('express-fileupload')
var fs = require('fs')
var db = require('./config/connection')
var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

//database connection
db.connect((err)=>{
  if(err) console.log("Connection error" +err);
  else console.log("Database connected to port 27017");
})

app.use('/admin', adminRouter);
app.use('/', usersRouter); 
app.use(express.static('public/images'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

console.log('The server is running');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
