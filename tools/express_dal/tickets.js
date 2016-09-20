var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';

exports.updateTicket = function(req,res) {

    var object = req.body;
    var id = req.body._id;

    MongoClient.connect(url, function(err,db) {
        var c = db.collection('maintenanceIK');
        object._id = new ObjectId(id);
        c.save(object);
        db.close();
    });
}

exports.getTicket = function(req, res) {

    MongoClient.connect(url, function(err,db) {
        var objectId = req.query.ticket_id;
        var c = db.collection('maintenanceIK');
        c.findOne ( {"_id": new ObjectId(objectId)}, function(err,ticket){
            res.send(ticket);
        });
        db.close();
    });
}

exports.addTicket = function(req,res) {

    var object = req.body;

    if (object.usr == undefined || object.aptID == undefined)
        throw "addTicket: Usr and aptID cannot be undefined";

    if (object.status == undefined)
        object.status = "Submitted";
    if (object.startDate == undefined)
        object.startDate = new Date();

    MongoClient.connect(url, function(err,db) {
        var c = db.collection('maintenanceIK');
        c.save(object);
        db.close();
    });
}
