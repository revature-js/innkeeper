

maintenance.factory('dataAdminFactory', function($http){



	var factory = {};

	factory.getAllTickets = function(){
		return $http.get('http://localhost:3030/maintenanceCheck/');

	};

	factory.getCategories = function(){
		return["Request Item","Missing Item","Broken Item"];
	};

	factory.getStatus = function(){
		return['Submitted','In-Progress','Complete'];
	};


	factory.getTicketById = function(id){
		console.log(id);
		return $http.get('http://localhost:3030/maintenanceTicket/' + id);
	};

	factory.updateTicket = function(data){
		return $http.post('http://localhost:3030/maintenanceUpdate/',data);

	};

	factory.getTicketsByUser = function(username){
		return $http.get('http://localhost:3030/maintenanceCheck/' + username);
	};


	factory.submitNewTicket = function(data){
		return $http.post('http://localhost:3030/maintenanceCheck/', data);
		
	};

	return factory;
});
