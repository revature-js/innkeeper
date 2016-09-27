var reimbursement = angular.module('reimbursementApp');

reimbursement.factory("burseService", function($http,$window,seshkeys){

	var service = {};

	service.getTypesOfBurse = function(){
		return ["Travel","Certification","Supplies"];
	};

	service.getReimbursementById = function(id){
		return $http.get($window.sessionStorage.getItem(seshkeys.serviceurl)+'/reimbursements/'+id);
	};

	service.getReimbursementsByUsername = function(username){
		return $http.get($window.sessionStorage.getItem(seshkeys.serviceurl)+'/reimbursement/'+username);
	};

	service.getAllReimbursements = function(){
		return $http.get($window.sessionStorage.getItem(seshkeys.serviceurl)+'/reimbursements/');
	};

	service.addReimbursement = function(data){
		return $http.post($window.sessionStorage.getItem(seshkeys.serviceurl)+'/reimbursements/', data);
	};

	service.updateReimbursement = function(data,decision){
		return $http.post($window.sessionStorage.getItem(seshkeys.serviceurl)+'/reimbursements/'+data._id+"/"+decision);
	};

	return service;
});
