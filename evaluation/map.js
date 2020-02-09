var map=L.map('map');

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ;
var osmAttrib = 'Map data OpenStreetMap contributors' ;
var osm=new L.TileLayer(osmUrl, {attribution : osmAttrib}). addTo(map);
map.setView([45.76, 4.85 ], 12.5);


// ----------- LIGNES DE METRO -------------------

var metro = L.geoJSON(ligne_metro, {
    style: function(feature) {
        switch (feature.properties.ligne) {
            case 'A': return {color: "#AF125A"};
            case 'B':   return {color: "#4D87DB"};
            case 'C':   return {color: "#EC9A29"};
            case 'D':   return {color: "#0F8B8D"};
            case 'F1':   return {color: "#8CC7A1"};
            case 'F2':   return {color: "#8CC7A1"};
        }}
}).addTo(map);

// Markers animés le long des lignes

function draw_animated_marker(coords, name){
  animatedMarker = L.animatedMarker(coords, {
      icon: L.icon({
        iconUrl: name + '.svg',
        iconSize:     [25, 38], // width and height of the image in pixels
        shadowSize:   [35, 20], // width, height of optional shadow image
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
      }),
      autoStart: true,
      distance: 200,
      interval: 200,
      onEnd: function() {
                        map.removeLayer(this);
                        draw_animated_marker(coords, name)
                    } // Un nouveau marker animé est créé à la fin pour boucler
    });
    map.addLayer(animatedMarker);
}

for (i in ligne_metro.features){
  if (ligne_metro.features[i].properties.sens == 'Aller' ){
    ligne = ligne_metro.features[i].geometry.coordinates[0];
    for (j in ligne){
      ligne[j]=ligne[j].reverse()
    }
    draw_animated_marker(ligne_metro.features[i].geometry.coordinates[0], ligne_metro.features[i].properties.ligne)
  }}


// ----------- STATIONS AUTO PARTAGE -------------------


// Icone pour mettre en valeur
var IconStyleTwo = L.icon({
    iconUrl: 'car_icon.png',
    iconSize:     [25, 38], // width and height of the image in pixels
    shadowSize:   [35, 20], // width, height of optional shadow image
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })

// Icone de base
var IconStyleOne = L.icon({
    iconUrl: 'car_icon.png',
    iconSize:     [17, 25], // width and height of the image in pixels
    shadowSize:   [35, 20], // width, height of optional shadow image
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })

// replace Leaflet's default blue marker with my icon
function createCustomIcon (feature, latlng) {
  return L.marker(latlng, { icon: IconStyleOne })
}


// Mettre un buffer puis l'enlever au survol de la souris
function buffer (feature) {
  buf = L.circle(feature.latlng,300,{
          color: "#000000",
          fillColor: "#000000"
      }).addTo(map);
}

function debuffer (feature) {
  buf.remove(map);
}


// Appel de toutes les fonctions définies ci-dessus dans le onEachFeature :
function onEachFeature(feature, layer) {
        layer.bindPopup("<strong> Adresse </strong>: "+feature.properties.adresse);
        layer.on({mouseover: buffer});
        layer.on("mouseover",function(e){
                layer.setIcon(IconStyleTwo)
            });
        layer.on({mouseout: debuffer});
        layer.on("mouseout",function(e){
        layer.setIcon(IconStyleOne)
        });
};  


var station_layer =L.geoJSON(station_auto,{
  pointToLayer: createCustomIcon, 
  onEachFeature: onEachFeature
  }).addTo(map);


// ----------- TAUX DE CHOMAGE PAR IRIS -------------------


function getColor(d) {
    return d > 40 ? '#b10026' :
           d > 30  ? '#e31a1c' :
           d > 20  ? '#fc4e2a' :
           d > 15 ? '#fd8d3c' :
           d > 10  ? '#feb24c' :
           d > 5  ? '#fed976' :
                      '#ffffb2';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.tchom),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5
    };
}


var iris = L.geoJSON(iris, {style: style});
iris.addTo(map);


// Légende des iris
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 10, 15, 20, 30, 40],
        labels = [];
    div.innerHTML+="<strong>Taux de chômage : </strong><br>";
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

// Selection de Couches : Afficher des donnees - Gestionnaire de couches :

var baseLayers = {
  "OpenStreetMap" : osm
};

var overlays = {
  "Ligne de métro" : metro,
  "Stations" : station_layer,
    "Iris" : iris
};

L.control.layers (baseLayers, overlays). addTo(map);

metro.bringToFront()
station_layer.bringToBack()

