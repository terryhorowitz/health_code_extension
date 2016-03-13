myApp.factory('DOHFactory', function ($http, UtilsFactory){
  var DOHFactory = {};
  
  var resultCache = [];
  var r = new Range();
  var dbGet = 'https://data.cityofnewyork.us/resource/xx67-kt59.json?';
  var token = { headers: { "X-App-Token": "jYAyZ2aqnFDAzQfLdfYWQ5DZW"} };
  var queryStr, phone, zip, name, buildingNum;

  
  //try all combinations for search query. 
  //Results can be hard to match with DOH database-
  DOHFactory.accessRecords = function(query){
    //first check if there is a match with all retrieved data
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
        return checkCombinationOfTwo(query, 0,1);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(query, 1,3);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(query, 1,2);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(query, 2,3);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return checkCombinationOfTwo(query, 0,3);
      } else return records;
    })
    .then(function(records){
      matches = records.data.filter(function(e){
        return e.grade;
      });
      changeDateFormat(matches);
      resultCache = angular.copy(matches);
      return matches;
    });
  }
      
  DOHFactory.getRestaurantDetails = function(){
    
    return UtilsFactory.promiseForTabUrl()
    .then(function (url){
      return $http.get(url)
    })
    .then(function(dom){
      var apostrophes = new RegExp("[\'" + String.fromCharCode(8217) + "]", "g");
      
      dom = r.createContextualFragment(dom.data);
      //Yelp pages occassionally are missing restaurant information-
      //check if each exists
      
      //restuarant zip
//      dom.querySelector('[itemprop=postalCode]') ? zip = dom.querySelector('[itemprop=postalCode]').innerText : zip = null;
      //restuarant name
//      dom.querySelector('.biz-page-title') ? name = dom.querySelector('.biz-page-title').innerText.trim().replace(/\s+/g, '%20').replace( apostrophes, '%27') : name = null;
      //restuarant building number
//      dom.querySelector('[itemprop=streetAddress]') ? buildingNum = dom.querySelector('[itemprop=streetAddress]').innerText.match(/\d+/g) : buildingNum = [null];
      //restuarant phone number
//      dom.querySelector('.biz-phone') ? phone = dom.querySelector('.biz-phone').innerText.replace(/[()-\s+]/g, "") : phone = null;
      return {
        postalCode: UtilsFactory.retrieveFromDOM('postalCode', dom),
        name: UtilsFactory.retrieveFromDOM('dba', dom).trim().replace(/\s+/g, '%20').replace(apostrophes, '%27'),
        buildingNum: UtilsFactory.retrieveFromDOM('streetAddress', dom).match(/\d+/g)[0],
        phone: UtilsFactory.retrieveFromDOM('phone', dom).replace(/[()-\s+]/g, "")
      }
    })
  }
  
  DOHFactory.getCache = function () {
    return resultCache;
  }

  return DOHFactory
});