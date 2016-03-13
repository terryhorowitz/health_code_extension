myApp.config(function($stateProvider) {
  $stateProvider
    .state('history-details', {
      url: "/history-details",
      params: {
        pastRecord: null
      },
      controller: function ($scope, $stateParams) {
        $scope.record = $stateParams.pastRecord;;
      },
      templateUrl: "../../templates/details.html"
    });
});