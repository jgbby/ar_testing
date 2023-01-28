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

addEntity(createEntity('red', '41.826835', '-71.399710'))

function createEntity(color, latitude, longitude){
    let entity = `<a-entity material='color: ` + color + `' geometry='primitive: box' gps-new-entity-place="latitude: ` + latitude + `; longitude: ` + longitude + `" scale="5 5 5"></a-entity>`
    return entity;
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