var maintenance = angular.module('maintenanceApp', []);

maintenance.controller('maintenanceCtrl', function($scope,dataFactory){
	$scope.newTicket = [];
	$scope.ticketHistory = [];
	
	var getTicketsByUser = function()
	{
		var result = [];
		//console.log(dataAdminFactory);
		//console.log(dataAdminFactory.hasOwnProperty('getTicketsByUser'));
		dataFactory.getTicketsByUser()
		.then(
			function(data)
			{
				result = data.data;
				$scope.ticketHistory = result;
				//console.log($scope.ticketHistory);

				// console.log(result);
				//$scope.ticketHistory = data.data;
			},
			function(err)
			{
				alert(err);
			}
			);
		return result;

	};
	
	getTicketsByUser();

	//

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