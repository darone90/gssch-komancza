const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: [true, 'Wymagane jest podanie tytułu']},
    date: {type: String},
    description: {type: String, required: [true, 'Wymagane jest podanie treści artykułu']},
    created: {type: String, default: Date.now },
})

module.exports = mongoose.model('News', newsSchema);