  var register = angular.module('registerModule', []);


register.controller('registerCtrl', function($scope,$window,registerFactory,$http){

		var factory = {};
		

		$scope.register = function(){
		var userObj = {
			username: $scope.registerUsername,
			password: $scope.registerPassword,
			email: $scope.registerEmail,
			fname: $scope.registerFname,
			lname: $scope.registerLname,
			isAdmin: false,
			aptId: "1",
			batch: "TESTING"
		};
		//CHECK VALIDATIONS, if validations  cause no err->


			console.log(userObj);
			var post = $http.post('../../mockdata.json',userObj);
			
			post.success(function(data,status,headers){
			$scope.message = data;
			console.log(data);
			});
			 post.error(function(data,status,headers){
			 alert("FAIL", + JSON.stringify({data: data}));
			 });
		};

		// $http.post(url, data)
  //           .success(function (data, status, headers) {
  //           })
  //           .error(function (data, status, header) {
  //           });



   //          $http.post(url, data, config)
   // .then(
   //     function(response){
   //       // success callback
   //     }, 
   //     function(response){
   //       // failure callback
   //     }
   //  );

   // The response object has following properties

   //  data - it can be either string or an object (inserted object)
   //  status - HTTP status ode
   //  headers - header information
   //  config - configuration that was used to send request
   //  statusText - response of HTTP status text


		// factory.getLoginInfo = function(successCallback, errorCallback){
		// 	$http.get('mockdata.json')
		// 	.then(function(data){
		// 		successCallback(data);
		// 	},
		// 	function(err){
		// 		errorCallback(err);
		// 	});
		// };
	
		// return factory;

});