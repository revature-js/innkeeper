reimbursement.controller("BurseAdminCtrl", function($scope, burseService){
	var idx = 0;

	$scope.burseHistory = burseService.getBurseHistory();
	$scope.emptyHistory = emptyHistory($scope.burseHistory);
	$scope.displayBurse = {};
	$scope.selected = false;
	$scope.completed = false;

	$scope.setSidebarActive = function(event){
		var buttons = document.getElementsByClassName("navButton");
		var i;
		for (i = 0;i < buttons.length;i++){
			angular.element(buttons[i]).removeClass("active");
		}
		angular.element(event.target).parent().addClass("active");
	};

	$scope.display = function(index){
		$scope.displayBurse = $scope.burseHistory[index];
		$scope.selected = true;
		$scope.completed = checkCompleted($scope.displayBurse);
		idx = index;
	};

	$scope.makeDecision = function(decision){
		if($scope.displayBurse.comment===""||$scope.displayBurse.comment===undefined){
			$scope.displayBurse.comment="No comment";
		}
		$scope.displayBurse.status = decision;
		$scope.completed = true;
		burseService.updateBurseHistory(idx, $scope.displayBurse);
		$scope.display(idx);
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