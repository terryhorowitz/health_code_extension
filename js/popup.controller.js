
myApp.controller("PageController", function ($scope, DOHFactory, $state) {

  $scope.loading = true;

//  var getDOHInfo = function (searchParams) {
//    DOHFactory.accessRecords(searchParams)
    DOHFactory.getRestaurantDetails()
    .then(function(restaurantMatches){
      if (!restaurantMatches.length){
        $state.go('notfound');
      } else $state.go('grade');
    });
//  }
    
//  DOHFactory.getRestaurantDetails()
//  .then(function(details){
//    details.postalCode = 'zipcode=' + details.postalCode;
//    details.name = 'dba=' + details.name;
//    details.buildingNum = 'building=' + details.buildingNum;
//    details.phone = 'phone=' + details.phone;
//    
//    $scope.findRestaurant = getDOHInfo(details);
//  });
  
});