const loki = require( 'lokijs' )
var db = new loki('example.db')

var invoiceDAO = db.addCollection( 'invoice' )
var userNotificationDAO = db.addCollection( 'userNotification' )

module.exports = {
  invoiceDAO,
  userNotificationDAO,
}