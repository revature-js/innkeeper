/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	module.exports = __webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var app = angular.module("mainApp",['ngRoute','loginModule','registerModule','reimbursementApp']);
	var reimbursement = angular.module('reimbursementApp', []);
	var register = angular.module('registerModule', []);
	var login = angular.module('loginModule', []);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	var login = angular.module('loginModule');

	login.controller('loginCtrl', function($scope,$window,loginFactory,seshkeys,$location,$timeout){

	$scope.login = function(){

		var promise = loginFactory.tryLogin($scope.loginUsername, $scope.loginPassword);
		promise.then(
			function(userData){
				storeSession($window,userData.data.user,seshkeys);
				if(userData.data.user.isAdmin===true){
					$location.path('/reimbursement/manage');
				}
				else {
					$location.path('/reimbursement');
				}
			}, function(err)
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	var register = angular.module('registerModule');

	register.controller('registerCtrl', function($scope,$window,registerFactory,$http,$location,$timeout){

		var errors = false;
		var factory = {};
		var flag = false;
			
		$scope.register = function(){

			var checkPromise = registerFactory.checkUsername($scope.registerUsername);
				checkPromise.then(				
					function(result){
						for(x in result.data)
						{
								if($scope.registerUsername===result.data[x].username){
									alert("Username is taken");
									flag = true;
								}
						}
						if(flag===false)
						{
							var userObj = {
								username: $scope.registerUsername,
								password: $scope.registerPassword,
								email: $scope.registerEmail,
								fname: $scope.registerFname,
								lname: $scope.registerLname,
								isAdmin: false,
								aptId: "1",
								batch: "TESTING"
							};

							checkBody(userObj.username,'Username');
							checkBody(userObj.password,'Password');
							checkBody(userObj.email,'Email');
							checkBody(userObj.fname,'First Name');
							checkBody(userObj.lname,'Last Name');
							checkBody($scope.registerPassword2,'Confirm Password');
							isMatch($scope.registerPassword,$scope.registerPassword2);

							if(errors==true)
							{
								reset();
								errors = false;
							}
							else{
							//post to databse here
								registerFactory.createUser(userObj).then(
									function(result){
										$location.path('/login');
									},
									function(){
										alert("There was an error registering...");
									}
								);
							}
						}
						else{

						}
				},
			//on error
			function(err){
				alert(err);
			});
		};	
	});

	var checkBody = function(field, fieldName){
		if(!field) {
			errors = true;
			alert(fieldName + " is required.");
		}
	};

	var isMatch = function(p1,p2)
	{
		if(p1!=p2)
		{
			errors = true;
			alert("Passwords do not match");
		}
	};

	var reset = function()
	{
		$scope.registerUsername = "";
		$scope.registerPassword = "";
		$scope.registerPassword2 = "";
		$scope.registerEmail = "";
		$scope.registerFname = "";
		$scope.registerLname = "";
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var login = angular.module('loginModule');

	login.factory('loginFactory', function($http,$window,$timeout){

		var factory = {};

			factory.tryLogin = function(username, password){
				return $http.post('http://localhost:3030/login', {username: username, password: password});
			};
		return factory;
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	var login = angular.module('loginModule');

	login.factory('registerFactory', function($http,$window){

		var factory = {};

		factory.checkUsername = function(username){
			return $http.get('http://localhost:3030/login');
		};
		
		factory.createUser = function(data){
			return $http.post('http://localhost:3030/createUser', data);
		};

		return factory;
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	var reimbursement = angular.module('reimbursementApp');

	reimbursement.controller("BurseAdminCtrl", function($scope, burseService, $timeout){

		var getAllReimbursements = function(){
			burseService.getAllReimbursements()
			.then(
				function(data){
					$scope.burseHistory = data.data;
					$scope.emptyHistory = emptyHistory($scope.burseHistory);
					$scope.selected = false;
				},
				function(){
					alert("Failed to retreive reimbursements...");
				}
			);
		};

		$scope.setSidebarActive = function(event){
			var buttons = document.getElementsByClassName("navButton");
			var i;
			for (i = 0;i < buttons.length;i++){
				angular.element(buttons[i]).removeClass("active");
			}
			angular.element(event.target).parent().addClass("active");
		};

		$scope.display = function(id){
			burseService.getReimbursementById(id).then(
				function(result){
					$scope.displayBurse = result.data;
					$scope.selected = true;
					$scope.completed = checkCompleted($scope.displayBurse);
				},
				function(){
					alert("Error retreiving reimbursement...");
				}
			);
		};

		$scope.makeDecision = function(decision){
			burseService.updateReimbursement($scope.displayBurse, decision)
			.then(
				function(data){
					if($scope.pending){
						getAllReimbursements();
					}else{
						$scope.display($scope.displayBurse._id);
					}
					
				},
				function(){
					alert("Update failed...")
				}
			);
		};

		$scope.reset = function(){
			getAllReimbursements();
		};

		$scope.filterForPending = function(item){
			if($scope.pending && item.status==="In Progress"){
				return true;
			}
			else if($scope.pending === false || $scope.pending === undefined){
				return true;
			}
			else {
				return false
			}
		};

		$scope.burseHistory = [];
		$scope.emptyHistory = true;
		$scope.displayBurse = {};
		$scope.selected = false;
		$scope.completed = false;
		getAllReimbursements();
	});

	function checkCompleted(burse){
		if (burse.status === "In Progress"){
			return true;
		}
		else {
			return false;
		}
	};

	function emptyHistory(history){
		if(history.length === 0){
			return true;
		}
		else {
			return false;
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var reimbursement = angular.module('reimbursementApp');

	reimbursement.controller("BurseCtrl", function($scope, burseService, $window, seshkeys) {

		var getReimbursementsByUsername = function(){
			burseService.getReimbursementsByUsername(username)
			.then(
				function(result){
					$scope.burseHistory = result.data;
					$scope.emptyHistory = emptyHistory($scope.burseHistory);
				},
				function(){
					alert("Failed to retreive reimbursements...");
				}
			);
		};

		$scope.addReimbursement = function() {
			if (checkEmptyBurse($scope.burseSubmit)){
				alert("Must complete previous rows before adding another");
			}
			else {
				$scope.burseSubmit.push({date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:username,name:name});
			}
		};

		$scope.submitReimbursement = function() {
			if (checkEmptyBurse($scope.burseSubmit)){
				alert("Must complete all rows before submitting");
			}
			else {
				burseService.addReimbursement($scope.burseSubmit).then(
					function(){
						$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:username,name:name}];
						getReimbursementsByUsername();
					},
					function(){
						alert("Failed to submit reimbursements...");
					}
				);
			}
		};

		$scope.removeReimbursement = function(index){
			$scope.burseSubmit.splice(index,1);
		};

		var name = $window.sessionStorage.getItem(seshkeys.fname)+" "+$window.sessionStorage.getItem(seshkeys.lname);
		var username = $window.sessionStorage.getItem(seshkeys.username);
		$scope.types = burseService.getTypesOfBurse();
		$scope.burseSubmit = [{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:username,name:name}];
		$scope.burseHistory = [];
		getReimbursementsByUsername();
		$scope.emptyHistory = emptyHistory($scope.burseHistory);
	});

	function checkEmptyBurse(data){
		var empty = false;
		for (index in data){
			if(data[index].date === "" || 
				data[index].type === "Select a Type" || 
				data[index].desc === "" || 
				data[index].amount === ""){
				empty = true;
			}
		}
		return empty;
	};

	function emptyHistory(history){
		if(history.length === 0){
			return true;
		}
		else {
			return false;
		}
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var reimbursement = angular.module('reimbursementApp');

	reimbursement.factory("burseService", function($http){

		var service = {};

		service.getTypesOfBurse = function(){
			return ["Travel","Certification","Supplies"];
		};

		service.getReimbursementById = function(id){
			return $http.get('http://localhost:3030/reimbursements/'+id);
		};

		service.getReimbursementsByUsername = function(username){
			return $http.get('http://localhost:3030/reimbursement/'+username);
		};

		service.getAllReimbursements = function(){
			return $http.get('http://localhost:3030/reimbursements/');
		};

		service.addReimbursement = function(data){
			return $http.post('http://localhost:3030/reimbursements/', data);
		};

		service.updateReimbursement = function(data,decision){
			return $http.post('http://localhost:3030/reimbursements/'+data._id+"/"+decision);
		};

		return service;
	});

/***/ }
/******/ ]);