import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [ payrolls, setPayrolls ] = useState( [] )
  const [ notifications, setUserNotification ] = useState( [] )
  const [ invoices, setInvoices ] = useState( [] )
  async function fetchData() {
    const [ payrollsData, notifications, invoices ] = await Promise.all( [ 
      axios.get( 'http://localhost:3000/payroll'),
      axios.get( 'http://localhost:3000/userNotification'),
      axios.get( 'http://localhost:3000/invoice'),  
    ] )

    setPayrolls( payrollsData.data )
    setUserNotification( notifications.data )
    setInvoices( invoices.data )

  }
  useEffect( () => {
    fetchData()
  }, [] ) 
  
  return (
    <div className="App">
      <div>
        <button onClick={() => fetchData()}>Refresca a pagina</button>
        <button onClick={async() => {
          await axios.post( 'http://localhost:3000/payroll', {
            userId: parseInt(Math.random() * 100),
            amount: (Math.random() * 100).toFixed(2),
            date: new Date().toISOString().substring(0,10)
          })
          await fetchData()
        }}>Cria Payroll</button>
        
        <button onClick={async() => {
          await axios.post( 'http://localhost:3000/invoice', {
            userId: parseInt(Math.random() * 100),
            amount: (Math.random() * 100).toFixed(2),
            date: new Date().toISOString().substring(0,10)
          })
          await fetchData()
        }
        }>Cria Invoice</button>
      </div>
      <div>
        <h1>Payrolls ({payrolls.length})</h1>
        { !payrolls.length ?  <p>Não tem payroll</p> : payrolls.map((e) => {
          return <p> ID: {e.id}, userId: {e.userId}, Amount: {e.amount}, Date: {new Date(e.date).toLocaleDateString()}</p>
        }) }
      </div>
      <div>
      <h1>Notifications ({notifications.length})</h1>
        { !notifications.length ?  <p>Não tem notifications</p> : notifications.map((e) => {
          return <p> ID: {e.id}, User {e.user}, event: {e.event} eventID: {e.eventId}</p>
        }) }
      </div>
      <div>
        <h1>Invoices ({invoices.length})</h1>
        { !invoices.length ?  <p>Não tem invoices</p> : invoices.map((e) => {
          return <p> {JSON.stringify( e )}</p>
        }) }
      </div>

    </div>
  )
}

export default App
