const Seances = require('../models/seance');
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

const Seance = [ new Seances({
    seance : '8h30-10h',
  }),
  new Seances({
    seance : '10h30-12h',
  }),

  new Seances({
    seance : '14h30-16h',
  }),

  new Seances({
    seance : '16h30-18h',
  }),

]

var done=0;

for(var i=0; i<Seance.length; i++){
  Seance[i].save((error , doc)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(doc);
      done++;
    }
    if(done === Seance.length){
        mongoose.disconnect();

    }
  })
};

