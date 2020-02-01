var map=L.map('map');

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ;
var osmAttrib = 'Map data OpenStreetMap contributors' ;
var osm=new L.TileLayer(osmUrl, {attribution : osmAttrib}). addTo(map);
map.setView([45.76, 4.85 ], 12.5);




// Metro : Ajouter les lignes de metro, changer le couleur pour chaque ligne 

var metro = L.geoJSON(ligne_metro, {
    style: function(feature) {
        switch (feature.properties.ligne) {
            case 'A': return {color: "#AF125A"};
            case 'B':   return {color: "#4D87DB"};
            case 'C':   return {color: "#EC9A29"};
            case 'D':   return {color: "#0F8B8D"};
            case 'F1':   return {color: "#8CC7A1"};
            case 'F2':   return {color: "#8CC7A1"};
        }
    }
}).addTo(map);




// Station auto-partage : Create a icon to use with a GeoJSON (Auto.js) layer instead of the default blue marker. 

// replace Leaflet's default blue marker with my icon
function createCustomIcon (feature, latlng) {
  let myIcon = L.icon({
    iconUrl: 'car_icon.png',
    iconSize:     [17, 25], // width and height of the image in pixels
    shadowSize:   [35, 20], // width, height of optional shadow image
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon })
}


// J'ai simplifié ici un peu ;) -> j'ai mis directement la fonction createCustomIcon dans l'appel du GeoJSON l.62
// create an options object that specifies which function will called on each feature
// let myLayerOptions = {
//   pointToLayer: createCustomIcon
// };


// Station auto-partage : Ajourter pop-up pour afficheir l'adresse:
// probleme : j'arrive pas à faire sortit le champ de "adreee"

// -> j'ai fait une fonction onEachFeature pour qu'il aille chercher pour chaque entité son adresse
function onEachFeature(feature, layer) {
         layer.bindPopup("<strong> Adresse </strong>: "+feature.properties.adresse);
        //  layer.on('click', function(){
        //     map.fitBounds(layer.getBounds()),
        //     elem.innerHTML=("Population de moins de 20 ans : " +feature.properties._pop20 + "<br> Pourcentage : " + getPourcentage(feature.properties._pmun13,feature.properties._pop20))
        //  });
        //  layer.on('mouseover', function(feature){
        //     layer.setStyle(highlight)
        //  });
        // layer.on({mouseout: resetHighlight});
};  


var station_layer =L.geoJSON(station_auto,{
  pointToLayer: createCustomIcon, 
  onEachFeature: onEachFeature
  }).addTo(map);


// var adresse_station = [];
// for (i in station_auto["features"]) {
//   nom = station_auto["features"][i]["properties"]["nom"];
//   adresse = station_auto["features"][i]["properties"]["adresse"];
// };
//station_layer.bindPopup('Nom : ' + nom + '<br>Adresse : ' + adresse);
//==> Plus besoin du coup vu que c'est dans le onEachFeature


// Create a buffer with a GeoJSON layer :

var buffer300 = [];
for (let feature of station_auto["features"]) {
	let coor = feature["geometry"]["coordinates"];
	buffer300.push([coor[1], coor[0]]);
}

for (var i=0 ; i < buffer300.length ; i++) {
	var buffer_layer = L.circle(buffer300[i],300,{
					color: "#ECD444",
          fillColor: "#F4E285"
      }).addTo(map);
}



// Selection de Couches : Afficher des donnees - Gestionnaire de couches :

var baseLayers = {
	"OpenStreetMap" : osm
};

var overlays = {
	"ligne de métro" : metro,
	"Station" : station_layer,
	"300 metre" : buffer_layer,
};

L.control.layers (baseLayers, overlays). addTo(map);

metro.bringToFront()
station_layer.bringToBack()





