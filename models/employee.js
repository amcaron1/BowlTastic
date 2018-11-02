module.exports = function(sequelize, DataTypes) {

  var Employee = sequelize.define("Employee", {
    name: {type: DataTypes.STRING, allowNull:false},
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    email:  {
      type: DataTypes.STRING,
      validate: {isEmail: true,}
  },
    username: {type: DataTypes.STRING, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},

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
