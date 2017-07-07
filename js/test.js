
/*
var date = new Date()

console.log('The date is ' + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear())


var names = ["alex@indigo-river.com","andrew.p@indigo-river.com","andy@indigo-river.com","bradley@indigo-river.com","chris@indigo-river.com","emma@indigo-river.com","guneet@indigo-river.com","jack@indigo-river.com","jay@indigo-river.com","james@indigo-river.com","michael@indigo-river.com","ravina@indigo-river.com","ricardo@indigo-river.com","russ@indigo-river.com","sarah@indigo-river.com"]

for (i=0 ; i < names.length ; i++) {


  console.log(names[i])
}




function mail(testObj){
  for(var key in testObj){
    if(testObj.hasOwnProperty(key)){
      var value = testObj[key];
      console.log(value);
      mail(value);
    }
  }

}
mail(testObj)



var random ={ "team": [
     {"email":"yolo@me","sent":true},
     {"email":"hello@me","sent":false},
     {"email":"hello@me","sent":true}
   ]
};

var testObj = { "team": [
  {"email": "alex@indigo-river.com", "sent": false},
  {"email": "andrew.p@indigo-river.com", "sent": false},
  {"email" : "andy@indigo-river.com", "sent": false},
  { "email": "bradley@indigo-river.com", "sent": false},
  { "email": "andrew@indigo-river.com", "sent": false},
  { "email": "andrew@indigo-river.com", "sent": false},
  { "email": "andrew@indigo-river.com", "sent": false},
  { "email": "jack@indigo-river.com", "sent": false},
  { "email": "jay.indigo-river.com", "sent": false},
  { "email": "james@indigo-river.com", "sent": true},
  { "email": "michael@indigo-river.com", "sent": false},
  { "email": "ravina@indigo-river.com", "sent": false},
  {"email": "ricardo@indigo-river.com", "sent": false},
  { "email": "russ@indigo-river.com", "sent": false},
  { "email": "sarah@indigo-river.com", "sent": false},
]};

//JSON.parse(testObj);

var testObj2 = testObj.map(function(item){
  testObj.sent = false;
  return item

});
//console.log(testObj)
//console.log(testObj2)

console.log(testObj.team[1].email);

/*for (var key in testObj.team) {

  //if(!testObj.hasOwnProperty(key)) continue;
  //console.log(key)
  var obj = testObj.team[key].sent;
  console.log(key + " " + obj)
  for(var sends in obj) {
    console.log(sends);
    //if(obj === true) {
    //if(obj.sent[sends] === false) {

      //obj.sent[sends] = true;
//}

      //var testObj3 = testObj.map(function(item){
      //  test.

    //  break;



    }
  }

  for(var i=0, l=testObj.team.length; i<l; i++ ) {
    var sentObj = testObj.team[i].sent
    var emailobj = testObj.team[i].email
    if (sentObj === false) {
      continue;

    }
    else{
      console.log(`It's ${emailobj}'s turn to do the washing up`)
    }


    //console.log(sentObj);

    team.map(function(turn,0){
        var team2 = {};
        team2[sent.turn] = false

    })
}*/






var nodemailer = require('nodemailer');
var date = new Date();

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user:"bradley@indigo-river.com",
    pass: 'Yuwa43230'
  }

});


let mailOptions = {
  from:'"Bradley Reynolds - Price" <bradley@indigo-river.com>',
  to: "bradley@indigo-river.com",
  subject: 'Washing Up Time!',
  text: 'Hi all, its that time of the day where someone needs to wash up! It will be ${names} today on ' +  date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(),
  html: '<b>Washing Up Time!</b>'
  };



transporter.sendMail(mailOptions,(error,info) => {
  if(error) {
    return console.log(error)
  }
  console.log("Message: " + info.messageId + "Sent: " + info.response)
})
