
/*app.controller('apt_list_user', function($scope, myserv) {
     $scope.apt=myserv.func();
});*/
var Apartment = angular.module('ApartmentApp');
Apartment.controller('apt_list_admin', function($scope, $window, seshkeys, myfact) {
    var apt = {};
    var usr = {};
    var apt2={};
    var id;
    $scope.hide = false;//Used for ng-shows and hides in html
    $scope.show = false;
    $scope.hidden = true;
    $scope.sheath = false;
    $scope.Apartmenthide=true;
    $scope.Userhide=true;
    $scope.Lookuphide=true;
    $scope.dynamic=true;
    var list = [];
    var newUser = [];
    myfact.getUser()//finds all users in our database
        .then(
            function(data) {
                usr = data.data;
            }
        );
    myfact.getAllApartments()//finds all apartment in database
        .then(
            function(data) {
                apt = data.data;
            });
    $scope.trigger = function() {
            myfact.getUser()
        .then(
            function(data) {
                usr = data.data;
            }
        );
        myfact.getAllApartments()
        .then(
            function(data) {
                apt = data.data;
            });
         $scope.newUser=[];
         $scope.aptList=[];
         for (x in apt) {
                $scope.aptList.push(apt[x].addr)
        }
        for (x in usr) {
            if (usr[x].aptId === null||usr[x].aptId === "null") {
                $scope.newUser.push(usr[x].username)
            }
        };
        $scope.sheath = true;
    };
    $scope.search = function() {
            myfact.getUser()
        .then(
            function(data) {
                usr = data.data;
            }
        );
        for (x in usr) {
            if (usr[x].username === $scope.username) {
                id = usr[x].aptId;
                break;
            }
        };
        for (x in apt) {
            if (apt[x]._id === id) {
                $scope.data = apt[x];
                $scope.show = true;
            }
        }
    };
    var x = false;
    $scope.dosomething = function(event, username) {
        if (event.which === 13) {
            $scope.search(username);
        }
    };
    $scope.anotherApt = function() {
        if ($scope.aptNum === undefined || $scope.Street === undefined || $scope.State === undefined || $scope.City === undefined || $scope.Zip === undefined || $scope.SuiteNo === undefined) {
            confirm("Value was left blank");
        } else {
            for(a in apt){
                if (($scope.aptNum === apt[a].addr.num) && ($scope.Street === apt[a].addr.street) && ($scope.City === apt[a].addr.city) &&( $scope.Zip === apt[a].addr.zip ) && ($scope.SuiteNo === apt[a].addr.suite)){
                    confirm('apartment taken');
                    break;
                }
                else{
                apt2.addr = {
                "num": $scope.aptNum,
                "street": $scope.Street,
                "state": $scope.State,
                "city": $scope.City,
                "zip": $scope.Zip,
                "suite": $scope.SuiteNo
            };
            $scope.hide = true;
            break;
                }
            }
        };
    }
    $scope.updateApt = function() {
        if ($scope.chairs === undefined || $scope.beds === undefined) {
            confirm("Value was left blank");
        }
        apt2.rooms = [{
            "bedrooms": [{
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }]
        }];
        console.log(apt2);
        myfact.addApartment(apt2);
         $scope.aptNum="";
        $scope.Street="";
         $scope.State="";
        $scope.City="";
        $scope.Zip="";
        $scope.SuiteNo="";
        $scope.hide = false;
    };
    $scope.changeApt = function() {
        $scope.hidden = false;
        $scope.show = false;
    };
    $scope.editApt = function() {
        myfact.updateUser($scope.username, $scope.NewAptID);
    };
    $scope.assign = function(username) {
       /* var AptID = prompt('Please input new apartment ID');*/
        /*myfact.updateUser(username, AptID);*/
/*        names.splice(index, 1);*/
       $scope.usernames=username;
        $scope.dynamic=false;
    };
    $scope.assign2 = function() {
        myfact.updateUser($scope.username, null);
        $window.sessionStorage.setItem(seshkeys.aptid,null);
        myfact.getUser()
            .then(
                function(data) {
                    usr = data.data;
                }
            );
        $scope.username="";
        $scope.data="";
        $scope.NewAptID="";
        $scope.hidden=true;
        $scope.trigger();
    };
    $scope.assign3=function(index){
        myfact.updateUser($scope.usernames, apt[index]._id);
        confirm('This user has now been assigned an apartment');
         $scope.dynamic=true;
         $scope.sheath=false;
        };
    $scope.iDGen = function() {
        $scope.AptId = $scope.aptNum;
    };
    $scope.Lookup=function(){
            $scope.Apartmenthide=true;
            $scope.Userhide=true;
            $scope.Lookuphide=false;
            $scope.sheath=false;
            $scope.newUser=[];
            $scope.dynamic=true;
    };
    $scope.New=function(){
        $scope.Apartmenthide=false;
            $scope.Userhide=true;
            $scope.Lookuphide=true;
            $scope.sheath=false;
            $scope.newUser=[];
            $scope.dynamic=true;
    };
    $scope.Vacant=function(){
        $scope.Apartmenthide=true;
            $scope.Userhide=false;
            $scope.Lookuphide=true;
            $scope.sheath=false;
            $scope.newUser=[];
    };
}
    );
Apartment.controller('apt_list_user', function($scope, $window, seshkeys, myfact) {
    var usr = {};
    var apt = {};
    var id;
    $scope.data = {};
    var getAllUsers = function() {
        myfact.getAllApartments()
            .then(
                function(data) {
                    apt = data.data;
                    display();
                },
                function(err) {
                    console.log(err);
                }
            );

    };
    var display = function() {
        for (x in apt) {
            if (apt[x]._id === $window.sessionStorage.getItem(seshkeys.aptid)) {
                $scope.data = apt[x];
                console.log($scope.data);
            }
        };
        console.log($scope.data);
    if($window.sessionStorage.getItem(seshkeys.aptid)===null){
        $scope.userhide=true;
    }
    else{
         $scope.userhide=false;
    };
};
    getAllUsers();


});
