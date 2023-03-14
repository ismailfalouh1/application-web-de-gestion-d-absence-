const mongoose = require('mongoose');

const filiereSchema = mongoose.Schema({
    filiere :{
        type : String ,
        required : true
    } ,


});

module.exports = mongoose.model ('filiere' , filiereSchema) ;