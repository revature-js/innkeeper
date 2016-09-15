
app.factory('batchfactory',function($http){
	var batchdata = './dev/projections/assets/batch.json';
	var getbatch = function(data,successCallback, errorCallback){
		 $http.get(batchdata).then(function(data){
		 	successCallback(data);
		 }, function(err){
		 	errorCallback(data);
		 });
	};
	return{
		getbatch: getbatch
	}
});