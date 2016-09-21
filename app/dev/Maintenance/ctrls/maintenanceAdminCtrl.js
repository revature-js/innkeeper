

maintenance.controller("maintenanceAdminCtrl", function($scope,dataAdminFactory){
	$scope.ticketSubmission = [];
	$scope.ticketHistory = [];
	$scope.categories = dataAdminFactory.getCategories();



	function generalError(err){}

	function viewSuccess(data){
		$scope.ticket = data.data;
	}
	

	var getAllTickets = function()
	{
		var result = [];
		//console.log(dataAdminFactory);
		//console.log(dataAdminFactory.hasOwnProperty('getAllTickets'));
		dataAdminFactory.getAllTickets()
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
	
	getAllTickets();


	// console.log($scope.ticketHistory);

	 $scope.submitNewTicket  = function(){
	 	console.log($scope.ticket);
	 	
	 	$scope.ticketSubmission.push({
			category:$scope.ticket.category,
			description:$scope.ticket.description,
			startDate:new Date(),
			completeDate:'',
			status:'Submitted',
			aptID:$scope.apartment,
			usr:''
	 		});
	 	
	 	console.log($scope.ticketSubmission);

	 		dataAdminFactory.submitNewTicket($scope.ticketSubmission)
	 		.then(
	 			function(){
	 				
	 				console.log('success')
	 			},
	 			function(){
	 				alert('failed ticket submission');
	 			}
	 			);

	 	
	 	
	 };
	// 	$scope.startDate = new Date();
	// 	$scope.status = 'Submitted';

	// 	$scope.ticketSubmission.push({
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

		// console.log($scope.ticketSubmission.category);
		// alert($scope.ticketSubmission.category);
	 

	



});