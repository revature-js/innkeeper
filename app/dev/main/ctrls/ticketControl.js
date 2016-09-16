
/**
*	Ticket controller.
*		$scope - Controller sccope.
*		$http - Http services.
*/
app.controller("ticket_controller", function($scope, ticketService) {

    function general_error(err) { }
    
    function view_success(data) {
        $scope.tickets = data.data;
    }

    /**
     * Initializes tickets view.
     */
    ticketService.getAllTickets(view_success,general_error);

    /**
     * Submit event callback.
     */
    $scope.submit_ticket = function() {

        function success(data) {
            ticketService.getAllTickets(view_success,general_error);
        }

        ticketService.submitTicket($scope.ticket,success,general_error);
    };
});
