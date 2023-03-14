var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const expressSession = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var home_pRouter = require('./routes/home_p');
var etudiantRouter = require('./routes/etudiant');
var filiereRouter = require('./routes/filiere');
var moduleRouter = require('./routes/module');
var absenceRouter = require('./routes/absence');
var seanceRouter = require('./routes/seance');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var hbs = require('hbs');

hbs.registerHelper('each_upto', function(ary, max, options) {
  if(!ary || ary.length == 0)
      return options.inverse(this);

  var result = [ ];
  for(var i = 0; i < max && i < ary.length; ++i)
      result.push(options.fn(ary[i]));
  return result.join('');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret: 'admin' , saveUninitialized : false , resave : false}));
app.use(express.static(path.join(__dirname, 'public')));








mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/GestionAbs' , { useNewUrlParser: true , useUnifiedTopology: true } , (err)=>{
if(err){ console.log(err);
}
else {
  console.log('connected');
}
});









app.use('/', indexRouter);
app.use('/utilisateurs', usersRouter);
app.use('/home', homeRouter);
app.use('/home_p', home_pRouter);
app.use('/etudiants', etudiantRouter);
app.use('/filieres', filiereRouter);
app.use('/modules', moduleRouter);
app.use('/generate-manuel', absenceRouter);
app.use('/seances', seanceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
