var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';


exports.getAllTickets = function(req,res){
	 MongoClient.connect(url, function(err,db){
		var collection = db.collection('maintenanceIK');
		collection.find().toArray(function(err,tickets){
			if(tickets){
				res.send(tickets);
			}
			if(err){
				res.send(err);
			}
		});
		db.close();
	});
	
};

exports.getTicketsByUser = function(req, res){
	MongoClient.connect(url, function(err,db){
		var user = req.param.usr;
		var collection = db.collection('maintenanceIK');
		collection.find({usr:user}, function(err,item){
			res.send(item);
		});
		db.close();
	});
};

exports.submitNewTicket = function(req,res)
{
	// var object = req.body;

	// if (object.usr == undefined || object.aptID == undefined)
 //        throw "addTicket: Usr and aptID cannot be undefined";

 //    if (object.status == undefined)
 //        object.status = "Submitted";
 //    if (object.startDate == undefined)
 //        object.startDate = new Date();


	 MongoClient.connect(url, function (err, db) 
	 {
	 	var ticket = req.body;
	 	var collection =  db.collection('maintenanceIK');
	    	collection.insert(ticket, function(err,result ){
	 	if (err) {
	    	res.send('Unable to connect to the mongoDB server. Error:', err);
	  			} 
	  	else {
	    		res.send(result[0]);
			}

 	});
 	db.close();
 });
	
};


exports.updateTicket = function(req,res){
		var id = req.body.id;
		var update = req.body;

		MongoClient.connect(url, function (err, db){
		
			var collection = db.collection('maintenanceIK');
			object._id = new ObjectId(id);
			collection.save(object);
			db.close();
	});
	};


exports.getTicketById = function(req,res){

	MongoClient.connect(url, function(err,db) {
        var objectId = req.query.ticket_id;
        var c = db.collection('maintenanceIK');
        c.findOne ( {"_id": new ObjectId(objectId)}, function(err,ticket){
            res.send(ticket);
        });
        db.close();
    });
}