var mongo = require('mongodb');

var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

exports.findAllApartments = function(req,res){
	client.connect(url, function(err,db){
		var collection = db.collection('apartmentsIK');
		collection.find().toArray(function(err,items){
			if(!err){
				res.send(items);
			}
		});
		db.close();
	});
	
};
exports.allusers = function (req, res){
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
exports.findApartmentsByAptId = function(req,res){
	client.connect(url, function(err,db){
		var id = req.params.aptId;
		var collection = db.collection('apartmentsIK');
		collection.findOne({'aptId':id}, function(err, item){
			if(!err){
				console.log(err);
			res.send(item);
		}
		});

		db.close();
	});
};
exports.addApartment = function(req,res){
	client.connect(url, function(err,db){
		var apt = req.body;
		var collection = db.collection('apartmentsIK');
		console.log(apt);
		collection.insert(apt, function(err,result){
			if(err){
				console.log(err);
				res.send({'error':'An error has occured'});
			}
			else {
				console.log('succ!')
				res.send(result[0]);
			}
		});
		db.close();
	});
	
};
exports.updateApartment = function (req,res){
	client.connect(url, function(err,db){
		var id = req.params.aptId;
		var id = req.params.username;
		var collection = db.collection('apartmentsIK');
		collection.updateOne({'aptId': ObjectID(aptId)},{$set:{'occupants': username}}, function(err, result){
			if(err){
				res.send({'error':'An error has occured'});
			}
			else {
				res.send(result);
			}
		});
		db.close();
	});
};
exports.updateAptID = function (req,res){
	client.connect(url, function(err,db){
		var username = req.params.userName;
		var aptId = req.params.aptId;
		var collection = db.collection('usersIK');
		collection.updateOne({'username': username},{$set:{'aptId': aptId}}, function(err, result){
			if(err){
				res.send({'error':'An error has occured'});
			}
			else {
				res.send(result);
			}
		});
		db.close();
	});
};
