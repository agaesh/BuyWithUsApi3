import Menubar from './assets/components/Menubar'
import ErrorBoundary from './assets/components/ErrorBoundary'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './assets/pages/HomePage'
import About from './assets/pages/About'
import Contact from './assets/pages/Contact'
import React from 'react'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className='app-container'>
          <Menubar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
          </div>
        </div>
  
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App