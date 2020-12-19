var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPY5u412bbKaVShChr--cyAUX8XSSixDk&callback=initMap';
script.defer = true;
var locations = [
    ['<h3>Casa Serena</h3><p>Fluvial, Puerto Vallarta</p>', 20.644149, -105.225077],
    ['<h3>Casa El Tigre</h3><p>El tigre, Nuevo Vallarta</p>', 20.697289, -105.286237],
    ['<h3>Casa Romantica</h3><p>Zona Romantica, Puerto Vallarta</p>', 20.60349816001245, -105.23366959595253]
];
var marker;
window.initMap = function() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 20.647023, lng: -105.252584},
        zoom: 12,
        mapId: '637d3dc6f2544486',
    });
    for (var i = 0; i < locations.length; i++) {
        const infowindow = new google.maps.InfoWindow({
            content: locations[i][0],
        });
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.open(map, marker);
                map.setZoom(15);
                map.panTo(this.getPosition());
            }
        })(marker, i));
    }
};
document.head.appendChild(script);
$('.carousel').carousel({
    interval: false
});
