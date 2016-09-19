var register = angular.module('registerModule', []);

register.controller('registerCtrl', function($scope,$window,registerFactory,$http,$location){

	var errors = false;
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
			registerFactory.createUser(userObj).then(
				function(result){
					console.log(result);
					$location.path('/login');
				},
				function(){
					alert("There was an error registering...");
				}
			);
		}
	};	
});

var checkBody = function(field, fieldName){
	if(!field) {
		errors = true;
		alert(fieldName + " is required.");
	}
};

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