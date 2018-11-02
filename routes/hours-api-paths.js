var db = require("../models");

module.exports = function(app) {
  app.get("/api/hours", function(req, res) {
    db.Hour.findAll({}).then(function(dbHours) {
      res.json(dbHours);
    });
  });

  app.get("/api/hours/in/:id", function(req,res) {
    console.log("this is the user:",req.user)
      db.Hours.findAll({where: {id: req.params.id}}).then(function(dbHours) {
          res.json(dbHours);
      })
  })

""  app.get("/api/hours/out/:id", function(req,res) {
    db.Hours.findAll({where: {id: req.params.id}}).then(function(dbHours) {
        res.json(dbHours);
        })
    })

    app.post("/api/hours", function(req, res) {
        db.Hours.create(req.body).then(function(dbHours) {
          res.json(dbHours);
        });
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
