var db = require("../models");
const path = require("path");
var express = require("express");
var router = express.Router();

  // Load index page
module.exports = function(passport){
  router.post('/login', passport.authenticate('local', {
          failureRedirect: '/',
          successRedirect: '/employee',
      }), function (req, res) {
          res.send('hey')
      })
      return router;
}
