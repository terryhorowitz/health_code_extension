myApp.config(function($stateProvider) {
  
  $stateProvider
    .state('grade', {
      url: "/grade",
      controller: function(DOHFactory, $scope){
        var details = DOHFactory.getCache();
        var resultPage = angular.element(document.querySelector('#results'));
        $scope.letterGrade = details[0].grade.toLowerCase();
//        resultPage.append('<img id="result" src="/../images/' + letterGrade + '-grade.jpg">');
      },
      template: '<div id="results" ui-sref="details"></div><img id="result" src="/../images/{{letterGrade}}-grade.jpg">'
    });
});