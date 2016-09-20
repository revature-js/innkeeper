maintenanceAdmin.factory('dataFactory', function($http){
	

	var factory = {};

	factory.getAllTickets = function(){
		$http.get('http://localhost:3030/maintenanceTickets',
			data);
	}

	factory.getCategories = function(){
		return['Request Item','Missing Item','Broken Item'];
	};

	factory.getStatus = function(){
		return['Submitted','In-Progress','Complete'];
	};


	

	factory.updateTicket = function(data,update){
		return $http.post('http://localhost:3030/maintenanceTickets'+
			data._id+'/'+update);

	};


	factory.sumbmitTicket = function(data){
		return $http.post('http://localhost:3030/maintenanceTickets',
			data);
		
	};
};
