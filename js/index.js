'use strict'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var cron = require('node-cron');
var nodemailer = require('nodemailer');
var date = new Date();

const sendEmail = () => {
var task = cron.schedule('10 16 * * MON-FRI', function() {

      /*var newobject = {
        "team": [{
            "email": "alex@indigo-river.com",
            "turn": false
          },
          {
            "email": "andrew.p@indigo-river.com",
            "turn": false
          },
          {
            "email": "andy@indigo-river.com",
            "turn": false
          },
          {
            "email": "bradley@indigo-river.com",
            "turn": true
          },
          {
            "email": "jack@indigo-river.com",
            "turn": false
          },
          {
            "email": "jay.indigo-river.com",
            "turn": false
          },
          {
            "email": "james@indigo-river.com",
            "turn": false
          },
          {
            "email": "chris@indigo-river.com",
            "turn":false
          },
          {
            "email": "emma@indigo-river.com",
            "turn":false
          },
          {
            "email":"guneet@indigo-river.com",
            "turn":false
          },
          {
            "email":"jack@indigo-river.com",
            "turn":false
          },
          {
            "email":"jay@indigo-river.com",
            "turn":false
          },
          {
            "email":"james@indigo-river.com",
            "turn":false
          },
          {
            "email": "michael@indigo-river.com",
            "turn": false
          },
          {
            "email": "ravina@indigo-river.com",
            "turn": false
          },
          {
            "email": "ricardo@indigo-river.com",
            "turn": false
          },
          {
            "email": "russ@indigo-river.com",
            "turn": false
          },
          {
            "email": "sarah@indigo-river.com",
            "turn": false
          },
        ]
      };*/



      let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: "bradley@indigo-river.com",
          pass: "Yuwa43230"
        }
      });

      for (var i = 0, l = newobject.team.length; i < l; i++) {

        var sentObj = newobject.team[i].turn;
        var emailobj = newobject.team[i].email;
        if (sentObj === false) {
          //continue;
        } else {
          console.log("Found the next person to do the washing up!, today it is" + emailobj);
          //var emailobj = newobject[i].team.email;
          let mailOptions = {
            from: '"Bradley Reynolds - Price" <bradley@indigo-river.com>',
            to: emailobj,
            subject: 'Washing Up Time!',
            text: 'Hi all, its that time of the day where someone needs to wash up! It will be ${names} today on ' + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            html: '<b>Washing Up Time! (TESTING)</b>'
          };
          //newobject.team[i].turn = false;
          //newobject.team[i + 1].turn = true;
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            } else {
              console.log('Message' + info.messageId + 'sent:' + info.response);
              //arrayItem.sent = false;
            };
          });
        break};
      }
    });

  task.start();
  task.stop();
}
