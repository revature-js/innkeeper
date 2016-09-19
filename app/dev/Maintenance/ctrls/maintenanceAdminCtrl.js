var maintenance = angular.module('maintananceApp', []);

maintenance.controller('maintenanceAdminCtrl', function($scope){
	$scope.ticketSubmission = [];
	$scope.ticketHistory = [];
	
	

	// var getAllTickets = function(){
	// 	ticketFactory.getAllTickets()
	// 	.then(
	// 		function(data){
	// 		$scope.ticketHistory = data.data;
	// 	},
	// 		function(){
	// 			alert('nope');
	// 	}
	// );

	// };
	//getAllTickets();

	$scope.submitNewTicket  = function(){
		$scope.ticketSubmission.push({
			category:$scope.category,
			description:$scope.description,
			startDate:new Date(),
			completeDate:'',
			status:'Submitted',
			aptID:$scope.apartment,
			usr:''});

		$scope.ticketHistory.push({
			category:$scope.category,
			description:$scope.description,
			startDate:'',
			completeDate:'',
			status:'Submitted',
			aptID:$scope.apartment,
			usr:''});

		// console.log($scope.ticketSubmission.category);
		// alert($scope.ticketSubmission.category);
	}

	$scope.dateFilter = function(property, beginDate){
		return function(item){
			if(item[property] === null) return false;

			var itemDate = moment(item[property]);
			var start = moment(beginDate,"DD-MM-YYYY");

			if (itemDate >= start) return true;
			return false
		}
	}



});