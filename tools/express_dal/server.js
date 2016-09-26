var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var reimbursement = require('./reimbursement');
var maintenance = require('./maintenance');
var reimbursement = require('./reimbursement');
var loginRegister = require('./loginRegister.js');

var mongo = require('mongodb');
var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

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

// app.get('/apartments', apartments.findAllApartments);
// app.get('/apartments/:aptId', apartments.findApartmentsByAptId);
// app.post('/apartments', apartments.addApartment);
// app.post('/apartments/:aptId/:userName',apartments.updateApartment);

app.get('/reimbursements', reimbursement.findAllReimbursements);
app.get('/reimbursements/:id', reimbursement.findReimbursementById);
app.get('/reimbursement/:username', reimbursement.findReimbursementsByUsername);
app.post('/reimbursements', reimbursement.addReimbursement);
app.post('/reimbursements/:id/:decision',reimbursement.updateReimbursement);

app.get('/login/:userName' , loginRegister.getUserByUsername); //finds a single user based on username
app.get('/comparePassword/:password' , loginRegister.comparePassword); //compares user password to password typed in for login
app.get('/login', loginRegister.allUsernames); // find all usernames
app.get('/logout', loginRegister.logout); //logout user
app.post('/createUser' , loginRegister.createUser); //create a new user
app.get('/IHATEMONDAYS', loginRegister.loginUser); //login user

module.exports = app;

app.listen(3030);

console.log('Listening on port 3030...');