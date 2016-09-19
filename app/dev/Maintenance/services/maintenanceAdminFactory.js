maintenanceAdmin.factory('dataFactory', function($http){
	

	var fatory = {};

	factory.getAllTickest = function(){
		$http.get('mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms',
			data);
	}

	factory.getCategories = function(){
		return['Request Item','Missing Item','Broken Item'];
	};

	factory.getStatus = function(){
		return['Submitted','In-Progress','Complete'];
	};


	factory.getTicketsByUser = function(){

	};

	factory.updateTicket = function(data,update){
		return $http.post('mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms',
			data._id);

	};


	factory.sumbmitTicket = function(data){
		return $http.post('mongodb://innkeeper:inn123@ds017636.mlab.com:17636/rlms',
			data);
		
	}
};
