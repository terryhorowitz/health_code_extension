
myApp.controller("LoadingController", function (DOHFactory, $state, $rootScope) {
    DOHFactory.getRestaurantDetails()
    .then(function(restaurantMatches){
      if (!restaurantMatches.length){
        $state.go('notfound');
      } else {
        $state.go('grade');
      }
    });
  
});