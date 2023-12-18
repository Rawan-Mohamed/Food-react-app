import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "@fortawesome/fontawesome-free/css/all.min.css"



import './index.css'
import AuthContextProvider from './Context/AuthContext.jsx'
import ToastContextProvider from './Context/ToastContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthContextProvider>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
