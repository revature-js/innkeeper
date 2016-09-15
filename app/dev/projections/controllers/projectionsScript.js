var app = angular.module('test', []);
app.controller('projectionCtrl',
	function($scope, batchfactory,apartmentFactory){
		
		//works
		apartmentFactory.gettApartments("tApartments",function(totalOfApartments){
			$scope.totalOfApartments = totalOfApartments.data.tApartments;
		},function(err){
			$scope.totalOfApartments = err;
		});
		apartmentFactory.gettApartments("tRooms",function(totalOfRooms){
			$scope.totalOfRooms = totalOfRooms.data.tRooms;
		},function(err){
			$scope.totalOfRooms = err;
		});

		apartmentFactory.gettApartments("fTraines",function(fullTraines){
			$scope.fullTraines = fullTraines.data.fTraines;
		},function(err){
			$scope.totalOfRooms = err;
		});

		apartmentFactory.gettApartments("roomsUsed",function(roomsInUse){
			$scope.roomsInUse = roomsInUse.data.roomsUsed;
		},function(err){
			$scope.roomsInUse = err;
		});

		apartmentFactory.gettApartments("currentTraines",function(plannedTraines){
			$scope.plannedTraines = plannedTraines.data.currentTraines;
		},function(err){
			$scope.currentTraines = err;
		});

		/*
		apartmentFactory.gettRooms("tRooms",function(totalOfRooms){
			$scope.totalOfRooms = totalOfRooms.data.tRooms;
		},function(err){
			$scope.totalOfRooms = err;
		});

		apartmentFactory.getfTraines("fTraines",function(fullTraines){
			$scope.fullTraines = fullTraines.data.fTraines;
		},function(err){
			$scope.fullTraines = err;
		});
		
		apartmentFactory.getroomsUsed("roomsUsed",function(roomsInUse){
			$scope.roomsInUse = roomsInUse.data.roomsUsed;
		},function(err){
			$scope.roomsInUse = err;
		});
		
		apartmentFactory.getcurrentTraines("plannedTraines",function(currentTraines){
			$scope.currentTraines =currentTraines.data.plannedTraines;
		},function(err){
			$scope.currentTraines = err;
		});
		

	batchfactory.
*/
		$scope.batchlist = [];
		batchfactory.getbatch("name",function(bName){
			$scope.bName=bName.data.name;
		},function(err){
			$scope.name= err;
		});

		batchfactory.getbatch("currentsize",function(currentSize){
			$scope.currentSize=currentSize.data.currentsize;
		},function(err){
			$scope.currentsize= err;
		});

		batchfactory.getbatch("startdate",function(startDate){
			$scope.startDate=startDate.data.startdate;
		},function(err){
			$scope.batch= err;
		});
		$scope.batch = [$scope.bName, $scope.currentSize, $scope.startDate];
		$scope.batchlist.push($scope.batch);







		$scope.batchlist = [];
		$scope.showMe = false;
		$scope.magic = true;


		$scope.numOfBatch = function(){
			return $scope.batchlist.length;
		};
		$scope.calculateNumOfTraines=function(){
			$scope.people = 0;
				 for(i = 0; i < $scope.batchlist.length; i++){
				$scope.people+= $scope.batchlist[i].currentsize;
			}
			return $scope.people;
		};
		$scope.getTraineDifference=function(){
			return  $scope.fullTraines - $scope.plannedTraines; 
		};
		$scope.calculateOpenApart=function(){
			$scope.emptyRooms = $scope.totalOfRooms - $scope.roomsInUse;
			$scope.openApart = $scope.emptyRooms / 4;
			return Math.ceil($scope.openApart);

		};

		$scope.calculateApartNeed=function(){
			$scope.potentialNeed = $scope.plannedTraines / 8;
			
			if(Math.ceil($scope.potentialNeed) < $scope.openApart){
				return 0;
			}
			else{
				return Math.ceil($scope.potentialNeed) + $scope.totalOfApartments;
			}

		};

		$scope.getAvailableSeats=function(){
			var totalCount = 0;
			for(i = 0; i< $scope.batchlist.length; i++){
				totalCount +=  $scope.batch[i].currentsize;
			}
			$scope.totalUnfilledSeats = $scope.batchlist.length * 25;
			return $scope.totalUnfilledSeats - totalCount;

		};

		$scope.getFilledBatch = function(){
			var count = 0;
			for(i = 0; i < $scope.batchlist.length; i++){
				if($scope.batchlist[i].currentsize === 25){
					count + 1;
				}
			}
			$scope.filledBatch = count;
			return $scope.filledBatch;
		};
		$scope.displayStats=function(){
			 $scope.showMe = true;
			 $scope.magic =false;
		};
	});

