var register = angular.module('registerModule');

register.factory('registerFactory', function($http,$window,seshkeys){

	var factory = {};
	
	factory.createUser = function(data){
		return $http.post(serviceUrl + '/createUser', data);
	};

	return factory;
});