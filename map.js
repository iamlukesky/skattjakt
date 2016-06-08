



var map = L.map("map", {
        center: [59.4124215,18.3599117],
        zoom: 13
    });


//baselayers
var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

CartoDB_DarkMatter.addTo(map);


//custom control
var MyControl = L.Control.extend({
    options: {
        position: "topright"
    },

    onAdd: function(map){
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control custom');
        // container.class = "#custom";

        return container;
    }
});

map.addControl(new MyControl());


var target = L.latLng(59.309892, 18.075331);//59.309892, 18.075331 //skanstull (gunnarssons)
L.marker(target)
    .addTo(map);



//Geolocation
map.locate({
    setView: true,
    maxZoom: 16,
    watch: true,
    enableHighAccuracy: true
});


var playerPos = L.circle(map.getCenter(), 10).addTo(map);

var targetMet = false;

function onLocationFound(e){
	var radius = e.accuracy / 2;

	playerPos
        .setLatLng(e.latlng)
        .setRadius(radius)
		.bindPopup("Du är inom " + radius + " meter från den här platsen").openPopup();

    console.log(e.latlng.lat);

	L.circle(e.latlng, radius).addTo(map);


    if(!targetMet && playerPos.getLatLng().distanceTo(target) < 100){
        alert("Du närmar dig målet!");
        targetMet = true;
    }
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);


//debug mode mouse marker
var mousemarker = L.circle(map.getCenter(), 10).addTo(map);

map.on('mousemove', function(e){
    mousemarker.setLatLng(e.latlng);//.update();
    if(e.latlng.distanceTo(target) < 100){
        mousemarker.setStyle({
            color: "Chartreuse",
            fillColor: "DarkGreen",
            opacity: 1
        });
    }
    else{
        mousemarker.setStyle({
            color: "blue",
            fillColor: "blue",
            opacity: 0.5
        })
    }
});