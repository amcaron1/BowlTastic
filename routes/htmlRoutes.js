var db = require("../models");
const path = require("path");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  // Load example page and pass in an example by id
  app.get("/employee", function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'employee.html'));
  });

  app.get("/manager", function(req, res) {
      if (req.user.manager) {
          res.sendFile(path.join(__dirname, '../public', 'manager.html'));
      }
      else {
          res.status(403).end()
      }
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status(404);
    res.end();
  });
};
