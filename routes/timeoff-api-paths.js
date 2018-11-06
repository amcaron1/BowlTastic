var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment");

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
          .then(response =>{res.send(response)});
      }
      else {
              res.status(403).end()
      }

  })

  app.get("/api/requests", function(req,res){
    sequelize.query("SELECT Timeoffs.id, Timeoffs.start_date, Timeoffs.end_date,Employees.name FROM Timeoffs LEFT JOIN Employees ON Timeoffs.EmployeeId = Employees.id WHERE Timeoffs.approved IS NULL", {type: sequelize.QueryTypes.SELECT})
        .then(function(results) {
            console.log('app.get("/api/timeoffrequests');
            res.json(results)
        })

  })

};
