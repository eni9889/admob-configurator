function click(e) {
  if (e.target.id == 'reporting') {
    //chrome.tabs.update({ url: "https://console.developers.google.com/project" }, function(tab) {
    //  chrome.storage.local.set({ "reporting_tab_id" : tab.id });
    //});
    var newURL = 'https://apps.admob.com/#monetize';

    chrome.tabs.update({ url: newURL }, function(tab) {
      //setTimeout(function() {
        chrome.storage.local.set({ "reporting_tab_id" : tab.id });
        console.log('hm...');
        window.close();
        //alert('You will be redirected to your admob account for some time and then back...');
        //chrome.tabs.executeScript(tab.id, { file: "get_admob_account.js" });
      //}, 2000);
    });
  } else if (e.target.id == 'login') {
    var newURL = "https://www.appodeal.com/signin";
    chrome.tabs.update({ url: newURL });
    window.close();
  } else if (e.target.id == 'logout') {
    chrome.storage.local.clear();
    // clear badge
    chrome.browserAction.setBadgeText({text: ""});
    chrome.cookies.remove({"url": "http://www.appodeal.com", "name": "_android_ad_network_session"});
    chrome.cookies.remove({"url": "https://www.appodeal.com", "name": "_android_ad_network_session"});
    chrome.cookies.remove({"url": "http://www.appodeal.com", "name": "remember_token"});
    chrome.cookies.remove({"url": "https://www.appodeal.com", "name": "remember_token"});
    chrome.cookies.remove({"url": "http://www.appodeal.com", "name": "user_id"});
    chrome.cookies.remove({"url": "https://www.appodeal.com", "name": "user_id"});
    var newURL = "https://www.appodeal.com";
    chrome.tabs.update({ url: newURL });
    window.close();
  } else if (e.target.id == 'api') {
    var newURL = "http://www.appodeal.com/profile/api_integration";
    chrome.tabs.update({ url: newURL });
    window.close();
  } else if (e.target.id == 'admob') {
    var newURL = "https://apps.admob.com/#monetize";
    chrome.tabs.update({ url: newURL }, function(tab) {
      chrome.storage.local.set({ "admob_processing" : true }, function() {
        window.close();
      });
    });
  } else if (e.target.id == 'admob_account') {
    chrome.tabs.update({ url: "https://console.developers.google.com/project/melodic-nature-101323/apiui/credential" }, function(tab) {
      chrome.storage.local.set({ "reporting_tab_id" : tab.id });
      window.close();
    });
  } else if (e.target.id == 'admob_project_edit') {
    chrome.tabs.executeScript(null, {}, function() {
      chrome.tabs.executeScript(null, {file: 'admob_project_edit.js'}, function() {
        window.close();
      });
    });
  } else {
    window.close();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
  chrome.storage.local.get({'appodeal_email': null, 'appodeal_api_key': null, 'appodeal_user_id': null, 'appodeal_admob_account_id': null}, function(items) {
    var reporting_btn = document.getElementById('reporting');
    var api_btn = document.getElementById('api');
    var admob_btn = document.getElementById('admob');

    if (items['appodeal_api_key'] != null && items['appodeal_user_id'] != null) {
      api_btn.innerHTML = '<span>Done</span>API Key: ' + items['appodeal_api_key'] + ' (Refresh)';

      // Show steps 3 and 4 if step 2 is complete
      reporting_btn.style.display = "block";
      admob_btn.style.display = "block";
    } else {
      // reporting_btn.onclick = function() { alert("Please complete Step 2 first."); return false; }
      // admob_btn.onclick = function() { alert("Please complete Step 2 first."); return false; }
    }

    if (items['appodeal_email'] != null) {
      var loginElement = document.getElementById("login");
      loginElement.id = 'logout';
      loginElement.innerHTML = '<span>Done</span>' + items['appodeal_email'] + " (Logout)";
      // Show step 2 if step 1 is complete
      api_btn.style.display = "block";

      if (items['appodeal_admob_account_id'] != null) {
        var reportingElement = document.getElementById("reporting");
        // reportingElement.parentNode.removeChild(reportingElement);
        reportingElement.innerHTML = '<span>Done</span>' + reportingElement.innerHTML;
      }
    } else {
      api_btn.onclick = function(){return false}
    }
  })
});
