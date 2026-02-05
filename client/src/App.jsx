import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error fetching from API'))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cloud Run Test App</h1>
        <p>
          API Response: <strong>{message}</strong>
        </p>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9', color: '#333' }}>
          <h3>Deployment Info</h3>
          <p>This app is running in a container on Google Cloud Run.</p>
        </div>
      </header>
    </div>
  )
}

export default App
