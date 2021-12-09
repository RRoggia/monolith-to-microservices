const loki = require( 'lokijs' )
var db = new loki('example.db')

var payrollDAO = db.addCollection( 'payroll' )

module.exports = {
  payrollDAO,
}