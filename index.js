const express = require('express');
const mongoose = require('mongoose');
const appModel = require('./Schemas/appSchema');
const path = require('path')
const createKey = require('./creator')
const keyModel = require('./Schemas/keySchema')
const URI = "mongodb+srv://Sanyam11:Sanyam11@keygen.scqjt.mongodb.net/APIGen?retryWrites=true&w=majority";


//Connecting to the Database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
    console.log("Connected to DB")
});

//Server Initialisation
const app = express();

//Middlewares
app.use(express.static(path.join(__dirname, 'Public')))

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    next();
});

//Imported Routes
app.post('/newApp', (req, res) => {
    const newApp = new appModel({
        appName: req.body.appName,
        devEmail: req.body.devEmail,
        devPassword: req.body.devPassword
    });
    newApp.save((err, resObj) => {
        if (err) {
            if (err.code === 11000) {
                res.json({ success: false, code: 11000, message: "App Name Already Taken" })
            }
        }
        else {
            res.json({ success: true, code: 200, message: resObj._id })
        }
    })
});
app.get('/generateKey/:ID/:password', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.ID)) res.json({ success: false, message: "Invalid ID", err: "ID" })
    else {
        appModel.findOne({ _id: req.params.ID }, (err, result) => {
            if (err) return console.log(err);
            else {
                if (!result) {
                    res.json({ success: false, message: "Invalid ID", err: "ID" })
                }
                else {
                    if (result.devPassword !== req.params.password) res.json({ success: false, message: "Invalid Password", err: "PW" })
                    else {
                        const newKey = createKey(32);
                        const newKeyModel = new keyModel({ appID: result._id, key: newKey })
                        newKeyModel.save((err, resObj) => {
                            if (err) return console.error(err);
                            else {
                                res.json({ success: true, message: "Key Created", key: newKey })
                            }
                        })
                    }
                }
            }
        })
    }
})
//Default Routes
app.get('/default', (req, res) => {
    res.send(JSON.stringify({ success: true, code: 200, response: { message: "Server Up and Running" } }));
})



//Listening to the Server
app.listen(process.env.PORT || 7000);


