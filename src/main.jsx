import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SalesProvider } from './context/SalesContext' // ⬅️ Tambahkan ini

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SalesProvider>
        <App />
      </SalesProvider>
    </BrowserRouter>
  </React.StrictMode>
)

