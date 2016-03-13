myApp.config(function($stateProvider) {
  $stateProvider
    .state('history', {
      url: "/history",
      controller: function(DOHFactory, $scope){
        $scope.records = DOHFactory.getCache();
      },
      templateUrl: "../../templates/history.html"
    })
});