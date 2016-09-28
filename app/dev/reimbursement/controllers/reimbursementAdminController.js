var reimbursement = angular.module('reimbursementApp');

reimbursement.controller("BurseAdminCtrl", function($scope, burseService, $timeout){

	var getAllReimbursements = function(){
		burseService.getAllReimbursements()
		.then(
			function(data){
				$scope.burseHistory = data.data;
				$scope.emptyHistory = emptyHistory($scope.burseHistory);
				$scope.selected = false;
			},
			function(){
				alert("Failed to retreive reimbursements...");
			}
		);
	};

	$scope.setSidebarActive = function(event){
		var buttons = document.getElementsByClassName("navButton");
		var i;
		for (i = 0;i < buttons.length;i++){
			angular.element(buttons[i]).removeClass("active");
		}
		angular.element(event.target).parent().addClass("active");
	};

	$scope.display = function(id){
		burseService.getReimbursementById(id).then(
			function(result){
				$scope.displayBurse = result.data;
				$scope.selected = true;
				$scope.completed = checkCompleted($scope.displayBurse);
			},
			function(){
				alert("Error retreiving reimbursement...");
			}
		);
	};

	$scope.makeDecision = function(decision){
		burseService.updateReimbursement($scope.displayBurse, decision)
		.then(
			function(data){
				if($scope.pending){
					getAllReimbursements();
				}else{
					$scope.display($scope.displayBurse._id);
				}
				
			},
			function(){
				alert("Update failed...")
			}
		);
	};

	$scope.reset = function(){
		getAllReimbursements();
	};

	$scope.filterForPending = function(item){
		if($scope.pending && item.status==="In Progress"){
			return true;
		}
		else if($scope.pending === false || $scope.pending === undefined){
			return true;
		}
		else {
			return false
		}
	};

	$scope.burseHistory = [];
	$scope.emptyHistory = true;
	$scope.displayBurse = {};
	$scope.selected = false;
	$scope.completed = false;
	getAllReimbursements();
});

function checkCompleted(burse){
	if (burse.status === "In Progress"){
		return true;
	}
	else {
		return false;
	}
};

function emptyHistory(history){
	if(history.length === 0){
		return true;
	}
	else {
		return false;
	}
};