var express = require('express');
var router = express.Router();
const Modules=require('../models/module');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  Modules.find({} , (error , doc)=>{
  if(error){
    console.log(error);
  }
  res.render('modules', { liste : doc , success: req.session.success , errors : req.session.errors });
  
  
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


router.get('/insert_m', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
    res.render('insert_m', { success: req.session.success , errors : req.session.errors });
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.redirect('/');
  }
});


router.post('/insert_m' , (req, res, next) => {
  
    
  const Module = new Modules({
     nom : req.body.nom
   })
   Module.save((result , error)=>{
     if(error){
       console.log(error);
     }
     else{
       console.log(result);
     }
   })
  res.redirect('/modules');
  
 });


 router.get('/update_m/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
    Modules.find({_id : req.params.id} , (error , doc)=>{
    if(error){
      console.log(error);
    }
    else{
     
        
        res.render('update_m', { liste : doc , success: req.session.success , errors : req.session.errors });
    
    
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



router.post('/update_m' , (req, res, next) => {
  console.log(req.body._id);
    
  
  
  const UpdateModule = {
     nom : req.body.nom
   }
   Modules.updateOne({_id : req.body._id } , {$set : UpdateModule} , (error , doc)=>{
     if(error){
       console.log(error);
     }
     else{
       console.log(doc);
       res.redirect('/modules');
     }
   })
   
  
 
});



router.get('/delete_m/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  console.log(req.params.id);
  Modules.deleteOne({_id : req.params.id} , (error, doc)=>{
    if(error){
      console.log(error);
    }
    console.log(doc);
      
     
    })
  res.redirect('/modules');
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
