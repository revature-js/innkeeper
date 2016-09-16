var maintenance = angular.module('maintenanceApp', []);

maintenance.controller('maintenanceAdminCtrl', function($scope, ticketFactory){
	$scope.ticketSubmission = [];
	$scope.ticketHistory = [];
	

	var getAllTickets = function(){
		ticketFactory.getAllTickets()
		.then(
			function(data){
			$scope.ticketHistory = data.data;
		},
			function(){
				alert('nope');
		}
	);

	};
	getAllTickets();

	$scope.submitNewTicket  = function(){
		$scope.ticketSubmission.push({category:$scope.category,description:'',startDate:'',
		completeDate:'',status:'Submitted',aptID:'',usr:''});

		console.log(ticketSubmission.category);
		alert(ticketSubmission.category);
	}



});