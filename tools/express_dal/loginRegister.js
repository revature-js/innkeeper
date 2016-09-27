var mongo = require('mongodb');
var bcrypt = require('bcryptjs');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

//gets a single user which matches the username they typed in
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

//retrieves all usernames, to check for uniqueness of a new username
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

//compares the typed
exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
});
};

//creates a new user
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
                    console.log("setting to true...");
                    existingUser = true;
                }
            }
        
            console.log(existingUser);
            if(existingUser===true)
            {
                console.log("here atm");
                res.status(500).send({error: "Username is not avaliable"});
            }
            else
            {
            //Hashes the new users passwords and adds salt to the begenning.
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        newUser.password=hash;
                        console.log(newUser);
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