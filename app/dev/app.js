var app = angular.module("mainApp",['ngRoute','reimbursementApp','maintenanceApp']);

app.constant('seshkeys',{
	fname: "fname",
	lname: "lname",
	username: "username",
	aptId: "aptId",
	isAdmin: "isAdmin"
})

app.controller('NavbarCtrl',function($scope, $location){
	$scope.isActive = function (viewLocation) { 
        return $location.path().includes(viewLocation);
    };
});

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
