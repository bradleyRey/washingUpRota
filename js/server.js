// configuration of the api and the applicxation

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


app.get('/',function(req,res){
  console.log('Listening to request and making a GET request')
  res.send()
})

app.post('/',function(){


})



app.listen(port, function(){
  console.log(`The sever has been initiated on ${port}`)
});
