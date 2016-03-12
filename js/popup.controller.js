
myApp.controller("PageController", function ($scope, DOHFactory, $state) {
  var resultPage = angular.element(document.querySelector('#results'));
  
  $scope.loading = true;
  //retrieve data
  DOHFactory.getRestaurantDetails()
  .then(function(info){
    var queryStr = ['zipcode=' + info[0], 'dba=' + info[1], 'building=' + info[2], 'phone=' + info[3]]
    $scope.findRestaurant = getDOHInfo(queryStr);
  });
  
  getDOHInfo = function (searchParams) {
    DOHFactory.accessRecords(searchParams)
    .then(function(restaurantMatches){
      //filter for records where grade was given
      if (!restaurantMatches.length){
        $state.go('notfound');
        return [];
      }
      return restaurantMatches.filter(function(e){
        return e.grade;
      });
    })
    .then(function(restaurantMatches){
      changeDateFormat(restaurantMatches);
      $scope.allRecords = restaurantMatches;
      $scope.loading=false;

      $scope.gradeDisplayed = true;

      var letterGrade = restaurantMatches[0].grade.toLowerCase();
      
      resultPage.append('<img id="result" src="/../images/' + letterGrade + '-grade.jpg">');
    });
  }

  function changeDateFormat(array){
    array.forEach(function(e){
      e.grade_date = new Date(e.grade_date);
    })
  }
    
});
