var app = angular.module("mainApp",['ngRoute','loginModule','registerModule','reimbursementApp','maintenanceApp','ApartmentApp']);
var reimbursement = angular.module('reimbursementApp', ['ui.router']);
var register = angular.module('registerModule', []);
var login = angular.module('loginModule', []);
var Apartment = angular.module('ApartmentApp', []);
var maintenance = angular.module('maintenanceApp', []);

app.constant('seshkeys',{
	fname: "fname",
	lname: "lname",
	username: "username",
	aptid: "aptId",
	isadmin: "isAdmin",
	serviceurl: "serviceUrl",
	securedurl: "securedUrl"
});

// set the service url based on dev localhost or prod domain url
app.run(function($window,$location,seshkeys){
	var domain = $location.host();

	if (domain && domain !== 'localhost') {
		domain = $location.host();
	}

	$window.sessionStorage.setItem(seshkeys.serviceurl, 'http://' + domain + ':3030');
	$window.sessionStorage.setItem(seshkeys.securedurl, 'https://' + domain + ':3030');

});

app.controller('NavbarCtrl',function($scope,$http, $location,$window,seshkeys,$timeout){

	$scope.$on('$locationChangeStart', function(){
    	$scope.online = isOnline($window, seshkeys);
    	$scope.admin = isAdmin($window, seshkeys);
    	console.log($scope.admin);
    	$scope.greetingMessage = $window.sessionStorage.getItem(seshkeys.fname) + " " + $window.sessionStorage.getItem(seshkeys.lname);
    });

    $scope.$on('$locationChangeStart', function(){
		if($scope.online === false && !$location.path().includes('register')){
			$location.path('/login');
		}
	});

	$scope.isActive = function (viewLocation) {
        return $location.path().includes(viewLocation);
    };

	$scope.logout=function()
	{
		clearStorage($window, seshkeys);
		$http.get('http://localhost:3030/logout');
		$scope.online = isOnline($window, seshkeys);
		$timeout(function(){
			$location.path('/login');
		},2000);
	};

	$scope.online = isOnline($window, seshkeys);

	$scope.admin = false;

});

function clearStorage(window, seshkeys){
	window.sessionStorage.setItem(seshkeys.username, "");
 	window.sessionStorage.setItem(seshkeys.fname, "");
 	window.sessionStorage.setItem(seshkeys.lname,"");
 	window.sessionStorage.setItem(seshkeys.aptid, "");
 	window.sessionStorage.setItem(seshkeys.isadmin, "");
}

function isOnline(window,seshkeys){
	if(window.sessionStorage.getItem(seshkeys.username)===null||window.sessionStorage.getItem(seshkeys.username)==="")
	{
		return false;
	}
	else{
		return true;
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
		templateUrl: "Maintenance/views/MaintenanceAdmin.html",
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
