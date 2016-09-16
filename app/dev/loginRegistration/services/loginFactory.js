login.factory('loginFactory', function($http,$window){

	var factory = {};

		factory.getLoginInfo = function(successCallback, errorCallback){
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

// function storeSession(window,data){
// 	window.sessionStorage.setItem('username', data.username);
// 	window.sessionStorage.setItem('fname', data.fname);
// 	window.sessionStorage.setItem('flname', data.lname);
// 	window.sessionStorage.setItem('batch', data.batch);
// 	window.sessionStorage.setItem('aptId', data.aptId);
// 	console.log(window.sessionStorage);
// };