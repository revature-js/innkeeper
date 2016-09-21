var login = angular.module('loginModule', []);

login.controller('loginCtrl', function($scope,$window,loginFactory,seshkeys,$location,$timeout){

$scope.login = function(){

	var promise = loginFactory.tryLogin($scope.loginUsername, $scope.loginPassword);
	promise.then(
		function(userData){
			storeSession($window,userData.data.user,seshkeys);
			$location.path('/apartments');

		}, function(err)
		{
			$timeout(function(){
				alert("Invalid username/password");
				$location.path('/login');
			});
		}
	);
};
});

function storeSession(window,data,seshkeys){
 	window.sessionStorage.setItem(seshkeys.username, data.username);
 	window.sessionStorage.setItem(seshkeys.fname, data.fname);
 	window.sessionStorage.setItem(seshkeys.lname, data.lname);
 	window.sessionStorage.setItem(seshkeys.aptid, data.aptId);
 	window.sessionStorage.setItem(seshkeys.isadmin, data.isAdmin);
};