myApp.factory('DOHFactory', function ($http){
  var DOHFactory = {};
  var r = new Range();
  var dbGet = 'https://data.cityofnewyork.us/resource/xx67-kt59.json?';
  var token = { headers: { "X-App-Token": "jYAyZ2aqnFDAzQfLdfYWQ5DZW"} };
  var queryStr, apostrophe, phone, zip, name, buildingNum;
  
  //try all combinations for search query. 
  //Results can be hard to match with DOH database-
  DOHFactory.accessRecords = function(query){
    //first check if there is a match with all data
    queryStr = dbGet + query.join('&');
    return $http.get(queryStr, token)
    .then(function(records){
      if (!records.data.length) {
        queryStr = dbGet + query[0] + '&' + query[1] + '&' + query[2];
        return $http.get(queryStr, token)
      }
        else return records;
    })
    .then(function(records){
      if (!records.data.length) {
        queryStr = dbGet + query[0] + '&' + query[1] + '&' + query[3];
        return $http.get(queryStr, token)
      }
        else return records;
    })
    .then(function(records){
      if (!records.data.length) {
        queryStr = dbGet + query[1] + '&' + query[2] + '&' + query[3];
        return $http.get(queryStr, token)
      }
        else return records;
    })
    //combinations of two checked in order of likelihood of returning a correct match
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(0,1);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(1,3);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(1,2);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(2,3);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(0,3);
      } else return records;
    })
    .then(function(records){
      return records.data;
    });
  }
  
  function checkCombinationOfTwo (param1, param2){
    return $http.get(dbGet + query[param1] + '&' + query[param2], token);
  }
  
  var promiseForTabUrl = function () {
    return new Promise(function (resolve, reject) {
      chrome.tabs.query({'active': true, lastFocusedWindow: true},
      function (tabs) {
        //need to check first if url is for yelp!!!
        resolve(tabs[0].url)
      })
    });
  }
      
  DOHFactory.getRestaurantDetails = function(){
    
    return promiseForTabUrl()
    .then(function (url){
      return $http.get(url)
    })
    .then(function(dom){
      //specific 
      apostrophe = new RegExp("[\'" + String.fromCharCode(8217) + "]", "g");
      dom = r.createContextualFragment(dom.data);
      //Yelp pages occassionally are missing restaurant information-
      //check if each exists
      
      //restuarant zip
      dom.querySelector('[itemprop=postalCode]') ? zip = dom.querySelector('[itemprop=postalCode]').innerText : zip = null;
      //restuarant name
      dom.querySelector('.biz-page-title') ? name = dom.querySelector('.biz-page-title').innerText.trim().replace(/\s+/g, '%20').replace( apostrophe, '%27') : name = null;
      //restuarant building number
      dom.querySelector('[itemprop=streetAddress]') ? buildingNum = dom.querySelector('[itemprop=streetAddress]').innerText.match(/\d+/g) : buildingNum = null;
      //restuarant phone number
      dom.querySelector('.biz-phone') ? phone = dom.querySelector('.biz-phone').innerText.replace(/[()-\s+]/g, "") : phone = null;
      
      return [zip, name, Number(buildingNum[0]), phone]
    })
  }

  return DOHFactory
});