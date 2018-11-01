module.exports = function(sequelize, DataTypes) {

    var Salary = sequelize.define("Salary", {
        pay_rate: DataTypes.INTEGER,
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
  