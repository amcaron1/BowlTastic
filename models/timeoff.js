module.exports = function(sequelize, DataTypes) {

    let Timeoff = sequelize.define("Timeoff", {
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      approved: DataTypes.BOOLEAN
     });

     Timeoff.associate = function(models) {
        Timeoff.belongsTo(models.Employee, {
            foreignKey: {
              allowNull: false
            }
          });
        };

    return Timeoff;
  };
