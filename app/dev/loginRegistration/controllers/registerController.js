var register = angular.module('registerModule', []);

register.controller('registerCtrl', function($scope,$window,registerFactory,$http){

	var errors = false;

	var isMatch = function(p1,p2)
	{
		if(p1!=p2)
		{
			errors = true;
			alert("Passwords do not match");
		}
	};

	var reset = function()
	{
		$scope.registerUsername = "";
		$scope.registerPassword = "";
		$scope.registerPassword2 = "";
		$scope.registerEmail = "";
		$scope.registerFname = "";
		$scope.registerLname = "";
	};

	var factory = {};




//////////////////////////////////////////////////////////////////////////////////////////////////////////
		
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

		checkBody(userObj.username,'Username');
		checkBody(userObj.password,'Password');
		checkBody(userObj.email,'Email');
		checkBody(userObj.fname,'First Name');
		checkBody(userObj.lname,'Last Name');
		checkBody($scope.registerPassword2,'Confirm Password');
		isMatch($scope.registerPassword,$scope.registerPassword2);

		if(errors==true)
		{
			reset();
			errors = false;
		}
		else{
			//post to databse here
			console.log(userObj);
			}
		};

		var checkBody = function(field, fieldName)
		{
			if(!field)
			{
				errors = true;
				alert(fieldName + " is required.");
			}
		};
});

			// var post = $http.post('URL',userObj);

			// post.success(function(data,status,headers){
			// //$scope.message = data;
			// console.log(data);
			// });
			//  post.error(function(data,status,headers){
			//  alert("FAIL", + JSON.stringify({data: data}));
			//  });

		// $http.post(url, userObj)
  //           .success(function (userObj, status, headers) {
  //           })
  //           .error(function (userObj, status, header) {
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
