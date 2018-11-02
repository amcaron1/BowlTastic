var localStrategy = require('passport-local').Strategy
var db = require("../models");


module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  passport.deserializeUser(function(user, done){
    done(null, user)
  })

  passport.use(new localStrategy(function(username,password,done){
    console.log(username,password)
    db.Employee.findOne({where:{username:username}}).then(user=>{
      if(err){done(err)}
      else{
        if(user){
          var valid = user.comparePassword(password, user.password)
          if (valid){
          done(null,{username:user.username,id:user.id})
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
