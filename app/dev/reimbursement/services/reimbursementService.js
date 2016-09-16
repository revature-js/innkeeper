reimbursement.factory("burseService", function($http){

	var service = {};

	service.updateReimbursement = function(data,decision){
		console.log(data+","+decision);
		return $http.post('http://localhost:3030/reimbursements/'+data._id+"/"+decision);
	};

	service.getTypesOfBurse = function(){
		return ["Travel","Certification","Supplies"];
	};

	service.getAllReimbursements = function(){
		return $http.get('http://localhost:3030/reimbursements/');
	};

	service.addReimbursement = function(data){
		console.log(data);
		return $http.post('http://localhost:3030/reimbursements/', data);
	};

	return service;
});