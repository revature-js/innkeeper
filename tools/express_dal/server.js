var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;

var reimbursement = require('./reimbursement');
var maintenance = require('./maintenance');
var reimbursement = require('./reimbursement');
var loginRegister = require('./loginRegister.js');
var apartments = require('./apartments');
var app = express();

var mongo = require('mongodb');
var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.get('/reimbursements', reimbursement.findAllReimbursements);
app.get('/reimbursements/:id', reimbursement.findReimbursementById);
app.get('/reimbursement/:username', reimbursement.findReimbursementsByUsername);
app.post('/reimbursements', reimbursement.addReimbursement);
app.post('/reimbursements/:id/:decision',reimbursement.updateReimbursement);

app.post('/login', loginRegister.loginUser);
app.post('/createUser' , loginRegister.createUser); //create a new user
app.get('/logout', function(req, res){ //passports logout function
  req.logout();
  res.redirect('/');
});

app.get('/apartments/allusers',apartments.allusers);
app.get('/apartments', apartments.findAllApartments);
app.get('/apartments/:aptId', apartments.findApartmentsByAptId);
app.post('/apartments/allusers/:userName/:aptId',apartments.updateAptID);
app.post('/apartments', apartments.addApartment);
app.post('/apartments/:aptId/:userName',apartments.updateApartment);
module.exports = app;

app.listen(3030);

console.log('Listening on port 3030...');