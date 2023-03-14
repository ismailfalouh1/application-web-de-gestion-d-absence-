const Semestres = require('../models/semestre');
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

const Semestre = [ new Semestres({
    semestre : 'S1',
  }),
  new Semestres({
    semestre : 'S2',
  }),

  new Semestres({
    semestre : 'S3',
  }),

  new Semestres({
    semestre : 'S4',
  }),

]

var done=0;

for(var i=0; i<Semestre.length; i++){
  Semestre[i].save((error , doc)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(doc);
      done++;
    }
    if(done === Semestre.length){
        mongoose.disconnect();

    }
  })
};

