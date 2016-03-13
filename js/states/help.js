myApp.config(function($stateProvider) {
  $stateProvider
    .state('help', {
      url: "/help",
      template: '<div>' +
                  '<img class="help" src="/../images/not-found.png"><br/>' +
                  '<div id="answer">' +
                    '<div class="item">Possible Reasons for Error:</div><br/>' +
                    '<div class="detail">-Are you sure you\'re looking at a restaurant?</div><br/>' +
                    '<div class="detail">-This restaurant has not yet recieved a grade</div><br/>' +
                    '<div class="detail">-Search criteria does not match Dept. Of Health records</div><br/>' +
                  '<div>' +
                '</div>'
    })
});