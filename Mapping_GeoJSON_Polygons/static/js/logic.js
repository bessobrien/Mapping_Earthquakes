// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map("mapid", {
 //center: [40.7, -94.5],
  //zoom: 4
//});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 2,
  layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/bessobrien/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";
// accessing the toronto airport data
let torontoData = "https://raw.githubusercontent.com/bessobrien/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/torontoRoutes.json";
// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/bessobrien/Mapping_Earthquakes/Mapping_GeoJ_Points/Mapping_GeoJSON_Points/majorAirports.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

//create a style for the neighborhoods.
let polyStyle = {
  color: "#0018a8",
  weight: 1,
  fillColor: "ffffa1"
}

// Grabbing our Toronto neighborhood data GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: polyStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Neighborhood: " + feature.properties.AREA_NAME)
    }
  })
  .addTo(map);
});

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Airline: " + feature.properties.airline + "<hr>" + "Destination: " + feature.properties.dst);
  }
})
.addTo(map);
});

