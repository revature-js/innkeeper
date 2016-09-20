

maintenance.factory("dataFactory", function(){
	// ---

	return {
		getCategories: function(){
			return["Request Item","Missing Item","Broken Item"];

		}
	}



	// ---



	// var factory = {};

	// factory.getAllTickets = function(data){
	// 	$http.get('http://localhost:3000/',
	// 		data);
	// }

	// factory.getCategories = function(){
	// 	return["Request Item","Missing Item","Broken Item"];
	// };

	// service.getStatus = function(){
	// 	return['Submitted','In-Progress','Complete'];
	// };


	// return factory;

	// factory.updateTicket = function(data,update){
	// 	return $http.post('http://localhost:3000/maintenanceTickets'+
	// 		data._id+'/'+update);

	// };


	// factory.sumbmitTicket = function(data){
	// 	return $http.post('http://localhost:3030/maintenanceTickets',
	// 		data);
		
	// };
});
