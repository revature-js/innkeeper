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
		return factory;
});