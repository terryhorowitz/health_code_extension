myApp.config(function($stateProvider) {
  $stateProvider
    .state('help', {
      url: "/help",
      template: '<div>' +
                  '<img class="help" src="/../images/not-found.png">' +
                  '<div id="answer">' +
                    '<div class="item">Possible Reasons for Error:</div><br/>' +
                    '<div class="detail">-This chrome extension only works with YELP restaurant searches</div><br/>' +
                    '<div class="detail">-You may not be looking at a restaurant</div><br/>' +
                    '<div class="detail">-This restaurant has not yet recieved a grade</div><br/>' +
                    '<div class="detail">-Our search criteria does not match Dept. Of Health records</div><br/>' +
                  '<div>' +
                '</div>'
    })
});