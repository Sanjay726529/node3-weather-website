const request = require("request")

const forecast = (lat, long, callback) => {

    const url = "https://api.darksky.net/forecast/df544c3a15efa19e41faa758eb1bc5a7/"+ lat + "," + long +  "?units=auto";

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to darksky weather API server. Please check the internet connection', undefined);
        } else if(body.error) {
            callback('Unable to fetch the forecast for the given location. Try different search term', undefined);
        }else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability + "% chance of rain");
        }
    })

}


module.exports = forecast;