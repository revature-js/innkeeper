reimbursement.controller("BurseAdminCtrl", function($scope, burseService){

	$scope.burseHistory = [];
	$scope.emptyHistory = emptyHistory($scope.burseHistory);
	$scope.displayBurse = {};
	$scope.selected = false;
	$scope.completed = false;

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

	$scope.setSidebarActive = function(event){
		var buttons = document.getElementsByClassName("navButton");
		var i;
		for (i = 0;i < buttons.length;i++){
			angular.element(buttons[i]).removeClass("active");
		}
		angular.element(event.target).parent().addClass("active");
	};

	$scope.display = function(data){
		$scope.displayBurse = data;
		$scope.selected = true;
		$scope.completed = checkCompleted($scope.displayBurse);
	};

	$scope.makeDecision = function(decision){
		if($scope.displayBurse.comment===""||$scope.displayBurse.comment===undefined){
			$scope.displayBurse.comment="No comment";
		}
		burseService.updateReimbursement($scope.displayBurse, decision)
		.then(
			function(data){
				$scope.selected = false;
				getAllReimbursements();
			},
			function(){
				alert("Update failed...")
			}
		);
		
	}
});

function checkCompleted(burse){
	if (burse.status === "In Progress"){
		return true;
	}
	else {
		return false;
	}
};