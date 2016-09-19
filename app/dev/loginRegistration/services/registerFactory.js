login.factory('registerFactory', function($http,$window){

	var factory = {};

	factory.getRegisterInfo = function(successCallback, errorCallback){
		$http.get('mockdata.json')
		.then(function(data){
			successCallback(data);
		},
		function(err){
			errorCallback(err);
		});
	};
	
	factory.createUser = function(data){
		return $http.post('http://localhost:3030/createUser', data);
	};

	return factory;
});