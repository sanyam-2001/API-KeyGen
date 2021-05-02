const mongoose = require('mongoose')

const appSchema = new mongoose.Schema({
    appName: { type: String, unique: true },
    devEmail: { type: String },
    devPassword: { type: String }
});

const appModel = mongoose.model('appModel', appSchema);

module.exports = appModel;