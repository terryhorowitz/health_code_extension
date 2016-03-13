myApp.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/loading');
  
  $stateProvider
    .state('loading', {
      url: "/loading",
      controller: "PageController",
      templateUrl: "../../templates/loading.html"
    });
});