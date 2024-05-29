import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';


import './App.css'
import NavBar from './components/NavBar'
import DesignCard from './components/DesignCard'
import Login from './components/Login'

function App() {
  

  return (
    <>
      <Router>
        <NavBar/>


        <Routes>


        <Route path='/' element={<DesignCard/>}/>

        <Route path='/login' element={<Login/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
