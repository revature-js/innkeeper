var maintenance = angular.module('maintenanceApp');

maintenance.controller("maintenanceAdminCtrl", function($scope,dataAdminFactory,seshkeys){
	$scope.ticketSubmission = [];
	$scope.ticketHistory = [];
	$scope.categories = dataAdminFactory.getCategories();
	$scope.changedTicket = {};

	var getAllTickets = function()
	{
		var result = [];

		dataAdminFactory.getAllTickets()
		.then(
			function(data)
			{
				result = data.data;
				$scope.ticketHistory = result;
				// console.log($scope.ticketHistory);

			},
			function(err)
			{
				alert('getAllTickets'+err);
			}
			);
		return result;

	};

	getAllTickets();
	// console.log($scope.ticketHistory);
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
	 				newTicket.$setPristine();
	 				newTicket.$setUntouched();
	 				$scope.ticket.category
	 			},
	 			function(){
	 				alert('failed ticket submission');
	 			}
	 			);
	 };

	 $scope.getTicketById = function(id, callback){
	 	dataAdminFactory.getTicketById(id)
	 	.then(
	 		function(result)
	 		{
	 			callback(result);
	 		},
	 		function(err){

	 			alert('failed to get ticket');
	 		}
	 		);
	 };

	$scope.updateTicket = function(id){// updates a ticket

		$scope.getTicketById(id, function(result) {//gets a particular ticket by it's (_id)

			for (var i = 0; i < $scope.ticketHistory.length; i++) {
				if (id == $scope.ticketHistory[i]._id) {

					$scope.changedTicket = $scope.ticketHistory[i];//
					// console.log($scope.changedTicket);
					dataAdminFactory.updateTicket($scope.changedTicket)
					   .then(
					 	function(data){
					 		getAllTickets();
					 	},
					 	function(){
					 		//alert('Failed Update');
					 	}
					 );
				}
			}
		});
	};
});
