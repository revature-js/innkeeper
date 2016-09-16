dalDemo.controller('dataCtrl', function($scope, dataFactory){
	dataFactory.getAllTickets().then(function(data){
		$scope.tickets = data;
	},
	function(){
		$scope.error = 'cannot find them tickets';
	});
});