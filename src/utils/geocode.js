const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ29tc2kiLCJhIjoiY2w2OWM4c2V3MDIybjNtbjFoYjlyMDFveiJ9.SHK_KEFMNWLnMGxYQHI7iA&limit=1`;

    request({url , json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to the service.', undefined);
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location. Please search again!', undefined);
        }
        else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode