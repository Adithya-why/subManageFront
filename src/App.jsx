import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';


import './App.css'
import NavBar from './components/NavBar'
import DesignCard from './components/DesignCard'

function App() {
  

  return (
    <>
      <Router>
        <NavBar/>


        <Routes>


        <Route path='/' element={<DesignCard/>}/>


        </Routes>
      </Router>
    </>
  )
}

export default App
