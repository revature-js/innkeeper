var app = angular.module("apt", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/user", {
        templateUrl: "../views/aptPage.html",
        controller:"apt_list_user"
    })
    .when("/admin", {
        templateUrl:"../views/apt_admin.html",
        controller:"apt_list_admin"
    })
    .otherwise({
        redirectTo:"/"
    });
});