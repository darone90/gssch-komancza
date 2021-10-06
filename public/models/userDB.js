const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addUserSchema = new Schema({
    name : {type : String, required : [true, 'Należy podać nazwę użytkownika']},
    password : {type : String, required : [true, 'Należy podać hasło']},
    codedsalt : {type : String, required : true},
    permissions: {type : Boolean, required: true}
});

module.exports = mongoose.model('users', addUserSchema);