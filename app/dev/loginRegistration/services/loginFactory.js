var login = angular.module('loginModule');

login.factory('loginFactory', function($http,$window,$timeout,seshkeys){

	var factory = {};

		factory.tryLogin = function(username, password){
			return $http.post(serviceUrl + '/login', {username: username, password: password});
		};
	return factory;
});