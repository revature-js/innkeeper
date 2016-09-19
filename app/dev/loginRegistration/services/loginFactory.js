login.factory('loginFactory', function($http,$window){

	var factory = {};

		factory.getLoginInfo = function(username){
			return $http.get('http://localhost:3030/login/' + username);
		};
		return factory;
});