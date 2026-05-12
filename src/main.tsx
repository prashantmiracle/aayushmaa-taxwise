import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './theme.css'
import { TaxProvider } from './TaxContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaxProvider>
      <App />
    </TaxProvider>
  </React.StrictMode>,
)
