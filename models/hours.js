module.exports = function(sequelize, DataTypes) {

    var Hours = sequelize.define("Hour", {
      timein: DataTypes.DATE,
      timeout: DataTypes.DATE,
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
