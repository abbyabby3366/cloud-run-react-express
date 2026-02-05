import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [count, setCount] = useState(0)
  const [persistentCount, setPersistentCount] = useState(0)

  useEffect(() => {
    // Fetch hello message
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error fetching from API'))

    // Fetch initial RAM counter
    fetch('/api/counter')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(err => console.error('Error fetching RAM counter:', err))

    // Fetch initial Persistent counter
    fetch('/api/persistent-counter')
      .then(res => res.json())
      .then(data => setPersistentCount(data.count))
      .catch(err => console.error('Error fetching persistent counter:', err))
  }, [])

  const incrementRamCounter = async () => {
    try {
      const response = await fetch('/api/counter/increment', { method: 'POST' });
      const data = await response.json();
      setCount(data.count);
    } catch (err) {
      console.error('Error incrementing RAM counter:', err);
    }
  }

  const incrementPersistentCounter = async () => {
    try {
      const response = await fetch('/api/persistent-counter/increment', { method: 'POST' });
      const data = await response.json();
      setPersistentCount(data.count);
    } catch (err) {
      console.error('Error incrementing persistent counter:', err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cloud Run Test App</h1>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* RAM Counter */}
          <div style={{ margin: '10px', padding: '20px', border: '1px solid #646cff', borderRadius: '12px', background: '#242424', width: '300px' }}>
            <p>RAM Message: <strong>{message}</strong></p>
            <hr style={{ opacity: 0.2 }} />
            <h2>RAM Counter: <span style={{ color: '#646cff' }}>{count}</span></h2>
            <button onClick={incrementRamCounter} className="btn-primary">
              Increment RAM Counter
            </button>
            <p style={{ fontSize: '0.8rem', marginTop: '10px', opacity: 0.6 }}>
              (Resets on Cloud Run restart)
            </p>
          </div>

          {/* Persistent Counter */}
          <div style={{ margin: '10px', padding: '20px', border: '1px solid #4caf50', borderRadius: '12px', background: '#242424', width: '300px' }}>
            <p>Database: <strong>MongoDB Atlas</strong></p>
            <hr style={{ opacity: 0.2 }} />
            <h2>DB Counter: <span style={{ color: '#4caf50' }}>{persistentCount}</span></h2>
            <button onClick={incrementPersistentCounter} className="btn-success">
              Increment DB Counter
            </button>
            <p style={{ fontSize: '0.8rem', marginTop: '10px', opacity: 0.6 }}>
              (Saves to MongoDB Cloud)
            </p>
          </div>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9', color: '#333', marginTop: '30px' }}>
          <h3>Deployment Info</h3>
          <p>This app is running in a container on Google Cloud Run.</p>
        </div>
      </header>
      
      <style>{`
        .btn-primary {
          padding: 10px 20px;
          background-color: #646cff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
        .btn-success {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  )
}

export default App
