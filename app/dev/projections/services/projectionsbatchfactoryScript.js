
projectionApp.factory('batchfactory',function($http){
	var batchdata = ["./dev/projections/assets/batch.json","./dev/projections/assets/batch1.json"];
	var getbatch = function(query, query, query,successCallback, errorCallback){
		for(i = 0; i < batchdata.length; i++){
			$http.get(batchdata[i]).then(function(data){
				successCallback(data);
			}, function(err){
				errorCallback(data);
			});
		/*
		 $http.get(batchdata1).then(function(data){
		 	successCallback(data);
		 }, function(err){
		 	errorCallback(data);
		 });
		*/
	}
	};
	return{
		getbatch: getbatch
	};
});