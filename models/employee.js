module.exports = function(sequelize, DataTypes) {

  var Employee = sequelize.define("Employee", {
    name: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
  });

  return Employee;
};
