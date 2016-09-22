

maintenance.factory('dataFactory', function($http){

	var factory = {};

	factory.getTicketsByUser = function(){
		return $http.get('http://localhost:3030/maintenanceCheck/');
	};

	return factory;

	});
