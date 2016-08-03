/* global document:false, appUrl:false, ajaxFunctions:false, Masonry:false */

'use strict';

(function () {
  var imageWall = document.querySelector('#image-wall');
  var msnry = new Masonry(imageWall, {
    itemSelector: '.image',
    columnWidth: 200
  });
  var apiUrl = appUrl + '/api/images' + document.location.pathname.replace(/\/$/, '');

  function buildImage(image) {
    var result = document.createElement('div');
    result.className = 'image';

    var img = document.createElement('img');
    img.src = image.url;
    img.addEventListener('load', function () {
      msnry.layout();
    });
    img.addEventListener('error', function () {
      this.src = 'https://placehold.it/300?text=BROKEN';
    });

    var credit = document.createElement('a');
    credit.href = '/users/' + image.owner._id;
    credit.innerText = '@' + image.owner.username;

    result.appendChild(img);
    result.appendChild(document.createElement('br'));
    result.appendChild(credit);

    if (document.location.pathname === '/my') {
      var del = document.createElement('button');
      del.className = 'delete';
      del.innerText = 'X';
      del.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('DELETE', appUrl + '/api/images/' + image._id, function () {
          document.location.reload();
        });
      });
      result.appendChild(del);
    }

    return result;
  }

  ajaxFunctions.ready(function () {
    ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var images = JSON.parse(data);

      images.forEach(function (img) {
        var el = buildImage(img);
        imageWall.appendChild(el);
        msnry.appended(el);
      });

      msnry.layout();
    });
  });
})();
