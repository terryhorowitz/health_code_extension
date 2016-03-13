myApp.config(function($stateProvider) {
  $stateProvider
    .state('notfound', {
      url: "/notfound",
      template: '<div id="not-found">' +
                  '<img src="/../images/not-found.png">' +
                  '<div>restaurant information not found!</div>' +
                '</div>'
    });
});