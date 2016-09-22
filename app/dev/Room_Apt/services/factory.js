Apartment.factory('myfact',function($http){
    var fact={};
fact.getAllApartments=function(){
    return $http.get('http://localhost:3030/apartments')
};
    fact.getUser = function(username){
        return $http.get('http://localhost:3030/login');
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
fact.updateUser = function(username,aptId){
    console.log("x");
        return $http.post('http://localhost:3030/login/'+username+"/"+aptId);
    };

fact.addApartment = function(data){
        console.log("data");
        return $http.post('http://localhost:3030/apartments', data);
    };
    return fact;
});
