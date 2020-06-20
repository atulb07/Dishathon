var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set EJS as templating engine 
app.set("view engine", "ejs");

app.use(express.static(('public')));


// Retriving the image 
app.get('/', (req, res) => {
    res.render("detect")
});



app.listen(process.env.PORT || '3000', err => {
    if (err)
        throw err
    console.log('Server started')
}) 
