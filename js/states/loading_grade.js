myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/load");
  
  $stateProvider
    .state('load', {
      url: "/load",
      controller: "LoadingController"
      templateUrl: "../../templates/loading_grade.html"
    })
});