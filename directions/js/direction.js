// Fonction de callback en cas de succès
function success(position) {

    // Position par défaut
    var centerpos = new google.maps.LatLng(48.579400,7.7519);

    //TESTER :Latitude : 47.8122899 - Longitude : 3.07988405 avec une Distance 48.579400,7.7519 (Paris)

    var maps = document.createElement('div');
    maps.id = 'maps';
    maps.style.height = '100%';
    maps.style.width = '100%';

    var markers = document.createElement('div');
    markers.id = 'markers';

    document.querySelector('body').appendChild(maps);
    document.querySelector('body').appendChild(markers);

    var infopos = "Position déterminée : <br>";
    infopos += "Latitude : "+position.coords.latitude +"<br>";
    infopos += "Longitude: "+position.coords.longitude+"<br>";
    infopos += "Altitude : "+position.coords.altitude +"<br>";
    document.getElementById("markers").innerHTML = infopos;

    // On instancie un nouvel objet LatLng pour Google Maps
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // Ansi que des options pour la carte, centrée sur latlng
    var optionsGmaps = {
        center:centerpos,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 15
    };
    // Initialisation de la carte avec les options
    var map = new google.maps.Map(document.getElementById("maps"), optionsGmaps);

    // Ajout d'un marqueur à la position trouvée
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Vous êtes ici"
    });

    map.panTo(latlng);

}

// Fonction de callback en cas d’erreur
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
    document.getElementById("markers").innerHTML = info;
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success,error);
} else {
    alert("Ce navigateur ne supporte pas la géolocalisation");
}



