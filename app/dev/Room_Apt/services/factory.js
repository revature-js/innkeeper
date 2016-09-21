Apartment.factory('myfact',function($http){
    var fact={};
fact.getAllApartments=function(successCallback,errorCallback){
    $http.get('http://localhost:3030/apartments')
    .then(function(data){
        successCallback(data);
    },
        function(err){
            errorCallback(err);
        }
    );
};
fact.getApartmentsByAptId=function(successCallback,errorCallback){
    $http.get('http://localhost:3030/apartments/2202-107')
    .then(function(data){
        successCallback(data);
    },
        function(err){
            errorCallback(err);
        }
    );
};
fact.updateApartment = function(aptId,username){
        console.log(aptId+","+username);
        return $http.post('http://localhost:3030/apartments/'+aptId+"/"+username);
    };

fact.addApartment = function(data){
        console.log("data");
        return $http.post('http://localhost:3030/apartments', data);
    };
    return fact;
});
