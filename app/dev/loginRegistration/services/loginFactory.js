var login = angular.module('loginModule');

login.factory('loginFactory', function($http,$window,$timeout){

	var factory = {};

		factory.tryLogin = function(username, password){
			return $http.post('http://localhost:3030/login', {username: username, password: password});
		};
	return factory;
});