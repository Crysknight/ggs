import $script from 'scriptjs';

if ($('.ggs-google-map').length > 0) {
	$script('https://maps.googleapis.com/maps/api/js?key=AIzaSyCWgWiXe4fdVDjYj6-APt80DhtH2o05w8U&amp', function() {

		let map = new google.maps.Map(document.querySelector('.ggs-google-map'), {
			center: { lat: 55.612682, lng: 37.697028 },
			zoom: 17,
			disableDefaultUI: true
		});
    var marker = new google.maps.Marker({
      position: { lat: 55.612664, lng: 37.701867 },
      map: map,
      title: 'Домодедовская 20к1'
    });

	});
}