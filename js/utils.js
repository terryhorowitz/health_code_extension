myApp.factory('UtilsFactory', function (){
  var UtilsFactory = {};
  
  UtilsFactory.changeDateFormat = function (array){
    array.forEach(function(e){
      e.grade_date = new Date(e.grade_date);
    });
  }
    
  UtilsFactory.checkCombinationOfTwo = function (data, param1, param2){
    if (!data[param1] || !data[param2]) {};
    return $http.get(dbGet + data[param1] + '&' + data[param2], token);
  }
  
  UtilsFactory.promiseForTabUrl = function () {
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