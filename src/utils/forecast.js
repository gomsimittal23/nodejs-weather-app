const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1bbca3b5b5fbad244b85383ae64f1375&query=${latitude},${longitude}`;

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unabe to connect to weather services.')
        }
        else if(response.body.error){
            callback('Unable to find location.')
        }
        else{
            const data = response.body.current;
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out but it feels like ${data.feelslike} degrees.`);
        }
    });
}

module.exports = forecast