myApp.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/loading');
  
  $stateProvider
    .state('loading', {
      url: "/loading",
      controller: function (DOHFactory, $state, $rootScope){
        DOHFactory.getRestaurantDetails()
        .then(function(restaurantMatches){
          if (!restaurantMatches.length){
            $state.go('notfound');
          } else {
            $state.go('grade');
          }
        });
      },
      templateUrl: "../../templates/loading.html"
    });
});