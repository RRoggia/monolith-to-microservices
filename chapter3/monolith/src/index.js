const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const { v4: idGen } = require('uuid')

const {
  payrollDAO,
  invoiceDAO,
  userNotificationDAO,
} = require( './db' )

app.use( express.json() )
app.use(cors())

app.post( '/payroll', ( req, res ) => {
  console.log( `received payload ${req.body} ` )

  const {
    userId,
    amount,
    date 
  } = req?.body || {}

  const doc = payrollDAO.insert( {
    id: idGen(),
    userId,
    amount,
    date: new Date( date )
  } )

  userNotificationDAO.insert( {
    id: idGen(),
    user: userId,
    event: 'payroll',
    eventId: doc.id,
    body: JSON.stringify( req.body )
  } )

  res
    .status(201)
    .json( doc )
} )

app.get( '/payroll', ( req, res) => {
  const payrolls = payrollDAO.find()
  res
    .status(200)
    .json( payrolls )
} )

app.get( '/userNotification', ( req, res) => {
  const userNotifications = userNotificationDAO.find()
  res
    .status(200)
    .json( userNotifications )
} )

app.post( '/invoice', ( req, res ) => {
  console.log( `received invoice ${req.body} ` )

  const {
    userId,
  } = req?.body || {}

  const doc = invoiceDAO.insert( {
    id: idGen(),
    userId,
    date: new Date()
  } )

  userNotificationDAO.insert( {
    id: idGen(),
    user: userId,
    event: 'invoice',
    eventId: doc.id,
    body: JSON.stringify( req.body )
  } )
  res
    .status(201)
    .json(doc)
} )

app.get( '/invoice', ( req, res ) => {
  const invoices = invoiceDAO.find()
  res
    .status(200)
    .json( invoices )
} )

const PORT = 3000
app.listen( PORT, () => {
  console.log( `Listening at http://localhost:${PORT}` )
} )