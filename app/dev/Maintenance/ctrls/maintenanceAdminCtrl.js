var maintenance = angular.module('maintananceApp', []);

maintenance.controller('maintenanceAdminCtrl', function($scope){
	$scope.ticketSubmission = [];
	$scope.ticketHistory = [];
	

	// var getAllTickets = function(){
	// 	ticketFactory.getAllTickets()
	// 	.then(
	// 		function(data){
	// 		$scope.ticketHistory = data.data;
	// 	},
	// 		function(){
	// 			alert('nope');
	// 	}
	// );

	// };
	//getAllTickets();

	$scope.submitNewTicket  = function(){
		$scope.ticketSubmission.push({category:$scope.category,description:$scope.description
			,startDate:'',completeDate:'',status:'Submitted',aptID:'',usr:''});

		console.log($scope.ticketSubmission[0].category);
		alert($scope.ticketSubmission[0].category);
	}



});