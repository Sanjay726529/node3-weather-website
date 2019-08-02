const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// define the path directory for express 
publicDirectoryPath = path.join(__dirname, '../public');
viewsDirectoryPath = path.join(__dirname, '../templates/views')
partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// set the veiw engine of express engine to handle bar service
app.set('view engine', 'hbs')
// change the default views directory path to custom
app.set('views', viewsDirectoryPath)
// setting the webpage static folder location
app.use(express.static(publicDirectoryPath))
// set the hbs partials path
hbs.registerPartials(partialsDirectoryPath)


app.get('', (req , res) => {
    //res.send("Hello Express!!. This web server is powered by Express NPM module")
    res.render('index', {
        title: 'Home',
        name: 'Sanjay'
    })

})

app.get('/help', (req, res) => {
    //res.send("Our Help page is under maintainence. Please visit back later")
    res.render('help',{
        title: "Help",
        name: 'Sanjay',
        message: 'This is an help section, if you have complaints, please visit the compaints section'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address is required to fetch the weather forecast"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(longitude, latitude, (error, {currentTime, summary, rainPossibility, currentTemp, humidity, windSpeed} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                userAddress: req.query.address,
                placeName,
                currentTime,
                summary,
                rainPossibility,
                currentTemp,
                humidity,
                windSpeed
            })
        })

    })
})

app.get('/about', (req, res) => {
    //res.send("ABOUT PAGE which is under maintainence. Coming soon")
    res.render('about', {
        title: 'About',
        name: 'Sanjay'
    })
})

app.get('/help/*', (req, res) => {
    res.render("404notfound", {
        title: "unknown article",
        message: "The help article you are looking for is not found!!",
        name: "sanjay"
    })
})

app.get('*', (req, res) => {
    res.render("404notfound", {
        title: "Oops",
        message: "Oops!! 404 page not found",
        name: "sanjay"
    })
})



app.listen(port, () => {
    console.log('Server is up and running on port' + port)
})