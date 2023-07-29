import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Navigationbar } from './components/Navbar.jsx'
import { News } from './components/News.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Navigationbar/>
    <News/>
  </React.StrictMode>,
)
