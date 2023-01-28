const params = window.location.search
const urlParams = new URLSearchParams(params);

const
  keys = urlParams.keys(),
  values = urlParams.values(),
  entries = urlParams.entries();

for (const key of keys) console.log(key);
// product, color, newuser, size

for (const value of values) console.log(value);
// shirt, blue, , m

for(const entry of entries) {
    console.log(`${entry[0]}: ${entry[1]}`);
}

var list = [ 
    {'color': 'blue', 'latitude': 41.826835, 'longitude': -71.399710},
    {'color': 'green', 'latitude': 41.826835+0.001, 'longitude': -71.399710},
]

/**
 * 
 * @param {p} url 
 * @return 
 */
function parseURL(url){
    let entities = [];
    var entities_url = url.split("=")[1];
    var lat_lon_list = entities_url.split(",");
    for (const lat_lon_str of lat_lon_list){
        lat_lon = lat_lon_str.split('_');
        lat = parseFloat(lat_lon[0]);
        lon = parseFloat(lat_lon[1]);
        console.log(`(${lat}, ${lon})`);
        entities.push({'lat': lat, 'lon': lon});
    }
    return entities;
}

let colors = [
    'blue',
    'red',
    'green',
    'yellow',
]

window.onload = () => {

    // Retrieve list of latitude and longitude
    var entities = parseURL(window.location.search);

    for (const entity of entities){
        let color_index = Math.floor(Math.random() * colors.length);
        createEntity(colors[color_index], entity.lat, entity.lon);
        // createEntity(list[i].color, list[i].latitude, list[i].longitude);
    }
};

function createEntity(color, latitude, longitude){

    let testEntityAdded = false;
    if(!testEntityAdded) {
        // Add a box to the north of the initial GPS position
        const entity = document.createElement("a-box");
        entity.setAttribute("scale", {
            x: 20, 
            y: 20,
            z: 20
        });
        entity.setAttribute('material', { color: color } );
        entity.setAttribute('gps-new-entity-place', {
            latitude: latitude,
            longitude: longitude
        });
        document.querySelector("a-scene").appendChild(entity);
    }
    testEntityAdded = true;
}


function createLocalEntity(color, latitude, longitude){

    let testEntityAdded = false;
    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
            const entity = document.createElement("a-box");
            entity.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            entity.setAttribute('material', { color: 'red' } );
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
}

function addEntity(entity){
    const ascene = document.querySelector('a-scene');
    ascene.innerHTML += entity;
}

function validateColor(color){

}

function validateLatitude(latitude){

}

function validateLongitude(longitude){

}