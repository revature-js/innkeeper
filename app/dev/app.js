var app = angular.module("mainApp",['ngRoute','loginModule','registerModule','reimbursementApp','ApartmentApp','maintenanceApp']);
var reimbursement = angular.module('reimbursementApp', []);
var register = angular.module('registerModule', []);
var login = angular.module('loginModule', []);
var Apartment = angular.module('ApartmentApp', []);
var maintenance = angular.module('maintenanceApp', []);

app.constant('seshkeys',{
	fname: "fname",
	lname: "lname",
	username: "username",
	aptid: "aptId",
	isadmin: "isAdmin"
});

app.controller('NavbarCtrl',function($scope,$http, $location,$window,seshkeys,$timeout){

	$scope.$on('$locationChangeStart', function(){
    	$scope.online = isOnline($window, seshkeys);
    	$scope.admin = isAdmin($window, seshkeys);
    	console.log($scope.admin);
    	$scope.greetingMessage = $window.sessionStorage.getItem(seshkeys.fname) + " " + $window.sessionStorage.getItem(seshkeys.lname);
    });

    $scope.$on('$locationChangeStart', function(){
		if($scope.online === true && !$location.path().includes('register')){
			$location.path('/login');
		}
	});

	$scope.isActive = function (viewLocation) { 
        return $location.path().includes(viewLocation);
    };

	$scope.logout=function()
	{
		$window.sessionStorage.clear();
		$http.get('http://localhost:3030/logout');
		$scope.online = isOnline($window, seshkeys);
		$timeout(function(){
			$location.path('/login');
		},2000);
	};

	$scope.online = isOnline($window, seshkeys);

	$scope.admin = false;

});

function isOnline(window,seshkeys){
	if(window.sessionStorage.getItem(seshkeys.username)===null)
	{
		return true;
	}
	else{
		return false;
	}
};

function isAdmin(window, seshkeys){
	console.log(window.sessionStorage.getItem(seshkeys.isadmin));
	if(window.sessionStorage.getItem(seshkeys.isadmin)==="true")
	{
		return true;
	}
	else{
		return false;
	}
};

app.config(function($routeProvider) {
	$routeProvider
	.when("/apartments", {
		templateUrl: "Room_Apt/views/aptPage.html",
		controller: "apt_list_user"
	})
	.when("/apartments/manage",{
		templateUrl: "Room_Apt/views/apt_admin.html",
		controller: "apt_list_admin"
	})
	.when("/maintenance", {
		templateUrl: "Maintenance/views/Maintenance.html",
		controller: "maintenanceCtrl"
	})
	.when("/maintenance/manage", {
		templateUrl: "Maintenance/views/MaintenaceAdmin.html",
		controller: "maintenanceAdminCtrl"
	})
	.when("/reimbursement", {
		templateUrl: "reimbursement/views/reimbursement.html",
		controller: "BurseCtrl"
	})
	.when("/reimbursement/manage",{
		templateUrl: "reimbursement/views/reimbursement_admin.html",
		controller: "BurseAdminCtrl"
	})
	.when("/login", {
		templateUrl: "loginRegistration/views/login.html",
		controller: "loginCtrl"
	})
	.when("/register", {
		templateUrl: "loginRegistration/views/register.html",
		controller: "registerCtrl"
	})
});