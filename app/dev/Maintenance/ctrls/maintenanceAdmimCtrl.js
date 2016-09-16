app.controller('maintenanceAdminCtrl', function($scope, ticketFactory){
	ticketFactory.getAllTickets().then(function(data){
		$scope.tickets = data;
	},
	 $http.get('')
        .success(function (data) {
			$scope.storyList = data;
			
			
        });
});