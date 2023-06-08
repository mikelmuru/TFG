import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './css/globalStyles.css'
import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from './context/I18nContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <I18nProvider>
      <App />
    </I18nProvider>
  </BrowserRouter>,
)
