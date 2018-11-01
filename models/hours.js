module.exports = function(sequelize, DataTypes) {

    var Hours = sequelize.define("Hours", {
      punch_time: DataTypes.DATE,
      punch_type: DataTypes.BOOLEAN,
      total_hours: DataTypes.INEGER,
      employee_id: DataTypes.INEGER

     });
  
    return Hours;
  };
  