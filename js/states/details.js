myApp.config(function($stateProvider) {
  $stateProvider
    .state('details', {
      url: "/details",
      controller: function (DOHFactory, $scope) {
        $scope.records = DOHFactory.getCache()
      },
      templateUrl: "../../templates/details.html"
    })
});