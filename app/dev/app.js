/*
 *	app.js
 *		- Main app routing for navigation.
 */
 
// main module.
var app = angular.module("mainapp",['ngRoute']);

/**
*	Configure routing paths. Responsible for
*	mapping views into the main page.
*/
app.config(function($routeProvider) {

	$routeProvider

	// navbar routes.
	.when("/innkeeper",       { templateUrl: "/main/views/index2.html" } )
	.when("/room",            { templateUrl: "/main/views/index3.html" } )
	.when("/maintain/manage", { templateUrl: "/main/views/index3.html" } )
	.when("/maintain/view",   { templateUrl: "/main/views/index3.html" } )
	.when("/reimb",           { templateUrl: "/main/views/index3.html" } )
	.when("/projection",      { templateUrl: "/main/views/index3.html" } )
	.when("/logout",          { templateUrl: "/main/views/index3.html" } )

	// these two are unique cases.
	.when("/",                { templateUrl: "/main/views/index2.html" } )
	.otherwise(               { redirectTo:  "/"                 } );
});
