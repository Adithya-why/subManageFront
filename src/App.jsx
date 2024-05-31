import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';


import './App.css'
import NavBar from './components/NavBar'
import DesignCard from './components/DesignCard'
import Login from './components/Login'
import Register from './components/Register';
import Subs from './components/Subs';
import NewSub from './components/NewSub';
import UpdateSub from './components/UpdateSub';
import DashBoard from './components/DashBoard';






function App() {

  //used to login if jwt present


  //used to get user after login or register
  //user doc returned from post request is stored here
  //used to display stuff in navbar
  //set to {} after logout 
  //passed to all components for user access and logout
  let [user, setuser] = useState({});

  
  //navbar is always shown
  //rest chosen by router path
  //:id is url param
  

  return (
    <>
      <Router>
        <NavBar user={user} setuser={setuser}/>


        <Routes>


        <Route path='/' element={<DesignCard user={user}/>} />

        <Route path='/login' element={<Login setuser={setuser}/>}/>

        <Route path='/register' element={<Register setuser={setuser}/>}/>

        <Route path='/subscriptions' element={<Subs user={user}/>}/>


        <Route path='/add' element={<NewSub/>}/>

        <Route path='/update/:id' element={<UpdateSub/>}/>


        <Route path='/dashboard' element={<DashBoard user={user}/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
