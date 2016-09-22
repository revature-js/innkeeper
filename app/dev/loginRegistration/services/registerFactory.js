var login = angular.module('loginModule');

login.factory('registerFactory', function($http,$window){

	var factory = {};

	factory.checkUsername = function(username){
		return $http.get('http://localhost:3030/login');
	};
	
	factory.createUser = function(data){
		return $http.post('http://localhost:3030/createUser', data);
	};

	return factory;
});