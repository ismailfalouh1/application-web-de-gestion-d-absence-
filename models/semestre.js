const mongoose = require('mongoose');

const SemestreSchema = mongoose.Schema({
    semestre :{
        type : String ,
        required : true
    } 

});

module.exports = mongoose.model ('semestre' , SemestreSchema) ;