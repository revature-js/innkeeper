var maintenance = angular.module('maintenanceLab', []);

maintenance.controller('maintenanceAdminCtrl', function($scope, ticketFactory){
	$scope.ticketSubmission = [{category:'',description:'',startDate:'',
		completeDate:'',status:'',aptID:'',usr:''}];
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

	$scope.


});