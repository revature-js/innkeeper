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
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://ec2-54-218-76-216.us-west-2.compute.amazonaws.com', 'http://ec2-54-218-76-216.us-west-2.compute.amazonaws.com:3030', 'http://ec2-54-218-76-216.us-west-2.compute.amazonaws.com:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.get('/maintenanceCheck', maintenance.getAllTickets);
app.get('/maintenanceCheck/:usr', maintenance.getTicketsByUser);
app.get('/maintenanceTicket/:ticket_id', maintenance.getTicketById);
app.post('/maintenanceCheck', maintenance.submitNewTicket);
app.post('/maintenanceUpdate', maintenance.updateTicket);

app.get('/apartments/allusers',apartments.allusers);
app.get('/apartments', apartments.findAllApartments);
app.get('/apartments/:aptId', apartments.findApartmentsByAptId);
app.post('/apartments/allusers/:userName/:aptId',apartments.updateAptID);
app.post('/apartments', apartments.addApartment);
app.post('/apartments/:aptId/:userName',apartments.updateApartment);

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

app.listen(3030);
console.log('Listening on port 3030...');
