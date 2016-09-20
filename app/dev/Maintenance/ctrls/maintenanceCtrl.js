var maintenance = angular.module('maintenanceApp', []);

maintenance.controller('maintenanceCtrl', function($scope, dataFactory){
	maintenanceCtrl.getAllTickets()
	.then(function(data){
		$scope.tickets = data;
	},
	function(){
		$scope.error = 'cannot find them tickets';
	});
});