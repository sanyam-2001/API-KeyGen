const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
    appID: { type: String },
    key: { type: String }
});

const keyModel = mongoose.model('keyModel', keySchema);

module.exports = keyModel;