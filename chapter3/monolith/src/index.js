const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const { v4: idGen } = require('uuid')

const {
  invoiceDAO,
  userNotificationDAO,
} = require( './db' )

app.use( express.json() )
app.use(cors())

app.get( '/userNotification', ( req, res) => {
  const userNotifications = userNotificationDAO.find()
  res
    .status(200)
    .json( userNotifications )
} )

app.post( '/userNotification', ( req, res) => {
  const { 
    event,
    userId,
    eventId,
    body
  } = req.body

  const doc = userNotificationDAO.insert( {
    id: idGen(),
    user: userId,
    event: event,
    eventId: eventId,
    body: JSON.stringify( body )
  } )

  res
    .status(201)
    .json( doc )
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

const PORT = 3001
app.listen( PORT, () => {
  console.log( `Listening at http://localhost:${PORT}` )
} )