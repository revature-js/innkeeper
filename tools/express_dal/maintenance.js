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

exports.submitNewTicket = function($scope)
{

 MongoClient.connect(url, function (err, db) 
 {
 	if (err) {
    	console.log('Unable to connect to the mongoDB server. Error:', err);
  			} 
  	else {
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


exports.updateTicket = function(req,res){
	MongoClient.connect(url, function (err, db){
		var id = req.param.id;
		var update = req.param.status;
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