var locations = [];
$(function () {


});

function getParam(sname) {
  var params = location.search.substr(location.search.indexOf("?") + 1);
  var sval = "";
  params = params.split("&");
  for (var i = 0; i < params.length; i++) {
    temp = params[i].split("=");
    if ([temp[0]] == sname) { sval = temp[1]; }
  }
  return sval;
}

function getFoursquare() {
  var deferred = new $.Deferred();

  let city = getParam('city');
  let keyword = getParam('keyword');

  var url = "https://api.foursquare.com/v2/venues/search?near=" + city + "&client_id=" + clientIdKeyDecrypted.toString(CryptoJS.enc.Utf8) + "&client_secret=" + clientSecretDecrypted.toString(CryptoJS.enc.Utf8) + "&v=20210527&query=" + keyword;

  $.ajax({
    url: url,
    dataType: 'json',
    /* beforeSend: function (xhr) {
        xhr.setRequestHeader("Accept-Language","ko");
    }, */
    success: function (data) {
      var venues = data.response.venues;
      $.each(venues, function (i, venue) {
        $('.accordion').append('<section class="accordion-item accordion-item--default" onclick="initMap('
          + venue.location.lat + ',' + venue.location.lng + ')"><h3>' + venue.name + '</h3><div class="accordion-item-content"><p>'
          + venue.location.address + '</p></div>');

        let arr = [venue.name, venue.location.lat, venue.location.lng];
        locations.push(arr);
      });
      deferred.resolve();
    }
  });

  return deferred;
}

function initMapList() {

  var confirmSubmitAjaxDeferred = getFoursquare();
  confirmSubmitAjaxDeferred.done(function () {

    const myLatLng = {
      lat: locations[0][1],
      lng: locations[0][2]
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: myLatLng,
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  });
}

function initMap(lat, lng) {
  var spot = { lat: lat, lng: lng };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: spot
  });

  new google.maps.Marker({
    position: spot,
    map: map,
  });
}