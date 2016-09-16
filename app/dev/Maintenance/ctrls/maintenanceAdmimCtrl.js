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
		$scope.ticketSubmission.push({category:'',description:'',startDate:'',
		completeDate:'',status:'Submitted',aptID:'',usr:''})
	}


});