var express = require('express');
var router = express.Router();
const Users=require('../models/users');
const Etudiants=require('../models/Etudiants');
const Filieres=require('../models/filiere');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  var nombre={users:0, etud:0, fil:0};
  function nombreetud(){
    Etudiants.count({}, function(err, count){
      console.log("etud: "+count);
     nombre.etud = count;
     
  })
    }

    nombreetud();
    function nombreuser(){
      Users.count({}, function(err, count){
        console.log("user: "+count);
        nombre.users = count;
       
    })
      }
      nombreuser();

      nombreetud();
    function nombrefil(){
      Filieres.count({}, function(err, count){
        console.log("fil: "+count);
        nombre.fil = count;
       
    })
      }
      nombrefil();
      Users.find({}, function (err, result) {

        if (err) {

            console.log(err);

        } else {
          
          console.log(result[0].nom);

            res.render('home', {liste : nombre , latest_user : result, i : 0});

        }

    }).sort({date: 'desc'});
  }
  else{
    res.redirect('/');

  }
    

  }

  else{
    res.redirect('/');

  }
    
  
});



module.exports = router;
