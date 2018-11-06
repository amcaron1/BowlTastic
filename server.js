require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var db = require("./models");
var passport = require("passport");
var bcrypt = require("bcrypt")
var auth = require("./routes/auth.js")(passport);

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({secret:"thesecret", saveUninitialized:false, resave:false}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

// Routes

require("./routes/payroll.js")(app);
app.use("/", auth)

require("./routes/employee-api-paths")(app);
require("./routes/hours-api-paths")(app);
require("./routes/htmlRoutes")(app);
require("./routes/timeoff-api-paths")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
<<<<<<< HEAD

=======
db.Employee.findAll({}).then(response=>{
        for(let i in response){
            var hash = bcrypt.hashSync(response[i].dataValues.password, 10);

            db.Employee.update({password:hash},{where:{id:response[i].dataValues.id}})

        }
});
>>>>>>> d0c3c0a34b4fefe0cb4488637ad2072eee9d2d32
module.exports = app;
