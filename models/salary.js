module.exports = function(sequelize, DataTypes) {

    var Salary = sequelize.define("Salary", {
        pay_rate: DataTypes.INTEGER,
        end_date: DataTypes.DATEONLY,
     });
  
     Salary.associate = function(models) {
        Salary.belongsTo(models.Employee, {
            foreignKey: {
              allowNull: false
            }
          });
        };
    
    return Salary;
  };
  