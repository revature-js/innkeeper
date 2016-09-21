/*app.controller('apt_list_user', function($scope, myserv) {
     $scope.apt=myserv.func();
});*/
var Apartment= angular.module('ApartmentApp',[]);
Apartment.controller('apt_list_admin', function($scope, myfact) {
    var apt={};
    $scope.hide=false;
    $scope.show=false;
    $scope.hidden=true;
     var successFunction = function(data){
        var data=data.data;
        $scope.add ={};
        $scope.search = function(username) {
        $scope.data="";
        console.log(data.length);
        for(var k = 0; k<data.length; k++){
           for(var i = 0; i < data[k].rooms[0].bedrooms.length; i++)
        {
            for(var j=0; j < data[k].rooms[0].bedrooms[i].room.occupants.length; j++)
                {
                    if(data[k].rooms[0].bedrooms[i].room.occupants[j]===username){   
                        $scope.data=data[k];
                        x= true;
                                $scope.show=true;
                        break;
                    }
                    else{
                        x=false;
                    };
                }; 
                if(x){break;} 
        };
        if(x){break;} 
    };
        if(x===false){
            confirm("User not Found");
            $scope.username="";
        };
    };};
    var errorFunction = function(err){
        $scope.data=err;
    };
    myfact.getAllApartments(successFunction,errorFunction);
    var x= false;
    $scope.dosomething = function(event,username){
        if(event.which===13){
                $scope.search(username);
        }
    };
    $scope.anotherApt = function(){
        if($scope.aptNum===undefined || $scope.Street===undefined|| $scope.State===undefined  ||$scope.City===undefined || $scope.Zip===undefined ||$scope.SuiteNo===undefined||$scope.AptId===undefined){
               confirm("Value was left blank");
        }
else{
    apt.aptId=$scope.AptId;
    apt.addr={
        "num": $scope.aptNum,
        "street": $scope.Street,
        "state": $scope.State,
        "city": $scope.City,
        "zip": $scope.Zip,
        "suite": $scope.SuiteNo,
    };
    $scope.hide=true;
        console.log(apt);
        //myfact.addApartment(add);
    };}
        $scope.updateApt = function(){
 if($scope.chairs===undefined || $scope.beds===undefined){
               confirm("Value was left blank");
        }
    apt.rooms=[{
        "bedrooms": [{
            "room": {
                "number": 1,
                "chair": $scope.chairs,
                "bed": $scope.beds,
                "occupants": []
            }
        }, {
            "room": {
                "number": 2,
                "chair": $scope.chairs,
                "bed": $scope.beds,
                "occupants": []
            }
        }, {
            "room": {
                "number": 3,
                "chair": $scope.chairs,
                "bed": $scope.beds,
                "occupants": []
            }
        }, {
            "room": {
                "number": 4,
                "chair": $scope.chairs,
                "bed": $scope.beds,
                "occupants": []
            }
        }, {
            "room": {
                "number": 5,
                "chair": $scope.chairs,
                "bed": $scope.beds,
                "occupants": []
            }
        }, {
            "room": {
                "number": 6,
                "chair": $scope.chairs,
                "bed": $scope.beds,
                "occupants": []
            }
        }]
    }];
    $scope.hide=true;
    console.log(apt.rooms);
    if($scope.room_number!==undefined){
        if(apt.rooms[0].bedrooms[$scope.room_number-1].room.occupants[0]===undefined){
            apt.rooms[0].bedrooms[$scope.room_number-1].room.occupants[0]= $scope.UserName;
        }
       else if(apt.rooms[0].bedrooms[$scope.room_number-1].room.occupants[1]===undefined){
            apt.rooms[0].bedrooms[$scope.room_number-1].room.occupants[1]= $scope.UserName;
        }
else{
         confirm(apt.rooms[0].bedrooms[$scope.room_number-1].room.occupants[1]);
};

    }
        console.log(apt);
        myfact.addApartment(apt);
        };
    $scope.changeApt=function(){
        $scope.hidden=false;
        $scope.show=false;
    };
    $scope.editApt=function(){
        console.log($scope.username);
        console.log($scope.NewAptID);
        myfact.updateApartment($scope.NewAptID,$scope.username);
    }
});
Apartment.controller('apt_list_user',function($scope,myfact)
{
    var successFunction = function(data){
        $scope.data=data.data[1];
        console.log(data);
    };
    var errorFunction = function(err){
        $scope.data=err;
    };
    myfact.getAllApartments(successFunction,errorFunction);
});