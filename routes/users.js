var express = require('express');
var router = express.Router();
const Users=require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  Users.find({} , (error , doc)=>{
  if(error){
    console.log(error);
  }
  
  res.render('utilisateurs', { liste : doc , success: req.session.success , errors : req.session.errors 
  });
  
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

router.get('/insert_u', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
    res.render('insert_u', { success: req.session.success , errors : req.session.errors });
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.redirect('/');
  }
});


router.post('/insert_u' , (req, res, next) => {
  const now= new Date();
    
 const User = new Users({
    nom : req.body.nom,
    prenom : req.body.prenom,
    email : req.body.email,
    password : req.body.password,
    role : req.body.role,
    date : now
  })
  User.save((result , error)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(result);
    }
  })
 res.redirect('/utilisateurs');
 
});

router.get('/update_u/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
    Users.find({_id : req.params.id} , (error , doc)=>{
    if(error){
      console.log(error);
    }
    else{
     
        
        res.render('update_u', { liste : doc , success: req.session.success , errors : req.session.errors });
    
    
    }
    
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


router.post('/update_u' , (req, res, next) => {
  console.log(req.body._id);
    
  
  
  const UpdateUser = {
    nom : req.body.nom,
    prenom : req.body.prenom,
    email : req.body.email,
    password : req.body.password,
    role : req.body.role
   }
   Users.updateOne({_id : req.body._id } , {$set : UpdateUser} , (error , doc)=>{
     if(error){
       console.log(error);
     }
     else{
       console.log(doc);
       res.redirect('/utilisateurs');
     }
   })
   
  
 
});


router.get('/delete_u/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  console.log(req.params.id);
  Users.deleteOne({_id : req.params.id} , (error, doc)=>{
    if(error){
      console.log(error);
    }
    console.log(doc);
      
     
    })
  res.redirect('/utilisateurs');
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
