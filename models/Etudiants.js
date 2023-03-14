const mongoose = require('mongoose');

const etudiantSchema = mongoose.Schema({
    nom :{
        type : String ,
        required : true
    } ,
    prenom :{
        type : String ,
        required : true
    } ,
    numApg :{
        type : String ,
        required : true ,
    } ,
    Date_naissance :{
        type : String ,
        required : true
    } ,
    filiere :{
        type : String ,
        required : true
    } ,



});

module.exports = mongoose.model ('Etudiants' , etudiantSchema) ;