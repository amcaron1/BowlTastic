module.exports = function(sequelize, DataTypes) {

    var Salary = sequelize.define("Salary", {
        pay_rate: DataTypes.DECIMAL(5,2),
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
