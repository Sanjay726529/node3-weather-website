const request = require("request")

const forecast = (lat, long, callback) => {

    const url = "https://api.darksky.net/forecast/df544c3a15efa19e41faa758eb1bc5a7/"+ lat + "," + long +  "?units=auto";

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to darksky weather API server. Please check the internet connection', undefined);
        } else if(body.error) {
            callback('Unable to fetch the forecast for the given location. Try different search term', undefined);
        }else {
            callback(undefined, {
                summary: body.currently.summary,
                rainPossibility: body.currently.precipProbability + "%",
                currentTemp: body.currently.temperature,
                humidity: body.currently.humidity,
                windSpeed: body.currently.windSpeed
            });
        }
    })

}


module.exports = forecast;