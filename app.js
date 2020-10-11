const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Path = require('./utils/utils');
const multer = require('multer');
const {v4: uuid} = require('uuid');


const feedRoutes = require('./routes/feed');
const authRoutes=require('./routes/auth');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//constants
const port = process.env.port;
const URL = process.env.url;


//multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, Path.staticFilePath)
    },
    filename: (req, file, cb) => {
        cb(null, uuid().toString() + '-' + file.originalname);
    }
});


//file filters
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        return cb(null, true);
    } else return cb(null, false);
}


const upload = multer({storage: storage, fileFilter: fileFilter})

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(express.json());

app.use(upload.single('image'))

app.use('/images', express.static(Path.staticFilePath));


app.use('/feed', feedRoutes);
app.use('/auth',authRoutes);


app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data =error.data;
    res.status(statusCode).json({message,data:data})
})


mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then((result) => {
        app.listen(port, (req, res) => {
            console.log(`listening on port ${port}`)
            console.log(`connected to the database`)
        })
    })
    .catch((err) => {
        console.log(err)
    })