const mongoose = require('mongoose');

const coursSchema = mongoose.Schema({
    email :{
        type : String ,
        required : true
    } ,
    date :{
        type : String ,
        required : true
    } ,
    semestre :{
        type : String ,
        required : true
    } ,
    filiere :{
        type : String ,
        required : true
    } ,
    module :{
        type : String ,
        required : true
    } ,
    seance :{
        type : String ,
        required : true
    } ,

    etudiants :[{
        nom :{
            type : String ,
            required : true
        } ,
        prenom :{
            type : String ,
            required : true
        } ,
        numApg :{
            type : String,
            required : true
        } ,
        etat :{
            type : String ,
            required : true,
            default : "present"
        } ,
    }] ,


    
    




});

module.exports = mongoose.model ('cours' , coursSchema) ;