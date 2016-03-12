myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('details', {
      url: "/details",
      controller: "PageController",
      templateUrl: "../../templates/details.html"
    })
});