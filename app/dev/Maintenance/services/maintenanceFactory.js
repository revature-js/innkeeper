var maintenance = angular.module('maintenanceApp', []);

maintenance.factory('dataFactory', function($http){
	var getAllTickets = function(){
		var defer = $q.defer();
		$http.get('mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms').then(function(response){
			defer.resolve(response.data);
		}, function(response) {
			defer.reject(response);
		
		});

		return defer.promise;
	};
