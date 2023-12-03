
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.0902, lng: -95.7 },
        zoom: 4
    });
}

function calculateDistance() {
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        displayDistance(response, status);
        displayMap(response, origin, destination);
    });
}

function displayDistance(response, status) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (status === 'OK') {
        var distanceText = response.rows[0].elements[0].distance.text;
        var durationText = response.rows[0].elements[0].duration.text;

        resultDiv.innerHTML = 'Distance: ' + distanceText + '<br>Duration: ' + durationText;
    } else {
        resultDiv.innerHTML = 'Error: Unable to calculate distance.';
    }
}

function displayMap(response, origin, destination) {
    if (response && response.rows && response.rows[0] && response.rows[0].elements[0]) {
        var originLocation = response.originAddresses[0];
        var destinationLocation = response.destinationAddresses[0];

        var originLatLng = new google.maps.LatLng(response.originAddresses[0]);
        var destinationLatLng = new google.maps.LatLng(response.destinationAddresses[0]);

        var bounds = new google.maps.LatLngBounds();
        bounds.extend(originLatLng);
        bounds.extend(destinationLatLng);

        map.fitBounds(bounds);

        var originMarker = new google.maps.Marker({
            map: map,
            position: originLatLng,
            title: 'Origin: ' + originLocation
        });

        var destinationMarker = new google.maps.Marker({
            map: map,
            position: destinationLatLng,
            title: 'Destination: ' + destinationLocation
        });

        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

        var request = {
            origin: originLocation,
            destination: destinationLocation,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function (result, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                console.error('Error displaying directions:', status);
            }
        });
    }
}

