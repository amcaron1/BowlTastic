module.exports = function(sequelize, DataTypes) {

  var Employee = sequelize.define("Employee", {
    name: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    email:  {
      type: DataTypes.STRING,
      validate: {isEmail: true,}
  }
});



  Employee.associate = function(models) {

    Employee.hasMany(models.Hours, {
      onDelete: "cascade"
    });
    Employee.hasOne(models.Jobs, {
      onDelete: "cascade"
    });
    Employee.hasOne(models.Salary, {
      onDelete: "cascade"
    });
  };


  return Employee;
};
