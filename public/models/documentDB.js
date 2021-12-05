const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentsSchema = new Schema({
    original: {type: String, required: true},
    base: {type: String, required: true},
    created: {type: String, default: Date.now },
    createdBy: {type: String, required: true}
});

module.exports = mongoose.model('document', documentsSchema);