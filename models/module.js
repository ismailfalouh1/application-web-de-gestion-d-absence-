const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    nom :{
        type : String ,
        required : true
    } ,


});

module.exports = mongoose.model ('module' , moduleSchema) ;