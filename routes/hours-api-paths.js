var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment");

module.exports = function(app) {
  app.post("/api/gethours", function(req, res) {
      db.Hour.findAll({
          where: {
              createdAt: {
                  [Op.between]: [moment(req.body.date1).format("YYYY-MM-DD HH:mm:ss"),moment(req.body.date2).format("YYYY-MM-DD HH:mm:ss")]
              },
              EmployeeId:req.user.id
          }
      }).then(response=>{
          if (response[0] === undefined) {
              console.log("response empty")
              res.send('No results returned for that time period.').end();
          }
          else{
              console.log("response full")
              res.send(response);
          }

      });
  });


    app.post("/api/hours", function(req, res) {
      console.log(req.user);
      db.Hour.findAll({limit:1,where:{EmployeeId:req.user.id},order:[ [ 'createdAt', 'DESC' ]]}).then(user=>{
        console.log(user);
        try {
            if (user[0].dataValues.timeout == null) {
                var currentid = user[0].dataValues.id;
                db.Hour.update({timeout: Sequelize.fn('NOW')}, {where: {id: currentid}});
                res.send("You have clocked out at : ")
            }
            else{
                db.Hour.create({timein: Sequelize.fn('NOW'), EmployeeId: req.user.id});
                res.send("You have clocked in at : ")
            }
        }
        catch(err){
            db.Hour.create({timein: Sequelize.fn('NOW'), EmployeeId: req.user.id});
            res.send("You have clocked in at : ")
        }
      })
    });

    app.delete("/api/hours/delete/:id", function(req, res) {
        db.Hour.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(dbHours) {
        res.json(dbHours);
        });
    });
};
