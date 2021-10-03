const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annoSchema = new Schema({
    title: {type: String, required: [true, 'Wymagane jest podanie tytułu ogłoszenia']},
    date: {type: String},
    description: {type: String, required: [true, 'Wymagane jest podanie treści ogłoszenia']},
    created: {type: String, default: Date.now },
});

module.exports = mongoose.model('annoucements', annoSchema);