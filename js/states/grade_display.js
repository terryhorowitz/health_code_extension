myApp.config(function($stateProvider) {
  
  $stateProvider
    .state('grade', {
      url: "/grade",
      controller: function(DOHFactory, $scope, $state){
        var details = DOHFactory.getCache();
        var resultPage = angular.element(document.querySelector('#results'));
        var letterGrade = details[0].grade.toLowerCase();
        if (letterGrade== 'z') $state.go('notfound');
        resultPage.append('<img id="result" src="/../images/' + letterGrade + '-grade.jpg">');
      },
      template: '<div id="results" ui-sref="details"></div>'
    });
  
});