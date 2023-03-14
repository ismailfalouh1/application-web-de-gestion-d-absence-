var express = require('express');
var router = express.Router();
const Seances=require('../models/seance');
const Filieres=require('../models/filiere');
const Modules=require('../models/module');
const Semestres=require('../models/semestre');
const Etudiants=require('../models/Etudiants');
const Cours=require('../models/cours');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.success){
        if(req.session.User==="professeur"){
      Filieres.find({} , (error , doc)=>{
        if(error){
          console.log(error);
        }
        else{
          Seances.find({} , (error , docc)=>{
            if(error){
              console.log(error);
            }
          else{
            Modules.find({} , (error , doccc)=>{
              if(error){
                console.log(error);
          }
            else{
              Semestres.find({} , (error , docccc)=>{
                if(error){
                  console.log(error);
                }
                
                res.render('generate-manuel', { liste_f : doc , liste_seance : docc , liste_module : doccc , liste_semestre : docccc , success: req.session.success , errors : req.session.errors });
            });
          }
        });
      }
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

router.post('/', function(req, res, next) {
    var now= new Date();
    var i,id,url;
    function etud(){
    Etudiants.find({filiere : req.body.filiere} , (error , doc)=>{
     if(error){
       console.log(error);
     }
     
     
     else{
       const cours = new Cours({
         email : req.session.Email,
         date : now,
         semestre : req.body.semestre,
         filiere : req.body.filiere,
         module : req.body.module,
         seance : req.body.seance,
         
         
         
         etudiants: doc,

      
         
       })
       cours.save((error , result)=>{
         
         if(error){
           console.log(error);
         }
         else{
           console.log(result);
           id=result._id;
         }
         
       })
     }
     
   });
 }
 etud();
 

   
     
  

  //res.render('absence',{url : url, i : i, id : id});
  setTimeout(function(){ res.redirect('generate-manuel/absence/'+id); }, 1000);

   
  });

router.get('/absence/:id', function(req, res, next) {
    if(req.session.success){
      if(req.session.User==="professeur"){
    Cours.find({ _id : req.params.id} , (error , doc)=>{
      if(error){
        console.log(error);
      }
      else{
        res.render('absence-manuel', { liste : doc[0].etudiants, id : doc[0]._id });
        
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

  router.post('/absence' , (req, res, next) => {
    Cours.updateOne({ _id : req.body._id, "etudiants._id" : req.body.id} , {$set: {"etudiants.$.etat": req.body.etat}}, (error , doc)=>{
      if(error){
        console.log(error);
      }
      else{
        console.log(doc);
        res.redirect('/generate-manuel/absence/'+req.body._id);
  
          
        
       
        
        
      }
    
     // console.log("hahaha : "+a);
      
      
    });
   
      
    
    
   
    
   
  });

module.exports = router;
