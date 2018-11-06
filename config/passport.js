var localStrategy = require('passport-local').Strategy;
var db = require("../models");
const bcrypt = require("bcrypt");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  });
  passport.deserializeUser(function(user, done){
    done(null, user)
  });

  passport.use(new localStrategy(function(username,password,done){
    console.log(username,password);
    db.Employee.findOne({where:{username:username}}).then(user=>{
      if(user==null){done(null)}
      else{
        if(user){

          if (bcrypt.compareSync(password, user.password) === true){
          done(null,{username:user.username,id:user.id, manager:user.manager})
          }
          else{
            done(null,false)
          }
        }
        else{
          done(null,false)
        }
      }
    })
  }))
}
