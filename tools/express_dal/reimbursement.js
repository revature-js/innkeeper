var mongo = require('mongodb');

var client = mongo.MongoClient;
var url = 'mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms';
var ObjectID = mongo.ObjectID;

exports.findAllReimbursements = function(req,res){
	client.connect(url, function(err,db){
		var collection = db.collection('reimbursementsIK');
		collection.find().toArray(function(err,items){
			if(!err){
				res.send(items);
			}
		});
		db.close();
	});
};

exports.findReimbursementById = function(req,res){
	client.connect(url, function(err,db){
		var id = req.params.id;
		var collection = db.collection('reimbursementsIK');
		collection.findOne({'_id': ObjectID(id)}, function(err, item){
			res.send(item);
		});
		
		db.close();
	});
};

exports.findReimbursementsByUsername = function(req,res){
	client.connect(url, function(err,db){
		var username = req.params.username;
		var collection = db.collection('reimbursementsIK');
		collection.find({usrname: username}).toArray(function (err, items){
			if(!err){
				res.send(items);
			}
		});
		db.close();
	});
};

exports.addReimbursement = function(req,res){
	client.connect(url, function(err,db){
		var burse = req.body;
		console.log(burse);
		var collection = db.collection('reimbursementsIK');
		collection.insert(burse, function(err,result){
			if(err){
				res.send({'error':'An error has occured'});
			}
			else {
				res.send(result[0]);
			}
		});
		db.close();
	});
};

exports.updateReimbursement = function (req,res){
	client.connect(url, function(err,db){
		var id = req.params.id;
		var decision = req.params.decision;
		console.log(id);
		console.log(decision);
		var collection = db.collection('reimbursementsIK');
		collection.updateOne({'_id': ObjectID(id)},{$set:{'status': decision}}, function(err, result){
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