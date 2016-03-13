
myApp.controller("PageController", function ($scope, DOHFactory, $state) {

  $scope.loading = true;
  
  DOHFactory.getRestaurantDetails()
  .then(function(info){
    var queryStr = ['zipcode=' + info[0], 'dba=' + info[1], 'building=' + info[2], 'phone=' + info[3]]
    $scope.findRestaurant = getDOHInfo(queryStr);
  });

  getDOHInfo = function (searchParams) {
    DOHFactory.accessRecords(searchParams)
    .then(function(restaurantMatches){
      if (!restaurantMatches.length){
        $state.go('notfound');
      } else $state.go('load-grade')
    })

  }
    
});
