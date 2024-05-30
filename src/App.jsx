import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';


import './App.css'
import NavBar from './components/NavBar'
import DesignCard from './components/DesignCard'
import Login from './components/Login'
import Register from './components/Register';






function App() {


  //used to get user after login or register
  //user doc returned from post request is stored here
  //used to display stuff in navbar
  let [user, setuser] = useState({});

  

  

  return (
    <>
      <Router>
        <NavBar/>


        <Routes>


        <Route path='/' element={<DesignCard/>} />

        <Route path='/login' element={<Login setuser={setuser}/>}/>

        <Route path='/register' element={<Register setuser={setuser}/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
