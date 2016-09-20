var mongo = require('mongodb');
var bcrypt = require('bcryptjs');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

exports.getUserByUsername = function(req,res){
    var userName = req.params.userName;
    console.log(userName);
    client.connect(url, function(err,db){
        var collection = db.collection('usersIK');
        collection.findOne({'username': userName}, function(err, item){
            res.send(item);
        });
        db.close();
    });
};

exports.createUser = function (req, res){

    client.connect(url, function(err,db){

        var newUser = req.body;
        console.log(newUser);
        var collection = db.collection('usersIK');
        console.log(collection);

        // bcrypt.genSalt(10, function(err, salt) {
        //     bcrypt.hash(newUser.password, salt, function(err, hash) {
        //         newUser.password=hash;
        collection.insert(newUser, function(err,result){
            if(err){
                res.send({'error':'An error has occured'});
            }
            else {
                res.send(result);
            }
        });
        db.close();
    //     });
    });
};

exports.comparePassword = function(candidatePassword, hash, callback){
bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
});
};