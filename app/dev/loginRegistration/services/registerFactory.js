var register = angular.module('registerModule');

register.factory('registerFactory', function($http,$window,seshkeys){

	var factory = {};

	factory.createUser = function(data){
		return $http.post($window.sessionStorage.getItem(seshkeys.serviceurl) + '/createUser', data);
	};

	return factory;
});
