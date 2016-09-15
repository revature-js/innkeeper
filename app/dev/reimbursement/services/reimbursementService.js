reimbursement.factory("burseService", function(){

	var burseHistory = [];
	var service = {};

	service.updateBurseHistory = function(index, burse){
		burseHistory.splice(index,1,burse);
	};

	service.getTypesOfBurse = function(){
		return ["Travel","Certification","Supplies"];
	};

	service.getBurseHistory = function(){
		return burseHistory;
	};

	service.addBurseHistory = function(data){
		burseHistory.push(data);
	};

	return service;
});