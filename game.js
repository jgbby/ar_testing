
/*
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
*/

let colors = [
    'blue',
    'red',
    'green',
    'yellow',
    'orange',
    'purple',
    'white',
    'brown'
]

// When the A-Frame loads add the given entities specified in the URL
window.onload = () => {

    createLocalText("Welcome to ScavengerAR! This is an AR-based in-real-life scavenger hunt. The color of your screen tells you how hot or cold you are to the landmarks!")

    // Retrieve list of latitude and longitude
    var entities = parseURL(window.location.search);

    // Render all entities with random colors
    for (const entity of entities){
        let color_index = Math.floor(Math.random() * colors.length);
        createEntity(colors[color_index], entity.lat, entity.lon);
    }
};

/**
 * Parses the given URL into latitude and longitude pairs 
 * @param {String} url the url formatted as .../?entities=lat_lon,lat_lon,...,lat_lon 
 * @return {List[Dictionary]} a list of {'lat': lat, 'lon', lon} pairs 
 * 
 * For example:
 *  http://.../?entities=41.826835_-71.399710,41.827835_-71.399710
 *  becomes [{'lat': 41.826835, 'lon': -71.399710}, {'lat': 41.827835, 'lon': -71.399710}]
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

/**
 * Creates and adds the given AR entity of color at the latitude and longitude 
 * @param {String} color 
 * @param {Float} latitude 
 * @param {Float} longitude 
 */
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

/**
 * Creates and adds the given AR entity of color in front of the user's camera
 * @param {*} color 
 */
function createLocalText(message){

    let testEntityAdded = false;
    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
            const entity = document.createElement("a-text");
            entity.setAttribute("scale", {
                x: 5, 
                y: 5,
                z: 5
            });
            entity.setAttribute('value', message);
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
}

/**
 * Creates and adds the given AR entity of color in front of the user's camera
 * @param {*} color 
 */
function createLocalBox(color){

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
            entity.setAttribute('material', { color: color } );
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
}

function validateColor(color){

}

function validateLatitude(latitude){

}

function validateLongitude(longitude){

}