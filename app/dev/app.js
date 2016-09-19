/*
 *	app.js
 *		- Main app routing for navigation.
 */
 
// main module.
var app = angular.module("mainApp",['ngRoute','loginModule','registerModule']);

//'reimbursementApp','loginModule','registerModule','maintenanceApp','apartmentApp'

app.constant('seshkeys',{
	fname: "fname",
	lname: "lname",
	username: "username",
	aptid: "aptId",
	isadmin: "isAdmin"
});

app.controller('NavbarCtrl',function($scope, $location,$window,seshkeys){

	$scope.admin = true;

	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.online = isOnline($window, seshkeys);
    $scope.greetingMessage = $window.sessionStorage.getItem(seshkeys.fname) + " " + $window.sessionStorage.getItem(seshkeys.lname);


$scope.logout=function()
{
	$window.sessionStorage.clear();
	console.log(sessionStorage);
	alert("Successful Logout");

	$timeout(function(){
		$location.path('/login');
	});
};

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

/**
*	Configure routing paths. Responsible for
*	mapping views into the main page.
*/
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
	.otherwise({
		redirectTo: "/"
	});
});
