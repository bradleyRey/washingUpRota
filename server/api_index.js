var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors')
var app         = express();
var mongodb     = require('mongodb');
var path        = require('path');
var cron = require('node-cron');
var nodemailer = require('nodemailer');
var date = new Date();


// Starting the Mongo Database
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


//Retrieve the selected person which will send them an email tellig them its their turn to wash up
  app.post('/api/yourTurn',function(req,res){
    var task = cron.schedule('*/1 * * * MON-FRI', function() {
    db.collection('washingupnames').find().toArray((err,results)=>{
      //console.log(results)
      for(i=0;i<results.length;i++){
        if(results[i].turn === 'true'){
         var turn = {turn:results[i].email}
         var names = {name:results[i].name}
        // console.log('helooo',names)
          //sending the email by a cron job
          console.log('script works at this point ')
            console.log('Cron activated! Firing script...')
        let transporter = nodemailer.createTransport({
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          auth: {
            user: 'bradley@indigo-river.com',
            pass: ""
            }
          })
        let mailOptions = {
          from: 'bradley@indigo-river.com',
          to: turn.turn,
          subject: 'Washing Up Time!, This is a test email.',
          text: '',
          html: '<b>Washing Up Time! (Test)</b>'+ turn.turn
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          } else {
            console.log('Message' + info.messageId + 'sent:' + info.response)}});
        //task.stop()

        // To check the size of the list being used
        var resultsLen = results.length
        console.log(`There are ${resultsLen} documents in the database`)
        var catchLast = results.length
        //Update One entry where the email query matches the position in in the loop (results[i].email)
        console.log(results)
        var dbQuery = {
          email: results[i].email
        }
        //A query to find the last person in the array ready to reset the
        var dbQueryLastPerson={
          id:results[results.length - 1].id
        }
        //Query to find the first person in the array
        var dbQueryFirstPerson={
          id:results[0].id
        }
        //need to create a new object based on the one from the DB so we are just updating the object, not ovewrwriting it
        updatedObject = Object.assign({}, results[i], {turn: 'false'});
        // Turning the next person in the object from false to true
        updatedObjectNextPerson = Object.assign({}, results[i+1], {turn:'true'})
        //Turning the first document in the db from false to true
        updatedObjectFirstPerson = Object.assign({}, results[0], {turn:'true'})
        //Turns the last person in the array from true to false
        updatedObjectLastPerson= Object.assign({},results[results.length-1],{turn:'false'})
        // Updates the next person in the array from true to false
        db.collection('washingupnames').updateOne(dbQuery,updatedObject,function(err,res){
          if(err) throw(err)
          console.log('updated persons turn from true to false')
        })
        //changes the next person in the list to be sent an email by turning them to true
        console.log('test1',results[i].id)
        console.log('test2',results[results.length -1 ].id)

        if(results[i].id === results[results.length -1 ].id){
          console.log('working')
          //Updating the last person in the array from true to false and the first person from false to true, resetting the loop
          db.collection('washingupnames').updateOne(dbQueryFirstPerson,updatedObjectFirstPerson,function(err,res){
          if(err)throw(err)
            console.log('Updated the first person to true')
            })
          }
          else {
          //A query to select the next person in the array - its only in the else to stop it from being defined when there isnt a next person (end of the array)
          var dbQueryNextPerson={
            id:results[i+1].id
          }
          //Updating the next person in the array from true to false
          db.collection('washingupnames').updateOne(dbQueryNextPerson,updatedObjectNextPerson,function(err,res){
            if(err)throw(err)
            console.log('updated the next person from false to true')
          })
        }
        //break;
        }
      }
    })
    task.start()

  })
})

//Retrieve the next person in the array to display whos turn it is to wash up on the next day

app.post('/api/nextDay',function(req,res){
  db.collection('washingupnames').find().toArray((err,results)=>{
    for(i=0;i<results.length;i++){
      if(results[i].turn === 'true'){
        if(results[i].id ===  results[results.length -1 ].id){
          console.log(results[0].name)
          res.send(results[0].name)
        }
        else{
          console.log(results[i].name)
          res.send(results[i].name)
        }
      }
    }
  })
})




// Display cuerrent persons day on front end

app.post('/api/currentDay',function(req,res){
  db.collection('washingupnames').find().toArray((err,results) =>{
    for(i=0;i<results.length;i++){
      if(results[i].turn === 'true'){
        res.send(results[i-1].name)
      }
    }
  })
})
