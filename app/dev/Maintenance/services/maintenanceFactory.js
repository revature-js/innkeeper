

maintenance.factory('dataFactory', function($http,dataFactory){

	var factory = {};

	factory.getTicketsByUser = function(){
		$http.get('http://localhost:3030/maintenanceCheck/');
	};

	return factory;

	});
