var reimbursement = angular.module("burseManager", []);

reimbursement.controller("BurseCtrl", function($scope, burseService) {

	$scope.types = burseService.getTypesOfBurse();
	$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress"}];
	$scope.burseHistory = burseService.getBurseHistory();
	$scope.emptyHistory = emptyHistory($scope.burseHistory);

	$scope.addReimbursement = function() {
		if (checkEmptyBurse($scope.burseSubmit)){
			alert("Must complete previous rows before adding another");
		}
		else {
			$scope.burseSubmit.push({date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress"});
		}
	};

	$scope.submitReimbursement = function() {
		if (checkEmptyBurse($scope.burseSubmit)){
			alert("Must complete all rows before submitting");
		}
		else {
			for(index in $scope.burseSubmit){
				burseService.addBurseHistory($scope.burseSubmit[index]);
			}
			$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress"}];
			$scope.emptyHistory = emptyHistory($scope.burseHistory);
		}
	};

	$scope.removeReimbursement = function(index){
		$scope.burseSubmit.splice(index,1);
	};
});

function checkEmptyBurse(data){
	var empty = false;
	for (index in data){
		if(data[index].date === "" || 
			data[index].type === "Select a Type" || 
			data[index].desc === "" || 
			data[index].amount === ""){
			empty = true;
		}
	}
	return empty;
};