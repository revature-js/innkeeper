var maintenance = angular.module('maintenanceApp', []);

maintenance.factory('dataFactory', function($http){

	var factory = {};

	factory.getAllTickets = function(){
		$http.get('http://localhost:3030/maintenanceCheck/');
	};

	return factory;

	});
