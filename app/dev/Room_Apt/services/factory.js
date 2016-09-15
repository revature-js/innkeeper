app.factory('myfact',function($http){
    var fact={};
fact.getJSON=function(successCallback,errorCallback){
    $http.get('../assets/data.json')
    .then(function(data){
        successCallback(data);
    },
        function(err){
            errorCallback(err);
        }
    );
};
    return fact;
});