

maintenance.factory('dataFactory', function($http){



	var factory = {};

	factory.getAllTickets = function(){
		$http.get('http://localhost:3030/maintenanceCheck/');
	}

	factory.getCategories = function(){
		return["Request Item","Missing Item","Broken Item"];
	};

	service.getStatus = function(){
		return['Submitted','In-Progress','Complete'];
	};


	

	// factory.updateTicket = function(data,update){
	// 	return $http.post('http://localhost:3000/maintenanceTickets'+
	// 		data._id+'/'+update);

	// };


	// factory.sumbmitTicket = function(data){
	// 	return $http.post('http://localhost:3030/maintenanceTickets',
	// 		data);
		
	// };

	return factory;
});
