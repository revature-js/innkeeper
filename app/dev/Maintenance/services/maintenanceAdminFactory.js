var maintenance = angular.module('maintenanceApp');

maintenance.factory('dataAdminFactory', function($http,seshkeys, $window){
	var url = $window.sessionStorage.getItem(seshkeys.serviceurl);



	var factory = {};

	factory.getAllTickets = function(){

		return $http.get(url+'/maintenanceCheck/');

	};

	factory.getCategories = function(){
		return["Request Item","Missing Item","Broken Item"];
	};

	factory.getStatus = function(){
		return['Submitted','In-Progress','Complete'];
	};


	factory.getTicketById = function(id){
		
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
