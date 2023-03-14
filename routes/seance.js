var express = require('express');
var router = express.Router();
const Cours=require('../models/cours');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="professeur"){
  Cours.find({email : req.session.Email} , (error , doc)=>{
  if(error){
    console.log(error);
  }
  res.render('seances', { liste : doc , success: req.session.success , errors : req.session.errors });
  
  
});
    
    
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
