var reimbursement = angular.module('reimbursementApp');

reimbursement.factory("burseService", function($http){

	var service = {};

	service.getTypesOfBurse = function(){
		return ["Travel","Certification","Supplies"];
	};

	service.getReimbursementById = function(id){
		return $http.get('http://localhost:3030/reimbursements/'+id);
	};

	service.getReimbursementsByUsername = function(username){
		return $http.get('http://localhost:3030/reimbursement/'+username);
	};

	service.getAllReimbursements = function(){
		return $http.get('http://localhost:3030/reimbursements/');
	};

	service.addReimbursement = function(data){
		return $http.post('http://localhost:3030/reimbursements/', data);
	};

	service.updateReimbursement = function(data,decision){
		return $http.post('http://localhost:3030/reimbursements/'+data._id+"/"+decision);
	};

	return service;
});