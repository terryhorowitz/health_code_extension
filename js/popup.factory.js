myApp.factory('DOHFactory', function ($http, UtilsFactory){
  var DOHFactory = {};
  
  var cache = [];
  var r = new Range();
  var dbGet = 'https://data.cityofnewyork.us/resource/xx67-kt59.json?';
  var token = { headers: { "X-App-Token": "jYAyZ2aqnFDAzQfLdfYWQ5DZW"} };
  var queryStr;

  DOHFactory.getCache = function () {
    return cache;
  }

  //try all combinations for search query. 
  //Results can be hard to match with DOH database-
  var accessRecords = function(query){
    //first check if there is a match with all retrieved data
    queryStr = dbGet + query.zip + '&' + query.name + '&' + query.buildingNum + '&' + query.phone ;
    return $http.get(queryStr, token)
    .then(function(records){
      if (!records.data.length) {
        queryStr = dbGet + query.zip + '&' + query.name + '&' + query.phone;
        return $http.get(queryStr, token)
      }
        else return records;
    })
    .then(function(records){
      if (!records.data.length) {
        queryStr = dbGet + query.zip + '&' + query.name + '&' + query.buildingNum;
        return $http.get(queryStr, token)
      }
        else return records;
    })
    .then(function(records){
      if (!records.data.length) {
        queryStr = dbGet + query.name + '&' + query.buildingNum + '&' + query.phone;
        return $http.get(queryStr, token)
      }
        else return records;
    })
    //combinations of two checked in order of likelihood of returning a correct match
    .then(function(records){
      if (!records.data.length){
        return UtilsFactory.checkCombinationOfTwo(query.zip, query.name);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return UtilsFactory.checkCombinationOfTwo(query.name, query.phone);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return UtilsFactory.checkCombinationOfTwo(query.name, query.buildingNum);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return UtilsFactory.checkCombinationOfTwo(query.phone, query.zip);
      } else return records;
    })
    .then(function(records){
      if (!records.data.length){
        return UtilsFactory.checkCombinationOfTwo(query.phone, query.buildingNum);
      } else return records;
    })
    .then(function(records){
      matches = records.data.filter(function(e){
        return e.grade;
      });
      
      UtilsFactory.changeDateFormat(matches);
      cache = angular.copy(matches);
      return cache;
    });
  }
      
  DOHFactory.getRestaurantDetails = function(){
    
    return UtilsFactory.promiseForYelpUrl()
    .then(function (url){
      return $http.get(url)
    })
    .then(function(dom){
      var apostrophes = new RegExp("[\'" + String.fromCharCode(8217) + "]", "g");
      
      dom = r.createContextualFragment(dom.data);
      var yelpDetails = {
        zip: UtilsFactory.getRestaurantZip(dom),
        name: UtilsFactory.getRestaurantName(dom),
        buildingNum: UtilsFactory.getRestaurantBuilding(dom),
        phone: UtilsFactory.getRestaurantPhone(dom)
      }
      if (!UtilsFactory.checkForData(yelpDetails)) return [];
      return accessRecords(yelpDetails);
    });
  }

  return DOHFactory
});