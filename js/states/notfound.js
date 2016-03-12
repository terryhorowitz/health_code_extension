myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('notfound', {
      url: "/notfound",
      templateUrl: "../../templates/notfound.html"
    })
});