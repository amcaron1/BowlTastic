var db = require("../models");

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
    res.sendFile(path.join(__dirname, '../public', 'manager.html'));
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
