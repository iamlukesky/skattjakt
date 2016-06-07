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

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e){
	var radius = e.accuracy / 2;

	L.marker(e.latlng).addTo(map)
		.bindPopup("Du är inom " + radius + " meter från den här platsen").openPopup();

	L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);