var mongo = require('mongodb');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;

//----------------------Set up Passport---------------------------//

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        client.connect(url, function(err,db){
            var collection = db.collection('usersIK');
            collection.findOne({username:username}, function(err, user){
                if(err){ done(err);}
                if(!user){
                    return done(null, false);
                }
                comparePassword(password, user.password, function(err, isMatch){
                    if(err){done(err);}
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                });
            });
        });
}));

//------------------End Set up Passport---------------------------//



//----------------------------MongoDB-----------------------------//

var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

//------------------------End MongoDB-----------------------------//


comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};

exports.loginUser = function(req,res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            return res.redirect('/login'); 
        }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.status(200).json({
                user
            });
        });
    })(req, res, next);
};

exports.createUser = function (req, res){
    var newUser = req.body;
    var existingUser=false;

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
        
            if(existingUser===true)
            {
                res.status(500).send({error: "Username is not avaliable"});
            }else{
            //Hashes the new users passwords and adds salt to the begenning.
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        newUser.password=hash;
                        collection.insert(newUser, function(err,result){
                            if(err){
                                res.status(500).send({'error':'An error has occured'});
                                db.close();
                            }
                            else {
                                res.status(200).send(result);
                                db.close();
                            }
                        });
                    });
                });
            }
        });
    });
};