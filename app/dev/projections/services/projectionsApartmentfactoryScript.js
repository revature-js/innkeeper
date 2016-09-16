
projectionApp.factory('apartmentFactory',function($http){
	var apartmentdata = './dev/projections/assets/apartmentdata.json';
	var gettApartments = function(data,successCallback, errorCallback){
		 $http.get(apartmentdata).then(function(data){
		 	successCallback(data);
		 }, function(err){
		 	errorCallback(data);
		 });
	};

	return {
		gettApartments:gettApartments,
	};
});