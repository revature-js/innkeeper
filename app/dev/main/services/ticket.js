
/**
 * Ticket services.
 */
app.service('ticketService', function($http) {
    return {

        /**
         * Returns all tickets.
         */
        getAllTickets: function(success,error) {
            var promise = $http.get('http://localhost:1234/alltickets');
            promise.then(
		        function(data) { success(data); },
	    	    function(err)  { error(err); }
        	);
        },

        /**
         * Submits a new ticket.
         */
        submitTicket: function(ticket,success,error) {
            var promise = $http.post('http://localhost:1234/addticket', ticket);
            promise.then(
		        function(data) { success(data); },
	    	    function(err)  { error(err); }
        	);  
        }        
    }
});
