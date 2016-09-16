/*app.controller('apt_list_user', function($scope, myserv) {
     $scope.apt=myserv.func();
});*/
ApartmentApp.controller('apt_list_admin', function($scope, myfact) {
     var successFunction = function(data){
        var data=data.data;
            $scope.search = function(username) {
        $scope.data="";
           for(var i = 0; i < data.rooms[0].bedrooms.length; i++)
        {
            for(var j=0; j < data.rooms[0].bedrooms[i].room.occupants.length; j++)
                {
                    if(data.rooms[0].bedrooms[i].room.occupants[j]===username){
                        $scope.data=data;
                        x= true;
                        break;
                    }
                    else{
                        x=false;
                    };
                }; 
                if(x){break;} 
        };
        if(x===false){
            confirm("User not Found");
        };
        $scope.username="";
    };
    }
    var errorFunction = function(err){
        $scope.data=err;
    };
    myfact.getJSON(successFunction,errorFunction);
    var x= false;
    $scope.dosomething = function(event,username){
        if(event.which===13){
                $scope.search(username);
        }
    };
});
ApartmentApp.controller('apt_list_user',function($scope,myfact)
{
    var successFunction = function(data){
        $scope.data=data.data;
        console.log(data);
    }
    var errorFunction = function(err){
        $scope.data=err;
    };
    myfact.getJSON(successFunction,errorFunction);
});