var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bowltastic@gmail.com  ',
        pass: 'umnbootcamp'
    }
});

// Needed for raw sequelize commands
var sequelize  = db.sequelize;


module.exports = function(app) {
  app.post("/api/timeoff", function(req,res){
      db.Timeoff.create({start_date:req.body.date1, end_date:req.body.date2, EmployeeId:req.user.id}).then(response =>{
          console.log(response)
          console.log(req.user)
          res.send(response).end()

      })
  })
  app.post("/api/confirm/:requestid/:bool", function(req,res){
      if(req.user.manager) {
          let id = req.params.requestid;
          let bool = req.params.bool;

          db.Timeoff.update({approved: bool}, {where: {id: id}})
          .then(results =>{

              res.send(results)

              sequelize.query("SELECT Timeoffs.id, Timeoffs.approved, Timeoffs.start_date, Timeoffs.end_date, Employees.name, Employees.email FROM Timeoffs LEFT JOIN Employees ON Timeoffs.EmployeeId = Employees.id WHERE Timeoffs.id = " + req.params.requestid, {type: sequelize.QueryTypes.SELECT}).then(response=>{
                  console.log(response[0].email);
              if (response[0].approved == 1) {
                  var answer = "approved";
              }
              else if (response[0].approved == 0) {
                  var answer = "denied";
              }

              if (response[0].start_date == response[0].end_date) {
                  var dates = response[0].start_date;
              }
              else {
                  var dates = response[0].start_date + " to " + response[0].end_date;
              }

              var subject = "Your absence request has been " + answer;
              var message = response[0].name + ",\n" +
                   "Your absence request for " + dates + " has been " + answer + ".";

              transporter.sendMail({
              from: 'bowltastic@gmail.com',
              to: response[0].email,
              subject: subject,
              text: message
          })
        });
        });
      }
      else {
              res.status(403).end()
      }
      // Translate results.approved into text

  })

  app.get("/api/requests", function(req,res){
    sequelize.query("SELECT Timeoffs.id, Timeoffs.start_date, Timeoffs.end_date, Employees.name FROM Timeoffs LEFT JOIN Employees ON Timeoffs.EmployeeId = Employees.id WHERE Timeoffs.approved IS NULL", {type: sequelize.QueryTypes.SELECT})
        .then(function(results) {
            console.log('app.get("/api/timeoffrequests');
            res.json(results)
        })

  })

};
