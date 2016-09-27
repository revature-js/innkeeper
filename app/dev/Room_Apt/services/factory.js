var Apartment = angular.module('ApartmentApp');
Apartment.factory('myfact',function($http,$window,seshkeys){
   var url =$window.sessionStorage.getItem(seshkeys.serviceurl);
    var fact={};
fact.getAllApartments=function(){
    return $http.get(url+ '/apartments')
};
    fact.getUser = function(username){
        return $http.get(url +'/login');
    }

fact.updateUser = function(username,aptId){
    console.log("x");
        return $http.post(url+'/login/'+username+"/"+aptId);
    };

fact.addApartment = function(data){
        console.log("data");
        return $http.post(url+'/apartments', data);
    };
    return fact;
});

