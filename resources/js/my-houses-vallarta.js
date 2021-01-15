var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?v=weeklykey=AIzaSyBPY5u412bbKaVShChr--cyAUX8XSSixDk&callback=initMap';
script.defer = true;
var locations = [
    ['<h3>Casa Serena</h3><p>Fluvial, Puerto Vallarta</p> <a href="#casaSerena" style="color:blue;">See House</a>', 20.644149, -105.225077],
    ['<h3>Casa El Tigre</h3><p>El tigre, Nuevo Vallarta</p> <a href="#casaSerena" style="color:blue;">See House</a>', 20.697289, -105.286237],
    ['<h3>Casa Romantica</h3><p>Zona Romantica, Puerto Vallarta</p> <a href="#casaSerena" style="color:blue;">See House</a>', 20.60349816001245, -105.23366959595253]
];
var markers = [];
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
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        });
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                map.panTo(this.getPosition());
                map.setZoom(15);
                infowindow.open(map, marker);
            }
        })(marker));
        google.maps.event.addListener(infowindow, 'domready', function () {
            smoothScroll();
        });
        markers[i] = marker;
    }
};
document.head.appendChild(script);

// Simulates click on the house marker.
async function goToProperty(house){
    await new Promise(r => setTimeout(r, 500));

    if (map.getZoom() == 15){
        map.setZoom(12);
        await new Promise(r => setTimeout(r, 1000));
    }
    google.maps.event.trigger(markers[house], 'click');
}

$('.carousel').carousel({
    interval: false
});
$(function() {
    smoothScroll();
});
function smoothScroll(){
    $('a[href*="#"]')
    .not('[href="#carousel-house-1"]')
    .not('[href="#carousel-house-2"]')
    .not('[href="#carousel-house-3"]')
    .click(function(event) {
        var target = $(this.hash);
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top-75
            }, 1000, function() {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex','-1');
                    $target.focus();
                };
            });
        }
    });
}
