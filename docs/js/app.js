// intial map settings
var mymap = L.map('map',
	{
	zoomControl:false,//custom zoom control
	minZoom: 10,
    maxZoom: 19,
	//maxBounds: [[41.15, 13], [42.5, 15]],
}).setView([41.594574,14.231342], 14);

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
mymap.attributionControl.addAttribution('Realizzato da <a style="color:#0096FF;" href="https://www.linkedin.com/in/ludovicofrate/" target="_blank"> Ludovico Frate</a>');

// loading some basemaps
//var IGM = L.tileLayer('https://ludovico85.github.io/custom_XYZ_tiles/IGM_cisav/{z}/{x}/{-y}.png', {
//    tms: true,
//	opacity: 1,
//	attribution: '<a href="https://github.com/ludovico85/custom_XYZ_tiles">IGM</a>'
//});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

var baseMaps = {
//	"Estratto IGM 1:25.000": IGM,
	"OpenStreetMap": OpenStreetMap_Mapnik,
	"OpenStreetMap HOT": OpenStreetMap_HOT,
	"Esri World Imagery": Esri_WorldImagery,
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
		case "Parcheggio":
			var parkingIcon = new L.ExtraMarkers.icon ({
				icon: 'fa-parking',
				prefix: 'fas',
    		markerColor: 'cyan',
			});
			return L.marker(latlng, {icon: parkingIcon});
		case "Ristorante":
			var parkingIcon = new L.ExtraMarkers.icon ({
				icon: 'fa-utensils',
				prefix: 'fas',
    		markerColor: 'red',
			});
			return L.marker(latlng, {icon: parkingIcon});
		case "varie":
			var parkingIcon = new L.ExtraMarkers.icon ({
				icon: 'fa-pizza-slice',
				prefix: 'fas',
    		markerColor: 'orange',
			});
			return L.marker(latlng, {icon: parkingIcon});
		case "Food":
			var foodIcon = new L.ExtraMarkers.icon ({
				icon: 'fa-hamburger',
				prefix: 'fas',
    		markerColor: 'green',
			});
			return L.marker(latlng, {icon: foodIcon});
		case "culturali":
			var culturaliIcon = new L.ExtraMarkers.icon ({
				icon: 'fa-landmark',
				prefix: 'fas',
    		markerColor: 'purple',
			});
			return L.marker(latlng, {icon: culturaliIcon});
		case "parata":
			var parataIcon = new L.icon ({
				iconUrl: 'https://github.com/ludovico85/carnevale_isernia/blob/main/docs/ico/parade_ico.png?raw=true',
				iconSize: [30, 50]
			});
			return L.marker(latlng, {icon: parataIcon});
		};
		
	};

	
// filter  point based on tipologia attribute
var punti_parking = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "Parcheggio")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>'+feature.properties.denominazione+'</td></tr><tr><td style="font-size: 10px; font-weight: bold">'+feature.properties.descrizione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.indicazioni+'" class="btn btn-primary btn-sm" role="button" target="_blank">Indicazioni/Directions</a></td></tr></tbody></table>')}
}).addTo(mymap);

var punti_ristorante = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "Ristorante")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>'+feature.properties.denominazione+'</td></tr><tr><td style="font-size: 10px; font-weight: bold">'+feature.properties.descrizione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.indicazioni+'" class="btn btn-primary btn-sm" role="button" target="_blank">Indicazioni/Directions</a></td></tr></tbody></table>')}
}).addTo(mymap);

var punti_varie = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "varie")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>'+feature.properties.denominazione+'</td></tr><tr><td style="font-size: 10px; font-weight: bold">'+feature.properties.descrizione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.indicazioni+'" class="btn btn-primary btn-sm" role="button" target="_blank">Indicazioni/Directions</a></td></tr></tbody></table>')}
}).addTo(mymap);

var punti_food = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "Food")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>'+feature.properties.denominazione+'</td></tr><tr><td style="font-size: 10px; font-weight: bold">'+feature.properties.descrizione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.indicazioni+'" class="btn btn-primary btn-sm" role="button" target="_blank">Indicazioni/Directions</a></td></tr></tbody></table>')}
}).addTo(mymap);

var punti_culturali = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "culturali")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>'+feature.properties.denominazione+'</td></tr><tr><td style="font-size: 10px; font-weight: bold">'+feature.properties.descrizione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.indicazioni+'" class="btn btn-primary btn-sm" role="button" target="_blank">Indicazioni/Directions</a></td></tr></tbody></table>')}
}).addTo(mymap);

var punti_parata = new L.geoJson(punti, {
	filter: function (feature, layer) {
	return (feature.properties.tipologia === "parata")},
	pointToLayer: tipologia_style,
	style: tipologia_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>'+feature.properties.denominazione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.indicazioni+'" class="btn btn-primary btn-sm" role="button" target="_blank">Indicazioni/Directions</a></td></tr></tbody></table>')}
}).addTo(mymap);

// load percorso
var percorso = new L.geoJson(percorso, {
	weight: 6,
  lineCap: 'round',
  color: 'red'
}).addTo(mymap);
percorso.bindTooltip("Parade Path",  {sticky: true});

// area camper personalizzata
var camper = L.polygon([
      [41.6038896,14.2455197],
      [41.6048342,14.2467410],
      [41.6045033,14.2471622],
	  [41.6036188,14.2460010]
    ]).addTo(mymap)

camper.setStyle({
      fillColor: 'green',
      fillOpacity: 0.5,
      color: '#36c146',
      weight: 2
    });
camper.bindTooltip("Camper area",  {sticky: true});



// create grouped overlaymaps for L.control.groupedLayers with custom icons
var groupedOverlays = {
	"Points of interest:" : {
	'<img src = ico/parcheggio.png width="25px">Parcheggio/Parking': punti_parking,
    '<img src = ico/food.png width="25px">Food Area': punti_food,
	'<img src = ico/ristorante.png width="25px">Ristoranti/Restaurants': punti_ristorante,
	'<img src = ico/varie.png width="25px">Varie/various (bakery, dairy, cafè, wine bar, etc.)': punti_varie,
	'<img src = ico/culturali.png width="25px">Siti culturali/Cultural sites': punti_culturali,
	},
	"Parade Path":{
		'<i class="fas fa-wave-square fa-2x" style="color:red"></i> Parade Path':percorso,
		'<img src = ico/parade_ico.png width="25px"> Starting/arrival points': punti_parata,
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

// geolocator
var lc = L.control
  .locate({
    position: "topright",
    strings: {
      title: "Show me where I am, yo!"
    }
  })
  .addTo(mymap);