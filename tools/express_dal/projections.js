var mongo = require('mongodb');

var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636/rlms';
var ObjectID = mongo.ObjectID;

exports.getAllBatches= function(req, res){
	client.connect(url, function(err,db){
		var collection = db.collection('batchIK');
		collection.find({'startdate'< }).toArray(function(err,items)){
			if(!err){
				res.send(items);
			}
		}
	});
	db.close();
});
};

exports.getAllApartments = function(req,res){

};