const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: {type: String, required: [true, 'Wymagane jest podanie nazwy']},
    subject: {type: String},
    content: {type: String, required: [true, 'Wymagane jest wpisanie treści wiadomości']},
    contact: {type: String},
    readed: {type: Boolean, default: false},
    date: {type: String, default: new Date().toJSON().slice(0,10).replace(/-/g,'.')},
});

module.exports = mongoose.model('messages', messageSchema);