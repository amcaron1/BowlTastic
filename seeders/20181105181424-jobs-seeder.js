module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.bulkInsert('Jobs', [{
        employeeId: 1, 
        title: "Cashier", 
        start_date: '2018-03-01',
      },{
        employeeId: 2, 
        title: "Lane Cleaner", 
        start_date: '2018-02-04',
      },{
        employeeId: 3, 
        title: "Pin Carver", 
        start_date: '2017-08-12',
      },{
        employeeId: 4, 
        title: "Bartender", 
        start_date: '2017-11-13',
      },{
        employeeId: 5, 
        title: "Shoe Master", 
        start_date: '2017-12-21',
      },{
        employeeId: 6, 
        title: "Manager", 
        start_date: '2018-06-11',
      },{
        employeeId: 7, 
        title: "Cook", 
        start_date: '2018-03-15',
      },{
        employeeId: 8, 
        title: "Bus Boy", 
        start_date: '2018-09-01',
        end_date: '2018-11-02'
      },{
        employeeId: 9, 
        title: "Bus Boy", 
        start_date: '2018-04-15',
      },{
        employeeId: 10, 
        title: "CEO", 
        start_date: '2018-05-19',
      }])

  
  .then(salarySeeder => {
    queryInterface.bulkInsert('Salaries', [{
      employeeId: 1, 
      pay_rate: 15.00
    }, {
      employeeId: 2, 
      pay_rate: 35.00
    }, {
      employeeId: 3, 
      pay_rate: 17.00
    }, {
      employeeId: 4, 
      pay_rate: 12.00
    }, {
      employeeId: 5, 
      pay_rate: 55.00
    }, {
      employeeId: 6, 
      pay_rate: 75.00
    }, {
      employeeId: 7, 
      pay_rate: 20.00
    }, {
      employeeId: 8, 
      pay_rate: 16.00, 
      end_date: '2018-11-02'
    }, {
      employeeId: 9, 
      pay_rate: 16.00
    }, {
      employeeId: 10, 
      pay_rate: 80.00
    }])
  })
  },


};
