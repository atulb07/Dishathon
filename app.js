var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')


const { spawn } = require('child_process');

app.get('/python', (req, res) => {
    var largeDataSet = [];
    // spawn new child process to call the python script
    const python = spawn('python3', ['analysis.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        largeDataSet.push(data);
    });
    // in close event we are sure that stream is from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(largeDataSet.join(""))
    });
})



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
