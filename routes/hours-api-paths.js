var db = require("../models");
var Sequelize = require('sequelize');

module.exports = function(app) {
  app.get("/api/hours", function(req, res) {
    db.Hour.findAll({where:{EmployeeId:req.user.id}}).then(function(dbHours) {
      res.json(dbHours);
    });
  });


    app.post("/api/hours", function(req, res) {
      console.log(req.user)
      db.Hour.findAll({limit:1,where:{EmployeeId:req.user.id},order:[ [ 'createdAt', 'DESC' ]]}).then(user=>{
        console.log(user)
        if(user[0].dataValues.timeout == null){
          var currentid = user[0].dataValues.id
          db.Hour.update({timeout:Sequelize.fn('NOW')},{where:{id:currentid}})
          res.send("You have clocked out at : ")
        }
        else{
          db.Hour.create({timein:Sequelize.fn('NOW'),EmployeeId:req.user.id})
          res.send("You have clocked in at : ")
        }
      })
    });

    app.delete("/api/hours/delete/:id", function(req, res) {
        db.Hours.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(dbHours) {
        res.json(dbHours);
        });
    });
}
