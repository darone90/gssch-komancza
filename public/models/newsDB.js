const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: [true, 'Wymagane jest podanie tytułu']},
    date: {type: String},
    description: {type: Array, required: [true, 'Wymagane jest podanie treści artykułu']},
    created: {type: String, default: Date.now },
    archived: {type: Boolean, default: false},
    foto: {type: String},
});

module.exports = mongoose.model('news', newsSchema);