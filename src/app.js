const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express();

//Paths for Express
const directoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Handlebars
app.set('view engine', 'hbs');
//Changing the views directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//serving static files
app.use(express.static(directoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Gomsi'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Gomsi'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is a help text',
        title: 'Help page',
        name: 'Gomsi'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Gomsi',
        message: 'help page not found'
    })
})

app.get('/weather', (req, res) => {
    // console.log(req.query)
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
            
            res.send({
                forecast: forecastData,
                location,
                // address: req.query.address
            })
        });
    });

    // res.send({
    //     forecast: 'Cloudy',
    //     location: 'New Delhi',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })

    }
    // console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Gomsi',
        message: 'page not found'
    });
})

// app.get('', (req, res) => {
//     res.send(
//         '<h1>Hi</h1>'
//     );
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Gomsi',
//         age: 20
//     });
// })
// app.get('/about', (req, res) => {
//     res.send('about page');
// })

app.listen(3000, () => {
    console.log('Server running on port 3000');
})