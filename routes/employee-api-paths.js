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

  app.get("/managercheck", function(req,res){
      if(req.user.manager == 1){
          res.send("1")
      }
      else{
          res.send("1")
      }
  })


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
    db.Employee.create({name:req.body.name,username:req.body.username, password:req.body.password,start_date:Sequelize.fn('NOW')}).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });
  app.put("/api/employees/fired", function(req, res) {
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
