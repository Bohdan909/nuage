var map;

function initialize() {

  let mapOptions = {
   	zoom: 14,
   	scrollwheel: false,
    draggable: true,
   	center: new google.maps.LatLng(55.819515, 37.490370)
 	};

  
  let styles = [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 20
            }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "saturation": "2"
            }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": "-1"
            }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": "0"
            }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#78bed6"
            },
            {
                "lightness": 17
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a7cdf0"
            },
            {
                "lightness": 17
            }
        ]
      }
  ]

 	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  setStyles();

  var point = new google.maps.LatLng(55.819515, 37.490370);
  var image = new google.maps.MarkerImage(
    'images/marker.png',
    new google.maps.Size(33,33)
  );

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
        setStyles();
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
      icon: image,
      draggable: false,
      raiseOnDrag: false,
      map: map,
      position: point
    });
  };

  function setStyles(){
    map.setOptions({styles: styles});
  }
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
