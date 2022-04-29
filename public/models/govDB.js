const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const govsSchema = new Schema({
    title: {type: String, required: true},
    president: {type: String, required: true},
    vicePresident: {type: String, required: true},
    partPresident: {type: String, required: true},
    director: {type: String, required: true},
    viceDirector: {type: String, required: true},
    partDirector: {type: String, required: true},
    supervisorOne: {type: String, required: true},
    supervisorTwo: {type: String, required: true}
});

module.exports = mongoose.model('gov', govsSchema);