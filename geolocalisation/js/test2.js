var directionDisplay;
var directionsService = new google.maps.DirectionsService();

if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition(initialize,error);
    navigator.geolocation.watchPosition(initialize,error);
} else {
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
}

var cities = [
    ['Levallois-Perret', 48.893217, 2.287864, 1],
    ['Colombes', 48.931179, 2.248307, 2],
    ['Boulogne-Billancourt', 48.84325, 2.237803, 3]
];

function initialize(position) {

    var maps = document.createElement('div');
    maps.id = 'maps';
    maps.style.height = '100%';
    maps.style.width = '100%';

    document.querySelector('body').appendChild(maps);

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        zoom:12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        center: latlng
    };

    map = new google.maps.Map(document.getElementById('maps'), mapOptions);

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Vous êtes ici"
    });

    setMarkers(map, cities);
}

function setMarkers(map, locations) {

    var image = {
        url: 'images/sports.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(56, 49),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(0, 32)
    };

    for (var i = 0; i < locations.length; i++) {
        var city = locations[i];
        var myLatLng = new google.maps.LatLng(city[1], city[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image,
            title: city[0],
            zIndex: city[3]
        });
    }
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