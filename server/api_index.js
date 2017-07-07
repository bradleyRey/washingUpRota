var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors')
var app         = express();
var mongodb     = require('mongodb');
var path        = require('path');
var cron = require('node-cron');
var nodemailer = require('nodemailer');
var date = new Date();



const MongoClient = require('mongodb').MongoClient;

app.use(express.static(path.resolve(__dirname, '../react', 'build')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname, '../react', 'build', 'index.html'));
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;
//connect to DB using MongoDB
mongodb.MongoClient.connect('mongodb://indigo-brad-wash:bradwashingup@ds151082.mlab.com:51082/washinguprota', (err, database) => {
  if (err) {
    console.log(err)
    process.exit(1);
  }
  db = database;
  console.log('Database connection is ready')
});
var server= app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});


//Retrieve all user details
app.post('/api/getAll',function(req,res){
  db.collection('washingupnames').find().toArray((err,results)=>{
    res.send(results)
  })
});

app.post('/api/yourTurn',function(req,res){
  db.collection('washingupnames').find().toArray((err,results)=>{
    for(i=0;i<results.length;i++){
      if(results[i].turn === 'true'){
        var turn = {turn:results[i].email}
        console.log(turn)
        //sending the email
        //var task = cron.schedule('* * * * MON-FRI', function() {
          let transporter = nodemailer.createTransport({
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          auth: {
            user: turn.turn,
            pass: "Yuwa43230"
            }
          })
        let mailOptions = {
          from: turn.turn,
          to: turn.turn,
          subject: 'Washing Up Time!, This is a test email and should only be sent to me. If youve receievd this let me know',
          text: '',
          html: '<b>Washing Up Time! (Test)</b>'+ turn.turn
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          } else {
            console.log('Message' + info.messageId + 'sent:' + info.response)}});
        //task.stop()

        //means "Update One entry where email equals results[i].email"
        var dbQuery = {
          email: results[i].email
        }
        //need to create a new object based on the one from the DB so we are just updating the object, not ovewrwriting it
        updatedObject = Object.assign({}, results[i], {turn: 'false'});

        db.collection('washingupnames').updateOne(dbQuery,updatedObject,function(err,res){
          if(err) throw(err)
          console.log('updated persons turn from true to false')
        })
        console.log(results[i])
        if()
        dbQueryNextPerson={
          id: results[i+1].id,
        }
        updatedObjectNextPerson = Object.assign({}, results[i+1], {turn:'true'})

        dbQueryLastPerson={
          id:results[results.length - 1].id
        }
        updatedObjectFirstPerson = Object.assign({}, results[0], {turn:'true'})

      //  console.log(dbQueryNextPerson)
      //changes the next person in the list to be sent an email by turning them to true
      if(result[i].id === results[results.length - 1].id){
        db.collection('washinguprota').updateOne(dbQueryLastPerson,updatedObjectFirstPerson,function(err,res){
          if(err)throw(err)
          console.log('Reached the last peson, resetting to the first')
        })}
      else {
        db.collection('washingupnames').updateOne(dbQueryNextPerson,updatedObjectNextPerson,function(err,res){
          if(err)throw(err)
          console.log('updated the next person from false to true')
        })
      }

        //updating from true to false
        //task.start()

        //})
      //  break;

        res.send(results[i].email)
      }
    }
  })
})
