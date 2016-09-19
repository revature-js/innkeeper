maintenanceAdmin.factory('dataFactory', function($http){
	

	var fatory = {};

	factory.getCategories = function(){
		return['Request Item','Missing Item','Broken Item'];
	};

	factory.getStatus = function(){
		return['Submitted','In-Progress','Complete'];
	};


	factory.getTicketsByUser = function(){

	};

	factory.updateTicket = function(data){

	};


	factory.sumbmitTicket = function(data){
		$http.post('mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms',
			data);
		
	}
};
