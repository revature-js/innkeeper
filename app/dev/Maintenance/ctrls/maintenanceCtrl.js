var maintenance = angular.module('maintenanceApp');

maintenance.controller('maintenanceCtrl', function($scope,dataAdminFactory,seshkeys){
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
	
	getTicketsByUser(seshkeys.username);//pass session key of user

	$scope.submitNewTicket  = function(){
	 	// console.log($scope.ticket);

	 	$scope.ticketSubmission.push({
			category:$scope.ticket.category,
			description:$scope.ticket.description,
			startDate:new Date(),
			completeDate:'',
			status:'Submitted',
			aptID:seshkeys.aptid,
			usr:seshkeys.username 
	 		});
	 	
	 	// console.log($scope.ticketSubmission);

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
