var login = angular.module('loginModule');

login.controller('loginCtrl', function($scope,$window,loginFactory,seshkeys,$location,$timeout){
	
	$scope.login = function(){
		var promise = loginFactory.tryLogin($scope.loginUsername, $scope.loginPassword);
		promise.then(
			function(userData){
				if(userData.data.length > 1){
					$timeout(function(){
						alert("Invalid username/password");
						$location.path('/login');
					});
				}else{
					storeSession($window,userData.data.user,seshkeys);

					if(userData.data.user.isAdmin===true){
						$location.path('/reimbursement/manage');
					}else {
						$location.path('/reimbursement');
					}
				}
			},function(err)
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