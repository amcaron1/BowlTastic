module.exports = function(sequelize, DataTypes) {

    var Jobs = sequelize.define("Jobs", {
      title: DataTypes.STRING,
      job_id: DataTypes.INTEGER,
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
  
     });
  
     Joba.associate = function(models) {
      Jobs.belongsTo(models.Employee, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    return Jobs;
  };
  