var Apartment = angular.module('ApartmentApp');
Apartment.factory('myfact',function($http,$window,seshkeys){
   var url =$window.sessionStorage.getItem(seshkeys.serviceurl);
    var fact={};
            fact.getAllApartments=function(){
                return $http.get(url+ '/apartments')
            };
            fact.getUser = function(){
                    return $http.get(url +'/apartments/allusers');
                };

            fact.updateUser = function(username,aptId){
                    return $http.post(url+'/apartments/allusers/'+username+"/"+aptId);
                };

            fact.addApartment = function(data){
                    console.log(data);
                    return $http.post(url+'/apartments', data);
                };
                 return fact;
});

