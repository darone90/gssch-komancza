const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assortmentSchema = new Schema({
    title : {type : String, required : [true, 'wymagane jest podanie tytułu']},
    description : {type : String, required : [true, 'wymagana jest podanie opisu produktu']},
    foto: {type : String}, 
});

module.exports = mongoose.model('assortment', assortmentSchema);