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
        // console.log(user.manager)
      if(user==null){done(null)}
      else{
        if(user){
          if (password == user.password){
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
