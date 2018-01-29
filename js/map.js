var map;
function initialize() {
  	var mapOptions = {
   		zoom: 14,
   		scrollwheel: false,
   		center: new google.maps.LatLng(55.819515, 37.490370 )
 	};
 	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var point = new google.maps.LatLng(55.819515, 37.490370);

    var image = new google.maps.MarkerImage(
        'images/marker.png',
        new google.maps.Size(34,53)
    );

    var marker = new google.maps.Marker({
        icon: image,
        draggable: false,
        raiseOnDrag: false,
        map: map,
        position: point
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
