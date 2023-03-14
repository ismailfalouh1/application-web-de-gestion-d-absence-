var express = require('express');
var router = express.Router();
const Etudiants=require('../models/Etudiants');
const Filieres=require('../models/filiere');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  Etudiants.find({} , (error , doc)=>{
  if(error){
    console.log(error);
  }
  res.render('etudiants', { liste : doc , success: req.session.success , errors : req.session.errors });
  
  
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


router.get('/insert', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  Filieres.find({} , (error , doc)=>{
    if(error){
      console.log(error);
    }
    console.log(doc);
    res.render('insert', { liste_f: doc , success: req.session.success , errors : req.session.errors });
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

router.post('/insert_e' , (req, res, next) => {

  
  const Etudiant = new Etudiants({
     nom : req.body.nom,
     prenom : req.body.prenom,
     numApg : req.body.numapg,
     Date_naissance : req.body.date_naissance,
     filiere : req.body.filiere
     
   })
 
   Etudiant.save((result , error)=>{
     if(error){
       console.log(error);
     }
     else{
       console.log(result);
     }
   })
  res.redirect('/etudiants');
  
 });



 router.get('/update/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
    Etudiants.find({_id : req.params.id} , (error , doc)=>{
    if(error){
      console.log(error);
    }
    else{
      Filieres.find({} , (error , docc)=>{
        if(error){
          console.log(error);
        }
        
        res.render('update', { liste : doc , liste_f : docc , success: req.session.success , errors : req.session.errors });
    });
    
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


router.post('/update' , (req, res, next) => {
      

  const UpdateEtudiant = {
     nom : req.body.nom,
     prenom : req.body.prenom,
     numApg : req.body.numapg,
     Date_naissance : req.body.date_naissance,
     filiere : req.body.filiere
   }
  

   Etudiants.updateOne({_id : req.body._id } , {$set : UpdateEtudiant} , (error , doc)=>{
     if(error){
       console.log(error);
     }
     else{
       console.log(doc);
       res.redirect('/etudiants');
     }
   })
   
  
 
});


router.get('/delete/:id', function(req, res, next) {
  if(req.session.success){
    if(req.session.User==="administrateur"){
  console.log(req.params.id);
  Etudiants.deleteOne({_id : req.params.id} , (error, doc)=>{
    if(error){
      console.log(error);
    }
    console.log(doc);
      
     
    })
  res.redirect('/etudiants');
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
