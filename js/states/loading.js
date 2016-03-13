myApp.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/loading');
  
  $stateProvider
    .state('loading', {
      url: "/loading",
      controller: "LoadingController",
      templateUrl: "../../templates/loading.html"
    });
});