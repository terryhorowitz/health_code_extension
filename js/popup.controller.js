
myApp.controller("PageController", function (DOHFactory, $state) {
  
//  var getDOHInfo = function (searchParams) {
//    DOHFactory.accessRecords(searchParams)
    DOHFactory.getRestaurantDetails()
    .then(function(restaurantMatches){
      console.log('here', restaurantMatches)
      if (!restaurantMatches.length){
        $state.go('notfound');
      } else {
        console.log('hello')
        debugger;
        $state.go('notfound');
      }
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