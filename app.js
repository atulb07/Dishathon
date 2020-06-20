var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var fs = require('fs');
var path = require('path');

// Connecting to the database 
// mongoose.connect("mongodb://localhost/Photo",
//     { useNewUrlParser: true, useUnifiedTopology: true }, err => {
//         console.log('connected')
//     });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set EJS as templating engine 
app.set("view engine", "ejs");

app.use(express.static(('public')));

var imgModel = require('./modules');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

// Retriving the image 
app.get('/detect', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('app', { items: items });
        }
    });
});

// Retriving the image 
app.get('/', (req, res) => {
    res.render("detect")
});


// Uploading the image 
app.post('/detect', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save(); 
            res.redirect('/');
        }
    });
});


app.listen('3000' || process.env.PORT, err => {
    if (err)
        throw err
    console.log('Server started')
}) 
