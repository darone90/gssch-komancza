const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: [true, 'Wymagane jest podanie tytułu']},
    date: {type: String},
    description: {type: Object, required: [true, 'Wymagane jest podanie treści artykułu']},
    created: {type: String, default: Date.now },
    foto: {type: String},
});

module.exports = mongoose.model('news', newsSchema);