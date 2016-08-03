/* global document:false, appUrl:false, ajaxFunctions:false */

'use strict';

(function () {
  var username = document.querySelector('#username');
  var apiUrl = appUrl + '/api/me';

  var authDetailedStyle = document.createElement('style');

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
    document.body.appendChild(authDetailedStyle);
    var userObject = JSON.parse(data);

    if (!userObject) {
      return;
    }

    authDetailedStyle.sheet.insertRule('.auth-hidden {display: none;}', 0);
    authDetailedStyle.sheet.insertRule('.auth-shown {display: unset;}', 0);
    authDetailedStyle.sheet.insertRule('header a ~ p[hidden].auth-shown {margin:0;padding:0;display:inline;color:#ECEFF1;}', 0);

    if (username) {
      username.innerText = userObject.username;
    }
  }));
})();
