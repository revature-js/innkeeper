var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var express = require('express');
var mongo = require('mongodb');

var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

// Model of user
var userObj = { 
  username: {
            type: String,
            index: true
  },
  password: {type: String},
  email: {type: String},
  fname: {type: String},
  lname: {type: String},
  isAdmin: {type: String},
  aptId: {type: String},
  batch: {type: String}
};

var app = express();

app.use(cookieParser());

app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Returns a single user which matches the username the user enters
exports.getUserByUsername = function(req,res){
    var userName = req.params.userName;
    client.connect(url, function(err,db){
        var collection = db.collection('usersIK');
        collection.findOne({'username': userName}, function(err, item){
            res.send(item);
        });
        db.close();
    });
};

// Compares canidate password with password in the databse
exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};

// Returns all usernames
exports.allUsernames = function (req, res){
    client.connect(url, function(err,db){
        var collection = db.collection('usersIK');
        collection.find().toArray(function(err,items){
            if(!err){
                res.send(items);
            }
        });
        db.close();
    });
};

// Create a new user
exports.createUser = function (req, res){
    var newUser = req.body;
    var existingUser=false;
    var done = false;

    client.connect(url, function(err,db){
        var collection = db.collection('usersIK');
            collection.find().toArray(function(err,items){
                for(x in items)
                {
                    if(newUser.username === items[x].username)
                    {
                        existingUser = true;
                    }
                }
            
            if(existingUser===false)
            {   
                //Hashes the new users passwords and adds salt to the begenning.
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        newUser.password=hash;
                        collection.insert(newUser, function(err,result){
                            if(err){
                                res.status(500).send("Error: " + err);
                            }
                            else {
                                res.status(200);
                            }
                        });
                    });
                });
            }else{
                res.status(500).send("Username not available");
            }
        });
                db.close(); 
    });
};

// Login and authenticate user
exports.loginUser = function(res, req, next)
{
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); };
        if (!user) { 
            res.status(500).send("Username not found!");
            return res.redirect('/login'); 
        };
        req.logIn(user, function(err) {
            if (err) {return next(err); }

            res.status(200).json({
                user
            });
        });
    })(req, res, next);
};

// Logout user
exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};


//--------------------- Serialization ---------------------
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userObj.findById(id, function(err, user) {
    done(err, user);
  });
});
////----------------End Serialzation-----------------------

// Creates a local strategy for authenticating user
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

// Checks if user is authenticated
function ensureAuthenticated(req, res, next) { 
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

// //backdate a jwt 30 seconds
// var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

// // sign with RSA SHA256
// //var cert = fs.readFileSync('private.key');  // get private key
// // var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});
// cert = "secret";
// // sign asynchronously
// jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
//   console.log(token);
// });
//---------------------------- END TOKENS ----------------------------














