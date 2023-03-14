var express = require('express');
var router = express.Router();
const Users=require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
 
  if(req.session.success){
    if(req.session.User==="administrateur"){
  res.redirect('/home');
    }
   else if(req.session.User==="professeur"){
      res.redirect('/home_p');
        }
}
  else{
    res.render('index', {});

  }

  
});


router.post('/login', function(req, res, next) {
  
  Users.find({email : req.body.email} , (error , doc)=>{
    if(doc.length === 1){
    if (doc[0].password === req.body.password){
      req.session.success = true;
      req.session.User= doc[0].role;
      req.session.Email= doc[0].email;
      
      
      if(req.session.User==="administrateur"){
        res.redirect('/home');
          }
          if(req.session.User==="professeur"){
            res.redirect('/home_p');
              }
      
      
    }
    else{
      req.session.success = false;
      res.redirect('/');
    }
  }
    else{
      req.session.success = false;
      res.redirect('/');
    }
    
});
  
});


router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');

  
});


module.exports = router;
