var maintenance = angular.module('maintenanceApp');

maintenance.factory('dataAdminFactory', function($http,seshkeys, $window){
	var url = $window.sessionStorage.getItem(seshkeys.serviceurl);



	var factory = {};

	factory.getAllTickets = function(){// returns all the tickets

		return $http.get(url+'/maintenanceCheck/');

	};

	factory.getCategories = function(){ // incomplete returns all the distinct categories from db
		return["Request Item","Missing Item","Broken Item"];
	};

	factory.getStatus = function(){//incomplte returns all the distinct status from db
		return['Submitted','In-Progress','Complete'];
	};


	factory.getTicketById = function(id){//returns id of 
		
		return $http.get(url+'/maintenanceTicket/' + id);
	};

	factory.updateTicket = function(data){
		return $http.post(url+'/maintenanceUpdate/',data);

	};

	factory.getTicketsByUser = function(username){
		return $http.get(url+'/maintenanceCheck/' + username);
	};


	factory.submitNewTicket = function(data){
		return $http.post(url+'/maintenanceCheck/', data);
		
	};

	return factory;
});
