var reimbursement = angular.module("reimbursementApp", []);

reimbursement.controller("BurseCtrl", function($scope, burseService) {

	$scope.types = burseService.getTypesOfBurse();
	$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress"}];
	$scope.burseHistory = [];
	$scope.emptyHistory = emptyHistory($scope.burseHistory);

	var getAllReimbursements = function(){
		burseService.getAllReimbursements()
		.then(
			function(data){
				$scope.burseHistory = data.data;
				$scope.emptyHistory = emptyHistory($scope.burseHistory);
			},
			function(){
				alert("Failed to retreive reimbursements...");
			}
		);
	};

	getAllReimbursements();

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
			burseService.addReimbursement($scope.burseSubmit).then(
				function(){
					$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress"}];
					getAllReimbursements();
				},
				function(){
					alert("Failed to submit reimbursements...");
				}
			);
			
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