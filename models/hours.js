module.exports = function(sequelize, DataTypes) {

    var Hours = sequelize.define("Hour", {
      punch_time: DataTypes.DATE,
      punch_type: DataTypes.BOOLEAN,
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
  