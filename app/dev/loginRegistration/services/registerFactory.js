var register = angular.module('registerModule');
register.factory('registerFactory', function($http,$window,seshkeys){

	var factory = {};

	factory.checkUsername = function(username){
		return $http.get('http://localhost:3030/login');
	};
	
	factory.createUser = function(data){

		return $http.post(seshkeys.securedurl + '/createUser', data);
	};

	return factory;
});