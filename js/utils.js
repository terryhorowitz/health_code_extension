myApp.factory('UtilsFactory', function ($http){
  var UtilsFactory = {};
  var dbGet = 'https://data.cityofnewyork.us/resource/xx67-kt59.json?';
  var token = { headers: { "X-App-Token": "jYAyZ2aqnFDAzQfLdfYWQ5DZW"} };
  
  UtilsFactory.changeDateFormat = function (array){
    array.forEach(function(e){
      e.grade_date = new Date(e.grade_date);
    });
  }
    
  UtilsFactory.checkCombinationOfTwo = function (param1, param2){
    if (!param1 || !param2) {};
    return $http.get(dbGet + param1 + '&' + param2, token);
  }
  
  UtilsFactory.promiseForYelpUrl = function () {
    return new Promise(function (resolve, reject) {
      chrome.tabs.query({'active': true, lastFocusedWindow: true},
      function (tabs) {
        //need to check first if url is for yelp!!!
        resolve(tabs[0].url)
      })
    });
  }
  
  UtilsFactory.retrieveFromDOM = function (detail, dom) {
    var returnVal;
    if (detail === "phone"){
      dom.querySelector('.biz-phone') ? returnVal = dom.querySelector('.biz-phone').innerText.replace(/[()-\s+]/g, "") : returnVal = '';
    } else {
      dom.querySelector('[itemprop=' + detail + ']') ? returnVal = dom.querySelector('[itemprop=' + detail + ']').innerText : returnVal = '';
    }
    
    return returnVal;
  }
  
  return UtilsFactory;
});