var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var reimbursement = require('./reimbursement');
var maintenance = require('./maintenance');
var reimbursement = require('./reimbursement');
var loginRegister = require('./loginRegister.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');


app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/reimbursements', reimbursement.findAllReimbursements);
app.get('/reimbursements/:id', reimbursement.findReimbursementById);
app.post('/reimbursements', reimbursement.addReimbursement);
app.post('/reimbursements/:id',reimbursement.updateReimbursement);


app.get('/login/:userName' , loginRegister.getUserByUsername);
app.get('/comparePassword/:password' , loginRegister.comparePassword);
app.post('/createUser' , loginRegister.createUser);

app.listen(3030);
console.log('Listening on port 3030...');