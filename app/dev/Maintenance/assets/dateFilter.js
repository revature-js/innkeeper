maintenance.filter('isOnDate', function(){//filter to get all tickets on a specific date

	return function(tickets,dateOn){

		var output=[];

		var i;
		
		var filterDate = Date.parse(dateAfter);

		for (i=0; i < tickets.length; i++){
			var dateToCheck = Date.parse(tickets.startDate);
			console.log("we filtering boyz");
			

			if(filterDate == dateToCheck){
				output.push(tickets[i]);
			}
			else{
				output=tickets;
				}

		};

		return output;



	};
});