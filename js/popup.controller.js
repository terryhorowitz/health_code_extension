
myApp.controller("PageController", function ($scope, DOHFactory, $state, $log) {
  
  $scope.details=false
  $scope.loading = true;
  
    getDOHInfo = function (searchParams) {
      DOHFactory.accessRecords(searchParams)
      .then(function(restaurantMatches){
        //filter for records where grade was given
        return restaurantMatches.filter(function(e){
          return e.grade;
        });
      })
      .then(function(restaurantMatches){
        $scope.loading = false;
        
        if (restaurantMatches.length === 0){
          $scope.noResultsFound = true;
          $state.go('not-found');
          
        } else {
          $scope.gradeDisplayed = true;
          $scope.record = restaurantMatches[0];
          
          var letterGrade = restaurantMatches[0].grade.toLowerCase();
          var myEl = angular.element(document.querySelector('#results'));
          myEl.append('<img id="result" src="/../images/' + letterGrade + '-grade.jpg">');
        }
      }).catch($log.error)
    }
    
    $scope.showHideDetails = function () {
      $scope.details === true ? $scope.details=false : $scope.details = true;
    }
    
    DOHFactory.getRestaurantDetails()
    .then(function(info){
      var queryStr = ['?zipcode=' + info[0], '&dba=' + info[1], '&building=' + info[2], '&phone=' + info[3]]
      $scope.findRestaurant = getDOHInfo(queryStr);
    }).catch($log.error);
    
});
