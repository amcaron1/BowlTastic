module.exports = function(sequelize, DataTypes) {

    var Hours = sequelize.define("Hours", {
      punch_time: DataTypes.DATE,
      punch_type: DataTypes.BOOLEAN,
      total_hours: DataTypes.INEGER,
      employee_id: DataTypes.INEGER,

     });

     Hours.associate = function(models) {
        Hours.belongsTo(models.Employee, {
            foreignKey: {
              allowNull: false
            }
          });
        };
  
    return Hours;
  };
  