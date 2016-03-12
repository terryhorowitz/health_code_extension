myApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('load', {
      url: "/load",
      controller: "PageController",
      templateUrl: "../../templates/loading_grade.html"
    })
});