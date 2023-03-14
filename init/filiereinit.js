const Filieres = require('../models/filiere');
const mongoose = require('mongoose');


mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/GestionAbs' , { useNewUrlParser: true , useUnifiedTopology: true } , (err)=>{
if(err){ console.log(err);
}

else {
  console.log('connected');
}
});

const Filiere = [ new Filieres({
    filiere : 'INFO 1',
  }),
  new Filieres({
    filiere : 'INFO 2',
  }),

  new Filieres({
    filiere : 'ER 1',
  }),

  new Filieres({
    filiere : 'ER 2',
  }),

  new Filieres({
    filiere : 'TM 1',
  }),

  new Filieres({
    filiere : 'TM 2',
  }),

  new Filieres({
    filiere :  'GODT 1',
  }),

  new Filieres({
    filiere :  'GODT 2',
  }),

  new Filieres({
    filiere :  'GE 1',
  }),

  new Filieres({
    filiere :  'GE 2',
  }),

  new Filieres({
    filiere :  'IDSD 1',
  }),

  new Filieres({
    filiere :  'IDSD 2',
  }),





]

var done=0;

for(var i=0; i<Filiere.length; i++){
  Filiere[i].save((error , doc)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(doc);
      done++;
    }
    if(done === Filiere.length){
        mongoose.disconnect();

    }
  })
};

  