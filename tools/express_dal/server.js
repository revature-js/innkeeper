var express = require('express');
var bodyParser = require('body-parser');

var reimbursement = require('./reimbursement');
var maintenance = require('./maintenance');
var reimbursement = require('./reimbursement');
var loginRegister = require('./loginRegister.js');
<<<<<<< HEAD
var projections = require('./projections');

var apartments = require('./apartments');
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userObj.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username,password,done) {
    client.connect(url, function(err,db){
      var collection = db.collection('usersIK');
      collection.findOne({username:username}, function(err, user){
        if (err){return done(err);}
        if (!user){
          return done(null, false, {message: 'Incorrect username.'});
        }
        return done(null, user);
      });
    });
  }
));
=======
var apartments = require('./apartments');
>>>>>>> dev

var app = express();

app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
=======
>>>>>>> dev

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

app.get('/apartments', apartments.findAllApartments);
app.get('/apartments/:aptId', apartments.findApartmentsByAptId);
app.post('/apartments', apartments.addApartment);
app.post('/apartments/:aptId/:userName',apartments.updateApartment);

app.get('/reimbursements', reimbursement.findAllReimbursements);
app.get('/reimbursements/:id', reimbursement.findReimbursementById);
app.get('/reimbursement/:username', reimbursement.findReimbursementsByUsername);
app.post('/reimbursements', reimbursement.addReimbursement);
app.post('/reimbursements/:id/:decision',reimbursement.updateReimbursement);

app.get('/login/:userName' , loginRegister.getUserByUsername);
app.get('/comparePassword/:password' , loginRegister.comparePassword);
app.post('/createUser' , loginRegister.createUser);
app.post('/login/:username/:aptId',apartments.updateAptID);
app.get('/login', loginRegister.allUsernames);

app.listen(3030);
console.log('Listening on port 3030...');
