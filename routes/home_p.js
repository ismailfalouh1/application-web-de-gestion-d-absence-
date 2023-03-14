var express = require('express');
var router = express.Router();
const Cours=require('../models/cours');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="professeur"){
  var nombre={cours:0};
  function nombrese(){
    Cours.count({}, function(err, count){
      console.log("etud: "+count);
     nombre.cours = count;
     
  })
    }

    nombrese();
    
      Cours.find({}, function (err, result) {

        if (err) {

            console.log(err);

        } else {
          

            res.render('home_p', {liste : nombre , latest_user : result, i : 0});

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
