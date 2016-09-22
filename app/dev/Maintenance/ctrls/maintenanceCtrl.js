var maintenance = angular.module('maintenanceApp', []);

maintenance.controller('maintenanceCtrl', function($scope,dataAdminFactory){
	$scope.newTicket = [];
	$scope.ticketHistory = [];
	$scope.ticketSubmission = [];
	
	var getTicketsByUser = function(username)
	{
		var result = [];
		//console.log(dataAdminFactory);
		//console.log(dataAdminFactory.hasOwnProperty('getTicketsByUser'));
		dataAdminFactory.getTicketsByUser(username)
		.then(
			function(data)
			{
				result = data.data;
				$scope.ticketHistory = result;
				console.log($scope.ticketHistory);

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
	
	getTicketsByUser('jack');

	//

	// $scope.submitNewTicket  = function(){
	// 	$scope.startDate = new Date();
	// 	$scope.status = 'Submitted';

	// 	$scope.newTicket.push({
	// 		category:$scope.category,
	// 		description:$scope.description,
	// 		startDate:$scope.startDate,
	// 		completeDate:$scope.completeDate,
	// 		status:$scope.status,
	// 		aptID:$scope.apartment,
	// 		usr:$scope.usr});

	// 	$scope.ticketHistory.push({
	// 		category:$scope.category,
	// 		description:$scope.description,
	// 		startDate:$scope.startDate,
	// 		completeDate:$scope.completeDate,
	// 		status:$scope.status,
	// 		aptID:$scope.apartment,
	// 		usr:$scope.usr});

	// 	console.log($scope.newTicket[0]);
	// 	alert($scope.newTicket[0].category);
	// }

	$scope.submitNewTicket  = function(){
	 	console.log($scope.ticket);

	 	$scope.ticketSubmission.push({
			category:$scope.ticket.category,
			description:$scope.ticket.description,
			startDate:new Date(),
			completeDate:'',
			status:'Submitted',
			aptID:$scope.ticket.apartment,
			usr:'jack' // for testing
	 		});
	 	
	 	console.log($scope.ticketSubmission);

	 		dataAdminFactory.submitNewTicket($scope.ticketSubmission[0])
	 		.then(
	 			function(){
	 				$scope.ticketSubmission.pop();
	 			},
	 			function(){
	 				alert('failed ticket submission');
	 			}
	 			);

	 	
	 	
	 };

});