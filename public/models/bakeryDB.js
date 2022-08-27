const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    title: {type : String, required : [true, 'wymagane jest podanie tytułu']},
    text : {type : String, required : [true, 'wymagane jest podanie treści']},
    hours : {type : String, required : [true, 'wymagana jest podanie godzin otwarcia']},
    tel : {type : String, required : [true, 'wymagana jest podanie numeru telefonu']},
    mail : {type : String, required : [true, 'wymagana jest podanie adresu mail']},
    addres : {type : String, required : false},
    foto: {type : String}, 
});

module.exports = mongoose.model('shop', shopSchema);