var express = require('express');
var router = express.Router();
const Filieres=require('../models/filiere');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  Filieres.find({} , (error , doc)=>{
  if(error){
    console.log(error);
  }
  res.render('filieres', { liste : doc , success: req.session.success , errors : req.session.errors });
  
  
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


router.get('/insert_f', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
    res.render('insert_f', { success: req.session.success , errors : req.session.errors });
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.redirect('/');
  }
});


router.post('/insert_f' , (req, res, next) => {
  var now= new Date();
    
 const Filiere = new Filieres({
    filiere : req.body.nom
  })
  Filiere.save((result , error)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(result);
    }
  })
 res.redirect('/filieres');
 
});



router.get('/update_f/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
    Filieres.find({_id : req.params.id} , (error , doc)=>{
    if(error){
      console.log(error);
    }
    else{
     
        
        res.render('update_f', { liste : doc , success: req.session.success , errors : req.session.errors });
    
    
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



router.post('/update_f' , (req, res, next) => {
  console.log(req.body._id);
    
  
  
  const UpdateFiliere = {
     filiere : req.body.nom
   }
   Filieres.updateOne({_id : req.body._id } , {$set : UpdateFiliere} , (error , doc)=>{
     if(error){
       console.log(error);
     }
     else{
       console.log(doc);
       res.redirect('/filieres');
     }
   })
   
  
 
});



router.get('/delete_f/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  console.log(req.params.id);
  Filieres.deleteOne({_id : req.params.id} , (error, doc)=>{
    if(error){
      console.log(error);
    }
    console.log(doc);
      
     
    })
  res.redirect('/filieres');
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
