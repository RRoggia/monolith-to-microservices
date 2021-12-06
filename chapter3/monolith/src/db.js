const loki = require( 'lokijs' )
var db = new loki('example.db')

var payrollDAO = db.addCollection( 'payroll' )
var invoiceDAO = db.addCollection( 'invoice' )
var userNotificationDAO = db.addCollection( 'userNotification' )

module.exports = {
  payrollDAO,
  invoiceDAO,
  userNotificationDAO,
}