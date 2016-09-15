var login = angular.module('loginModule', []);

login.controller('loginCtrl', function($scope,$window,loginFactory){

	var successFunction = function(data){
		$scope.data = data;
		//console.log($scope.data.data);
		
	}
	var errorFunction = function(err){
		$scope.data = err;
	};

	loginFactory.getLoginInfo(successFunction,errorFunction);


	$scope.login = function(){
		if($scope.data.data.username==$scope.loginUsername && $scope.data.data.password == $scope.loginPassword)
		{
			console.log('Successful Login');
		}
	};
});