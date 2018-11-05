var db = require("../models");
var Sequelize = require('sequelize');

module.exports = function(app) {
  app.get("/api/employees", function(req, res) {

    db.Employee.findAll({}).then(function(dbEmployee) {
      console.log(dbEmployee);
      res.send(dbEmployee)
    })

  });
  app.get("/api/currentuser", function(req,res){
    db.Employee.findOne({where:{id:req.user.id}}).then(user=>{
      res.json(user)
    })
  });

  app.get("/api/employees/:id", function(req, res) {

    db.Employee.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  app.post("/api/employees", function(req, res) {
    console.log(req.body)
    db.Employee.create({name:req.body.name,username:req.body.username, email:req.body.email, password:req.body.password,start_date:Sequelize.fn('NOW')}).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  app.post("/api/employees/update", function(req, res) {
    console.log(req.body)
    db.Employee.update({name:req.body.name, username:req.body.username, email:req.body.email, password:req.body.password},{where:{id:req.body.id}}).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  app.post("/api/employees/fired", function(req, res) {
    console.log(req.body)
    db.Employee.update({end_date:Sequelize.fn('NOW')},{where:{id:req.body.id}}).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });


  app.delete("/api/employees/:id", function(req, res) {
    db.Employee.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  })
};
