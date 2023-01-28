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


window.onload = () => {
    createEntity('blue', 41.826835, -71.399710);
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