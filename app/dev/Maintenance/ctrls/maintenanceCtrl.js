var maintenance = angular.module('maintenanceApp', []);

maintenance.controller('maintenanceCtrl', function($scope){
	$scope.newTicket = [];
	$scope.ticketHistory = [];
	
	

	// var getAllTickets = function(){
	// 	dataFactory.getAllTickets()
	// 	.then(
	// 		function(data){
	// 		$scope.ticketHistory = data.data;
	// 	},
	// 		function(){
	// 			alert('nope');
	// 	}
	// );

	// };
	// getAllTickets();

	$scope.submitNewTicket  = function(){
		$scope.startDate = new Date();
		$scope.status = 'Submitted';

		$scope.newTicket.push({
			category:$scope.category,
			description:$scope.description,
			startDate:$scope.startDate,
			completeDate:$scope.completeDate,
			status:$scope.status,
			aptID:$scope.apartment,
			usr:$scope.usr});

		$scope.ticketHistory.push({
			category:$scope.category,
			description:$scope.description,
			startDate:$scope.startDate,
			completeDate:$scope.completeDate,
			status:$scope.status,
			aptID:$scope.apartment,
			usr:$scope.usr});

		console.log($scope.newTicket[0]);
		alert($scope.newTicket[0].category);
	}

});