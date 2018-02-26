var map;

function initialize() {

  var mapOptions = {
   	zoom: 14,
   	scrollwheel: false,
   	center: new google.maps.LatLng(55.819515, 37.490370)
 	};

 	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var point = new google.maps.LatLng(55.819515, 37.490370);

  // var image = new google.maps.MarkerImage(
  //     'images/marker.png',
  //     new google.maps.Size(34,53)
  // );

  setMarker();

  // Get Position  
  var geocoder = new google.maps.Geocoder();
  var submit = document.getElementById('submit');
  var btnLoc = document.querySelectorAll('.ico-loc');
  
  submit.addEventListener('click', function(){
    var address = document.getElementById('address').value;
    geocodeAddress(geocoder, map, address);
  });

  Array.prototype.forEach.call(btnLoc, function(item){
    item.addEventListener('click', function(){
      navigator.geolocation.getCurrentPosition(function(position){

        var userLat  = position.coords.latitude;
        var userLong = position.coords.longitude;

        address.value = "";
        mapOptions.center = new google.maps.LatLng(userLat, userLong);
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        point = new google.maps.LatLng(userLat, userLong);

        setMarker();
      });
    });
  });

  var selectize = $("#select-city").selectize({
    allowEmptyOption: true,
    create: true,

    onChange: function(val){
      var address = val;
      geocodeAddress(geocoder, map, address);
    },

    onDropdownOpen: function(){
      scrollSelectInit();
    }
  });

  function scrollSelectInit(){
    $(".selectize-dropdown").perfectScrollbar({
        wheelSpeed: 0.5,
        wheelPropagation: false,
        minScrollbarLength: 20
    });
  }

  function setMarker(){
    new google.maps.Marker({
      //icon: image,
      draggable: false,
      raiseOnDrag: false,
      map: map,
      position: point
    });
  };
}

google.maps.event.addDomListener(window, 'load', initialize);

function geocodeAddress(geocoder, resultsMap, address){

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
