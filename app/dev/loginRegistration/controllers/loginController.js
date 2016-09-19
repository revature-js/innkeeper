var login = angular.module('loginModule', []);

login.controller('loginCtrl', function($scope,$window,loginFactory,seshkeys,$location,$timeout){

$scope.login = function(){
	loginFactory.getLoginInfo($scope.loginUsername).then(
		function(userData){
			if((userData.data.username === $scope.loginUsername) && (userData.data.password === $scope.loginPassword))
			{
				alert("successful login");
				storeSession($window,userData.data,seshkeys);
				console.log(sessionStorage);
				$timeout(function(){
					$location.path('/');
				});
			}
		},
		function(){
			alert("Error logging in...");
			$scope.loginUsername = "";
			$scope.loginPassword = "";
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
 	console.log(window.sessionStorage);
};