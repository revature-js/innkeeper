var register = angular.module('registerModule');

register.factory('registerFactory', function($http,$window,seshkeys){

	var factory = {};
	
	factory.createUser = function(data){
		return $http.post('http://localhost:3030/createUser', data);
	};

	return factory;
});