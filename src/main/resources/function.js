
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
    }, displayDistance);
}

function displayDistance(response, status) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (status === 'OK') {
        var distanceText = response.rows[0].elements[0].distance.text;
        var durationText = response.rows[0].elements[0].duration.text;

        resultDivs.innerHTML = 'Distance: ' + distanceText + '<br>Duration: ' + durationText;
    } else {
        resultDiv.innerHTML = 'Error: Unable to calculate distance.';
    }
}

