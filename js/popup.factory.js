myApp.factory('DOHFactory', function ($http){
  var DOHFactory = {};
  var r = new Range();
  var queryStr, code, phone, zip, name, buildingNum;
  
  //try three different combinations for search query because 
  //results can be hard to match with DOH database
  DOHFactory.accessRecords = function (query) {
    queryStr = 'https://data.cityofnewyork.us/resource/xx67-kt59.json' + query[0] + query[1];
    return $http.get(queryStr, { headers: { "X-App-Token": "jYAyZ2aqnFDAzQfLdfYWQ5DZW"} })
    .then(function(res){
      if (res.data.length === 0){
        queryStr = 'https://data.cityofnewyork.us/resource/xx67-kt59.json' + query[0] + query[2];
        return $http.get(queryStr, { headers: { "X-App-Token": "jYAyZ2aqnFDAzQfLdfYWQ5DZW"} })
      } else return res
    })
    .then(function(res){
      if (res.data.length === 0 && query[3]){
        queryStr = 'https://data.cityofnewyork.us/resource/xx67-kt59.json' + query[0] + query[3];
        return $http.get(queryStr, { headers: { "X-App-Token": "jYAyZ2aqnFDAzQfLdfYWQ5DZW"} })
      } else return res;
    })
    .then(function(res){
      return res.data;
    })
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
      code = new RegExp("[\'" + String.fromCharCode(8217) + "]", "g");
      dom = r.createContextualFragment(dom.data);
      zip = dom.querySelector('[itemprop=postalCode]').innerText;
      name = dom.querySelector('.biz-page-title').innerText.trim().replace(/\s+/g, '%20').replace( code, '%27');
      buildingNum = dom.querySelector('[itemprop=streetAddress]').innerText.match(/\d+/g);
      
      //not all pages display a phone number, must first check if
      //number is available off of the HTML before assigning the 
      //variable
      dom.querySelector('.biz-phone') ? phone = dom.querySelector('.biz-phone').innerText.replace(/[()-\s+]/g, "") : phone = null;
      
      return [zip, name, Number(buildingNum[0]), phone]
    })
  }

  return DOHFactory
});