var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectId = require('mongodb').ObjectID;

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
		var user = req.params.usr;
		// console.log("*** usr : " + user);
		var collection = db.collection('maintenanceIK');
		collection.find({usr:user}).toArray(function(err,item){
			// console.log("\t*** success: " + item);
			res.send(item);
		});
		db.close();
	});
};

exports.submitNewTicket = function(req,res)
{
	 MongoClient.connect(url, function (err, db) 
	 {
	 	var ticket = req.body;
	 	var collection =  db.collection('maintenanceIK');

	    	collection.insert(ticket, function(err,result ){
	 	if (err) {
	    	res.send('Unable to connect to the mongoDB server. Error:', err);
	  			} 
	  	else {
	    		res.send(result);
			}
 	});
 	db.close();
 });
	
};

exports.updateTicket = function(req,res){

		MongoClient.connect(url, function (err, db){
			
			var object = req.body;
			var id = req.body._id;
			var collection = db.collection('maintenanceIK');
		
			// console.log("*** update ticket: " + JSON.stringify(object));

			object._id = new ObjectId(id);
			if (object.status == "Complete") {
				object.completeDate = new Date();
			}
			else{
				object.completeDate = "";
			}

			collection.save(object);
			db.close();
	});
	};

exports.getTicketById = function(req,res){
	// console.log('right here');

	MongoClient.connect(url, function(err,db) {
        var id = req.params.ticket_id;
        var collection = db.collection('maintenanceIK');
        collection.findOne ( {'_id': new ObjectId(id)}, function(err,ticket){
            res.send(ticket);
        });
        db.close();
    });
}