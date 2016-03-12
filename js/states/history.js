myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('history', {
      url: "/history",
      controller: "PageController",
      templateUrl: "../../templates/history.html"
    })
});