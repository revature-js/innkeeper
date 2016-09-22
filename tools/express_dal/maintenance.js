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

exports.updateTicket = function(req,res){

		MongoClient.connect(url, function (err, db){
			// var id = req.params.id;
			// var update = req.params.update;

			var object = req.body;
			var id = req.body._id;
		
			console.log("*** update ticket: " + JSON.stringify(object));

			var collection = db.collection('maintenanceIK');
			// collection.updateOne({'_id':ObjectId(id)},{$set:{'status':update}}, function(err,result){
			// 	if(err){
			// 		res.send(err);
			// 	}
			// 	else{
			// 		res.send(result);
			// 	}
			// });
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
	console.log('right here');

	MongoClient.connect(url, function(err,db) {
        var id = req.params.ticket_id;
        var collection = db.collection('maintenanceIK');
        collection.findOne ( {'_id': new ObjectId(id)}, function(err,ticket){
            res.send(ticket);
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

exports.submitNewTicket = function($scope)
{
 	MongoClient.connect(url, function (err, db) 
 	{
 		if (err) {
    		console.log('Unable to connect to the mongoDB server. Error:', err);
  		} else {
    		var collection =  db.collection('maintenanceIK');
    		var newTicket = collection.insert
    		(
	    		{
					category: $scope.category,
					description: $scope.description,
					startDate: $scope.startDate,
					completeDate: $scope.completeDate,
					status: $scope.status,
					aptID: $scope.aptID,
					usr: $scope.usr
				}
			);
		}
 });
 	db.close();
};

exports.getAllCategories = function(req,res){
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('maintenanceIK');
			collection.find().toArray(function(err,tickets){
				if(!err){
					res.send(tickets);
				}
			});
		db.close();
	});
}