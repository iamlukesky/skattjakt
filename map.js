



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
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control custom open-modal');
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




//Leaflet modal example code
L.DomEvent
  .on(document.querySelector('.open-modal'), 'click', function(){
    //console.log("click!"); Funkar. Så anledningen till att den inte visar något är nåt annat.
    // map.fire('modal', {

    //   content: 'your content HTML',        // HTML string

    //   closeTitle: 'close',                 // alt title of the close button
    //   zIndex: 10000,                       // needs to stay on top of the things
    //   transitionDuration: 300,             // expected transition duration

    //   template: '{content}',               // modal body template, this doesn't include close button and wrappers

    //   // callbacks for convenience,
    //   // you can set up you handlers here for the contents
    //   onShow: function(evt){ var modal = evt.modal;},
    //   onHide: function(evt){ var modal = evt.modal;},

    //   // change at your own risk
    //   OVERLAY_CLS: 'overlay',              // overlay(backdrop) CSS class
    //   MODAL_CLS: 'modal',                  // all modal blocks wrapper CSS class
    //   MODAL_CONTENT_CLS: 'modal-content',  // modal window CSS class
    //   INNER_CONTENT_CLS: 'modal-inner',    // inner content wrapper
    //   SHOW_CLS: 'show',                    // `modal open` CSS class, here go your transitions
    //   CLOSE_CLS: 'close'                   // `x` button CSS class
    // });
    map.fire('modal', {
      content: '<h1>Modal header</h1>' + (new Array(100)).join('<p>Content line</p>')
    });
});