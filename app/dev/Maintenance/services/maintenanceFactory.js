var maintenance = angular.module('maintenanceApp');

maintenance.factory('dataFactory', function($http, seshkeys, $window){
	
	var url = $window.sessionStorage.getItem(seshkeys.serviceurl);
	var factory = {};

	factory.getTicketsByUser = function(){
		return $http.get(url+'/maintenanceCheck/');
	};

	return factory;

	});
