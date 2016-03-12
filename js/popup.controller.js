
myApp.controller("PageController", function ($scope, DOHFactory) {
  var resultPage = angular.element(document.querySelector('#results'));
  $scope.loading = true;
  
  getDOHInfo = function (searchParams) {
    DOHFactory.accessRecords(searchParams)
    .then(function(restaurantMatches){
      //filter for records where grade was given
      if (!restaurantMatches.length) return notFound();
      return restaurantMatches.filter(function(e){
        return e.grade;
      });
    })
    .then(function(restaurantMatches){
      $scope.loading = false;

      $scope.gradeDisplayed = true;
      $scope.record = restaurantMatches[0];
      $scope.date = new Date(restaurantMatches[0].inspection_date)

      var letterGrade = restaurantMatches[0].grade.toLowerCase();
      
      resultPage.append('<img id="result" src="/../images/' + letterGrade + '-grade.jpg">');
    });
  }

  function notFound () {
    $scope.loading = false;
    $scope.notFound = true;
  }

  $scope.showDetails = function () {
    $scope.details = true;
  }

  DOHFactory.getRestaurantDetails()
  .then(function(info){
    var queryStr = ['zipcode=' + info[0], 'dba=' + info[1], 'building=' + info[2], 'phone=' + info[3]]
    $scope.findRestaurant = getDOHInfo(queryStr);
  });

    
});
