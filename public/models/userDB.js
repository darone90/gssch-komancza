const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addUserSchema = new Schema({
    codeOne : {type : String, required : true},
    codeTwo : {type : String, required : true},
    codeThree: {type : Boolean, required: true}
});

module.exports = mongoose.model('users', addUserSchema);