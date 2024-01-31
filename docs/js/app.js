// intial map settings
var mymap = L.map('map',
	{
		zoomControl:false,//custom zoom control
		minZoom: 10,
    maxZoom: 18,
	//maxBounds: [[41.15, 13], [42.5, 15]],
}).setView([41.598252,14.236169], 14);

// custom zoom control
L.control.zoom({
    position:'topright'// default is topleft
}).addTo(mymap);

L.control.scale().addTo(mymap); // add scale bar

// custom full screen control
mymap.addControl(new L.Control.Fullscreen({
	position:'topright'
}));

// custom attribution
mymap.attributionControl.addAttribution('powered by<a href="http://www.naturagis.it" target="_blank"> <img src ="https://www.naturagis.it/wp-content/uploads/2021/10/NG-minimini.png" width = "15px"> naturagis</a>');

// loading some basemaps
//var IGM = L.tileLayer('https://ludovico85.github.io/custom_XYZ_tiles/IGM_cisav/{z}/{x}/{-y}.png', {
//    tms: true,
//	opacity: 1,
//	attribution: '<a href="https://github.com/ludovico85/custom_XYZ_tiles">IGM</a>'
//});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(mymap);

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var baseMaps = {
	"Esri World Imagery": Esri_WorldImagery,
//	"Estratto IGM 1:25.000": IGM,
	"OpenStreetMap": OpenStreetMap_Mapnik,
	"CyclOSM": CyclOSM,
};

// geolocation
if(!navigator.geolocation) {
  console.log("Your browser doesn't support geolocation feature!")
   } else {
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(getPosition)
        }, 5000);
    }



function getPosition(position){
       console.log(position)
        var lat = position.coords.latitude
        var long = position.coords.longitude
        var accuracy = position.coords.accuracy
		
		var marker = L.marker([lat, long]).addTo(mymap)
		};



// loading geoJson
// custom icon for poi acquedotto
var custom_icon = new L.ExtraMarkers.icon ({
	icon: 'fa-tint',
	prefix: 'fa',
	shape: 'circle',
	markerColor: 'orange-dark'
});

// function for categorized symbols
// presidio
function tipologia_style(feature, latlng) {
	switch(feature.properties["tipologia"]){
		case "Parking":
			var parkingIcon = new L.ExtraMarkers.icon ({
				icon: 'fa-parking',
				prefix: 'fas',
    		markerColor: 'cyan',
			});
			return L.marker(latlng, {icon: parkingIcon});
		case "Food":
			var foodIcon = new L.ExtraMarkers.icon ({
				icon: 'fa-utensils',
				prefix: 'fas',
    		markerColor: 'blue-dark',
			});
			return L.marker(latlng, {icon: foodIcon});
		};
	};
	
// filter  point based on tipologia attribute
var punti_parking = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "Parking")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>Denominazione</td><td>'+feature.properties.denominazione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.indicazioni+'" class="btn btn-primary btn-sm" role="button" target="_blank">Ottieni indicazioni stradali</a></td></tr></tbody></table>')}
}).addTo(mymap);

var punti_food = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "Food")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>Denominazione</td><td>'+feature.properties.denominazione+'</td></tr><tr><td>Comune</td><td>'+feature.properties.indicazioni+'</td></tr><tr><td>Tipo di presidio</td><td>'+feature.properties.indicazioni+'</td></tr></tr><tr><td>Quota m s.l.m.</td><td>'+feature.properties.indicazioni+'</td></tr><tr><td>Descrizione</td><td>'+feature.properties.indiciazioni+'</td></tr><tr><td>Fonte dati</td><td>'+feature.properties.indicazioni+'</td></tr><tr><tr class="text-center"><td colspan="2">'+feature.properties.indicazioni+'</td></tr></tbody></table>')}
}).addTo(mymap);

// load sentieri
var fiume_volturno = new L.geoJson(fiume_volturno, {
	weight: 6,
  lineCap: 'round',
  color: '#0B84EE'
}).addTo(mymap);
fiume_volturno.bindTooltip("Fiume Volturno",  {sticky: true});


// create overlaymaps for L.control.layers with custom icons
//var overlayMaps = {
//    '<img src = ico/fontane.png width="25px">Fontane': cisav_fontane,
//    '<img src = ico/sorgenti.png width="25px">Sorgenti': cisav_sorgenti,
//		'<img src = ico/corso_acqua.png width="25px">Corsi d&#8217acqua':cisav_corso_acqua,
//		'<img src = ico/opere_idrauliche.png width="25px">Opere idrauliche':cisav_opere_idrauliche,
//		'<img src = ico/poi.png width="25px">POI Acquedotto romano di Venafro':poi_acquedotto,
//};

// create grouped overlaymaps for L.control.groupedLayers with custom icons
var groupedOverlays = {
	"Sentiero di Acqua e Pietra:<br>Il racconto delle comunità" : {
		'<img src = ico/fontane.png width="25px">Parking': punti_parking,
    '<img src = ico/sorgenti.png width="25px">Food': punti_food,
	},
	"Rete dei sentieri":{
		'<i class="fas fa-wave-square fa-2x" style="color:red"></i> Sentiero':fiume_volturno,
	},
};

// function for controlling the behaviour of the control.layers
if(window.screen.width <=767) {
	var isCollapsed = true;
} else {
	var isCollapsed = false;
};

console.log(isCollapsed)
console.log(window.screen.width)

//L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(mymap);
L.control.groupedLayers(baseMaps, groupedOverlays, {collapsed: isCollapsed}).addTo(mymap);
