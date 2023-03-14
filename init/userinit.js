const Users = require('../models/users');
const mongoose = require('mongoose');


mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/GestionAbs' , { useNewUrlParser: true , useUnifiedTopology: true } , (err)=>{
if(err){
   console.log(err);
}
else {
  console.log('connected');
}
});

const User = [ new Users({
    email : 'admin@gmail.com',
    nom : 'admin',
    prenom : 'admin',
    password : '123456',
    role : 'administrateur',
    date : new Date(),
  }),
  new Users({
    email : 'professeur@gmail.com',
    nom : 'professeur',
    prenom : 'professeur',
    password : '123456',
    role : 'professeur',
    date : new Date(),
  }),

  





]

var done=0;

for(var i=0; i<User.length; i++){
  User[i].save((error , doc)=>{
    if(error){
      console.log(error);
      console.log('ici *********************');
    }
    else{
      console.log(doc);
      done++;
    }
    if(done === User.length){
        mongoose.disconnect();

    }
  })
};

  