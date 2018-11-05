module.exports = function(sequelize, DataTypes) {

    var Jobs = sequelize.define("Jobs", {
      title: DataTypes.STRING,
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY
     });

     Jobs.associate = function(models) {
      Jobs.belongsTo(models.Employee, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Jobs;
  };
