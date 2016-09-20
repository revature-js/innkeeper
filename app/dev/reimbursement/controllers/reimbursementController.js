var reimbursement = angular.module("reimbursementApp", []);

reimbursement.controller("BurseCtrl", function($scope, burseService, $window, seshkeys) {

	var getReimbursementsByUsername = function(){
		burseService.getReimbursementsByUsername(username)
		.then(
			function(result){
				$scope.burseHistory = result.data;
				$scope.emptyHistory = emptyHistory($scope.burseHistory);
			},
			function(){
				alert("Failed to retreive reimbursements...");
			}
		);
	};

	$scope.addReimbursement = function() {
		if (checkEmptyBurse($scope.burseSubmit)){
			alert("Must complete previous rows before adding another");
		}
		else {
			$scope.burseSubmit.push({date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:username});
		}
	};

	$scope.submitReimbursement = function() {
		if (checkEmptyBurse($scope.burseSubmit)){
			alert("Must complete all rows before submitting");
		}
		else {
			burseService.addReimbursement($scope.burseSubmit).then(
				function(){
					$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:username}];
					getReimbursementsByUsername();
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

	var username = 'kfg';//$window.sessionStorage.getItem(seshkeys.username);
	$scope.types = burseService.getTypesOfBurse();
	$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:username}];
	$scope.burseHistory = [];
	getReimbursementsByUsername();
	$scope.emptyHistory = emptyHistory($scope.burseHistory);

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