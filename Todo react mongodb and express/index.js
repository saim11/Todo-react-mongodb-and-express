//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Signature = require('./models/signature.js')
const app = express();
var cors = require('cors');//Using this package to resolve cors error in browsers 
const url = 'mongodb://localhost:27017/signatures';
app.use(cors());
//=========================//


//====MONGOOSE CONNECT===//
mongoose.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
    }
});
//==========================//


// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     if (req.method === "OPTIONS") {
//         res.header("Acces-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//         return res.status(200).json({});
//     }
    // next();
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "GET, POST, OPTIONS, PUT, DELETE");
    // headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    //next();
// });

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

//====ROOT DIRECTORY===//
app.get('/', function (req, res) {
    res.json('you did it');
});
//==========================//

//====GET ALL SIGNATURES===//
app.get('/api/signatures', function (req, res) {
    Signature.find({}).then(eachOne => {
        res.json(eachOne);
    })
})
//==========================//

//====POST NEW SIGNATURE===//
app.post('/api/Newsignatures', function (req, res) {
    // console.log(req.body.SignatureOfGuest);
    // Method #1 to create document..
    newSignatures = new Signature({
        guestSignature: req.body.SignatureOfGuest,
        message: req.body.MessageofGuest
    });
    newSignatures.save().then(signature => {
        res.json(signature)
    });

    // Method #2 to create document..
    // Signature.create({
        // guestSignature: req.body.SignatureOfGuest,
        // message: req.body.MessageofGuest,
    // }).then(signature => {
    //     res.json(signature)
    // });
});
//==========================//
//====Edit SIGNATURES===//

app.put('/api/signatures/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body.MessageofGuest;
    console.log(body.MessageofGuest);
    Signature.findByIdAndUpdate({ _id: id }, { $set: { message: body }}, { new: true }, function (err, model){
        if(err){
            console.log(err);
        }
    })
}
);
//==========================//
//====Delete SIGNATURES===//

app.delete('/api/signatures/:id', function (req, res) {
    let id = req.params.id;
    Signature.findByIdAndRemove({ _id: id })
    .then((Response)=>console.log("Your Post Has been Deleted Now.."))
    .catch((err)=>console.log("Error Occured :"+ err));
}
);
//==========================//
app.listen(process.env.PORT || 5000);
console.log('starting applicaiton.  Good job!');