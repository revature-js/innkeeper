
app.factory('apartmentFactory',function($http){
	var apartmentdata = 'apartmentdata.json';
	var gettApartments = function(data,successCallback, errorCallback){
		 $http.get(apartmentdata).then(function(data){
		 	successCallback(data);
		 }, function(err){
		 	errorCallback(data);
		 });
	};
	/*
	var gettRooms = function(){
		return $http.get(apartmentdata).then(function(data){
		 	successCallback(data.tRooms);
		 }, function(err){
			errorCallback(err);
		 });
	};
	var getfTraines = function(){
		return $http.get(apartmentdata).then(function(data){
		 	successCallback(data.fTraines);
		 }, function(err){
		 	errorCallback(err);
		 });
	};
	var getroomsUsed = function(){
		return $http.get(apartmentdata).then(function(data){
		 	successCallback(data.roomsUsed);
		 }, function(err){
		 	errorCallback(err);
		 });
	};
	var getcurrentTraines = function(){
		return $http.get(apartmentdata).then(function(data){
		 	successCallback(data.currentTraines);
		 }, function(err){
		 	errorCallback(err);
		 });
	};
	*/
	return {
		gettApartments:gettApartments,
		//gettRooms:gettRooms,
		//getfTraines:getfTraines,
		//getroomsUsed:getroomsUsed,
		//getcurrentTraines
	};
});