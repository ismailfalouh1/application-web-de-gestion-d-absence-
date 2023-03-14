const mongoose = require('mongoose');

const seanceSchema = mongoose.Schema({
    seance :{
        type : String ,
        required : true
    } ,


});

module.exports = mongoose.model ('seance' , seanceSchema) ;