myApp.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/load-grade');
  
  $stateProvider
    .state('load-grade', {
      url: "/load-grade",
      controller: "PageController",
      templateUrl: "../../templates/loading_grade.html"
    })
});