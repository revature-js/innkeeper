var maintenance = angular.module('maintenanceApp', []);

maintenance.controller('maintenanceLab', function($scope, dataFactory){
	maintenanceLab.findAllTickets().then(function(data){
		$scope.tickets = data;
	},
	function(){
		$scope.error = 'cannot find them tickets';
	});
});