// Dependencies
var db = require("../models");
var sequelize  = db.sequelize
var moment = require('moment');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bowltastic@gmail.com  ',
        pass: 'umnbootcamp'
    }
});

module.exports = function(app) {

  // Payroll
  // Client side '/pay' is on Heroku Temporize Scheduler add-on
  app.get("/pay", function(req, res) {

    // Each record represents one shift
    // Returns id, name, email, pay_rate, and shift (number of hours for that shift)
    sequelize.query("SELECT employees.id, employees.name, employees.email, salaries.pay_rate, SUM(TIME_TO_SEC(TIMEDIFF(hours.timeout, hours.timein))/3600) AS total_hours FROM employees LEFT JOIN hours ON employees.id = hours.EmployeeId LEFT JOIN salaries ON employees.id = salaries.EmployeeId WHERE (employees.end_date < '1969-00-00' OR employees.end_date IS NULL) AND (salaries.end_date < '1969-00-00' OR salaries.end_date IS NULL) AND hours.timein > DATE_SUB(NOW(), INTERVAL 7 DAY) GROUP BY employees.id ORDER BY employees.id ASC", {type: sequelize.QueryTypes.SELECT})
      .then(function(results) {

        // Email variables
        var name = "";
        var email = "";
        var period = moment().subtract(7, 'days').format("l") + " - " + moment().format("l");
        var message = "";

        // Variables for calculating hours, wages, taxes, and payment
        var fed_rate = 0.10;
        var state_rate = 0.0535;
        var ss_rate = 0.062;
        var mc_rate = 0.029;
        var total_hours = 0;
        var gross_wages = 0;
        var fed_tax = 0;
        var state_tax = 0;
        var ss_tax = 0;
        var mc_tax = 0;
        var payment = 0;

        // Loops through the SELECT results
        // Calculates gross_wages, taxes, and payment
        // Creates email message
        // Sends email
        for (var i = 0; i < results.length; i++) {

          name = results[i].name;
          pay_rate = Number(results[i].pay_rate);
          total_hours = Number(results[i].total_hours);
          gross_wages = total_hours * pay_rate;
          fed_tax = (gross_wages * fed_rate).toFixed(2);
          state_tax = (gross_wages * state_rate).toFixed(2);
          ss_tax = (gross_wages * ss_rate).toFixed(2);
          mc_tax = (gross_wages * mc_rate).toFixed(2);
          payment = (gross_wages - fed_tax - state_tax - ss_tax - mc_tax).toFixed(2);
          total_hours = total_hours.toFixed(2);
          gross_wages = gross_wages.toFixed(2);

          email = results[i].email;
          message = "Name: " + name + "\n" +
                    "Total Hours: " + total_hours + "\n" +
                    "Gross Wages: " + gross_wages + "\n" +
                    "Federal Tax: " + fed_tax + "\n" +
                    "State Tax: " + state_tax + "\n" +
                    "Social Security Tax: " + ss_tax + "\n" +
                    "Medicare Tax: " + mc_tax + "\n" +
                    "Payment: " + payment;

          transporter.sendMail({
            from: 'bowltastic@gmail.com',
            to: email,
            subject: 'Bowltastic Payment Stub for ' + period,
            text: message
          });
        }
        console.log(results);
    })

    // End connection
    res.end();
  })
}