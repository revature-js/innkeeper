var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';


exports.getAllTickets = function(req,res){
	 MongoClient.connect(url, function(err,db){
		var collection = db.collection('maintenanceIK');
		collection.find().toArray(function(err,tickets){
			if(!err){
				res.send(tickets);
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
	var object = req.body;

	if (object.usr == undefined || object.aptID == undefined)
        throw "addTicket: Usr and aptID cannot be undefined";

    if (object.status == undefined)
        object.status = "Submitted";
    if (object.startDate == undefined)
        object.startDate = new Date();


	 MongoClient.connect(url, function (err, db) 
	 {
	 	if (err) {
	    	console.log('Unable to connect to the mongoDB server. Error:', err);
	  			} 
	  	else {
	    	var collection =  db.collection('maintenanceIK');
	    	collection.save(object);
			}

 	});
 	db.close();
	
};


exports.updateTicket = function(req,res){
		var id = req.body.id;
		var update = req.body;

		MongoClient.connect(url, function (err, db){
		
			var collection = db.collection('maintenanceIK');
			collection.updateOne({'_id':ObjectID(id),{$set:{'status':update}}, function(err, result){
			if(err){
				res.send('error');
			}
			else{
				res.send(result);

			}
		});
		db.close();
	});
	};
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