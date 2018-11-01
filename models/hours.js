module.exports = function(sequelize, DataTypes) {

    var Hours = sequelize.define("Hours", {
      punch_time: DataTypes.DATE,
      punch_type: DataTypes.STING,
      employee_id: DataTypes.INTEGER,

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
  