var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';


exports.findAllTickets = function(req,res){
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


exports.getAllCategories = function(req,res){//fix to find only categories
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