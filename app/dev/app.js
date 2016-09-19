/*
 *	app.js
 *		- Main app routing for navigation.
 */
 
// main module.
<<<<<<< HEAD
var app = angular.module("mainApp",['ngRoute','reimbursementApp']);

//'reimbursementApp','loginModule','registerModule','maintenanceApp','apartmentApp'

app.constant('seshkey',{
	fname: "fname",
	lname: "lname",
	username: "username",
	aptid: "aptId",
	isAdmin: "isAdmin"
})

app.controller('NavbarCtrl',function($scope, $location){

	$scope.admin = true;

	$scope.isActive = function (viewLocation) { 
        return $location.path().includes(viewLocation);
    };
});
=======
var app = angular.module("mainApp",['ngRoute',
									'reimbursementApp',
									'loginModule',
									'registerModule',
									'maintenanceApp',
									'apartmentApp',
									'projectionApp']);
>>>>>>> refs/remotes/origin/alex2

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
<<<<<<< HEAD
=======
	.when("/projections", {
		templateUrl: "projections/views/projections.html",
		controller: "projectionCtrl"
	})
>>>>>>> refs/remotes/origin/alex2
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
