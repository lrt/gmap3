var directionDisplay;
var directionsService = new google.maps.DirectionsService();

if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition(initialize,error);
    navigator.geolocation.watchPosition(initialize,error);
} else {
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
}

function initialize(position) {

    var maps = document.createElement('div');
    maps.id = 'maps';
    maps.style.height = '100%';
    maps.style.width = '100%';

    document.querySelector('body').appendChild(maps);

    var latlng = new google.maps.LatLng(48.856614,2.3522220000000003); //Paris 48.856614,2.3522220000000003

    var mapOptions = {
        zoom:15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        center: latlng
    };

    map = new google.maps.Map(document.getElementById('maps'), mapOptions);

    calcRoute();
}

function calcRoute() {

    var start = new google.maps.LatLng(48.856614,2.3522220000000003);
    var end = new google.maps.LatLng(47.8122899,3.07988405);

    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function error(msg) {
    var info = "Erreur lors de la géolocalisation : ";
    switch(msg.code) {
        case msg.TIMEOUT:
            info += "Timeout !";
            break;
        case msg.PERMISSION_DENIED:
            info += "Vous n’avez pas donné la permission";
            break;
        case msg.POSITION_UNAVAILABLE:
            info += "La position n’a pu être déterminée";
            break;
        case msg.UNKNOWN_ERROR:
            info += "Erreur inconnue";
            break;
    }
    //document.getElementById("markers").innerHTML = info;
}



