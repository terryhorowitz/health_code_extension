myApp.factory('UtilsFactory', function ($http, $q){
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
    return $q(function (resolve, reject) {
      chrome.tabs.query({'active': true, lastFocusedWindow: true},
      function (tabs) {
        resolve(tabs[0].url)
      })
    });
  }
  
  UtilsFactory.getRestaurantPhone = function (dom){
    var value;
    
    dom.querySelector('.biz-phone') ? value = 'phone=' + dom.querySelector('.biz-phone').innerText.replace(/[()-\s+]/g, "") : value = '';
    
    return value;
  }
  
  UtilsFactory.getRestaurantZip = function (dom){
    var value;
    
    dom.querySelector('[itemprop=postalCode]') ? value = 'zipcode=' + dom.querySelector('[itemprop=postalCode]').innerText : value = '';
    
    return value;
  }
  
  UtilsFactory.getRestaurantName = function (dom){
    var value;
    var apostrophes = new RegExp("[\'" + String.fromCharCode(8217) + "]", "g");
    
    dom.querySelector('.biz-page-title') ? value = 'dba=' + dom.querySelector('.biz-page-title').innerText.trim().replace(/\s+/g, '%20').replace(apostrophes, '%27') : value = '';
    
    return value;
  }
  
  UtilsFactory.getRestaurantBuilding = function (dom){
    var value; 
    
    dom.querySelector('[itemprop=streetAddress]') ? value = 'building=' + dom.querySelector('.biz-phone').innerText.replace(/[()-\s+]/g, "")[0] : value = '';
    
    return value;
  }
  
  return UtilsFactory;
});