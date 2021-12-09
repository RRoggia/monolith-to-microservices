const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const { v4: idGen } = require('uuid')
const axios = require( 'axios' )

app.use( express.json() )
app.use(cors())

const {
  payrollDAO,
} = require( './db' )

app.post( '/payroll', async( req, res ) => {
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
  
  await axios.post( 'http://localhost:3001/userNotification', {
    userId,
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

app.get( '/health', ( req, res ) => {
  res.send(200) 
} )

const PORT = 3005
app.listen( PORT, () => {
  console.log( `Listening to port http://localhost:${PORT}` )
} )