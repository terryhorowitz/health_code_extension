myApp.config(function($stateProvider) {
  $stateProvider
    .state('details', {
      url: "/details",
      controller: function (DOHFactory, $scope, $stateParams) {
        $scope.record = DOHFactory.getCache()[0];
      },
      templateUrl: "../../templates/details.html"
    })
});