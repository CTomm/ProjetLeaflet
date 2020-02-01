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


// Mettre un buffer puis l'enlever au survol de la souris
function buffer (feature) {
  buf = L.circle(feature.latlng,300,{
          color: "#ECD444",
          fillColor: "#F4E285"
      }).addTo(map);
}

function debuffer (feature) {
  buf.remove(map);
}


// J'ai simplifié ici un peu ;) -> j'ai mis directement la fonction createCustomIcon dans l'appel du GeoJSON
// create an options object that specifies which function will called on each feature
// let myLayerOptions = {
//   pointToLayer: createCustomIcon
// };


// Station auto-partage : Ajouter pop-up pour afficher l'adresse:
// probleme : j'arrive pas à faire sortit le champ de "adreee"
// -> j'ai fait une fonction onEachFeature pour qu'il aille chercher pour chaque entité son adresse
// j'y ai mis aussi le buffer au survol de la souris
function onEachFeature(feature, layer) {
        layer.bindPopup("<strong> Adresse </strong>: "+feature.properties.adresse);
        layer.on({mouseover: buffer});
        layer.on({mouseout: debuffer});
};  


var station_layer =L.geoJSON(station_auto,{
  pointToLayer: createCustomIcon, 
  onEachFeature: onEachFeature
  }).addTo(map);


/// ------------- ANCIENNE FAÇON DE FAIRE LES BUFFERS -------------------
// c'était pas au survol de la souris donc ça ne répondait pas à la consigne, je le laisse quand même vu que j'ai l'ai débuggé, ça peut toujours servir

// Create a buffer with a GeoJSON layer :

// var buffer300 = [];
// for (let feature of station_auto["features"]) {
// 	let coor = feature["geometry"]["coordinates"];
// 	buffer300.push([coor[1], coor[0]]);
// }

// //Pour régler le pb j'ai fait un groupe de couche, comme ça tous les buffers sont regroupés
// var buffer = L.layerGroup()

// for (var i=0 ; i < buffer300.length ; i++) {
// 	buffer.addLayer(L.circle(buffer300[i],300,{
// 					color: "#ECD444",
//           fillColor: "#F4E285"
//       })).addTo(map);
// }

// ----------- TAUX DE CHOMAGE PAR IRIS -------------------


var iris = L.geoJSON(ligne_metro, {
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


// Selection de Couches : Afficher des donnees - Gestionnaire de couches :

var baseLayers = {
	"OpenStreetMap" : osm
};

var overlays = {
	"ligne de métro" : metro,
	"Station" : station_layer,
	//"300 metre" : buffer, (pour les anciens buffers -> on met directement le groupe de couches dans le overlays)
};

L.control.layers (baseLayers, overlays). addTo(map);

metro.bringToFront()
station_layer.bringToBack()





