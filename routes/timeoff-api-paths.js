var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment");


module.exports = function(app) {
  app.post("/api/timeoff", function(req,res){
      db.Timeoff.create({start_date:req.body.date1, end_date:req.body.date2, EmployeeId:req.user.id}).then(response =>{
          console.log(response)
          console.log(req.user)
          res.send(response).end()

      })
  })
  app.post("/api/confirm/:requestid/:bool", function(){
      if(req.user.manager) {
          let id = req.params.requestid;
          let bool = req.params.bool;
          db.Timeoff.update({approved: bool}, {where: {id: id}})
      }
      else {
              res.status(403).end()
      }

  })

  app.get("/api/timeoffrequests", function(req,res){
      db.Timeoff.findAll({where:{approved:NULL}}).then(results=>{
          res.json(results)
      })

  })

};
