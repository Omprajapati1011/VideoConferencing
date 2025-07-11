import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css'
import LandingPage from './views/landing.jsx';
import Authentication from './views/authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeet from './views/VideoMeet.jsx';
import Home from './views/home.jsx';
 


function App() {
  return (
    
      <div className='App'>
    <Router>

      <AuthProvider>

    <Routes>
      <Route path='/' element={<LandingPage />} />

      <Route path='/auth' element={<Authentication />} />
       
      <Route path='/home' element={<Home/>}></Route>

       <Route path='/:url' element={<VideoMeet />} />


      
    </Routes>

      </AuthProvider>

</Router>

</div>
  )
}

export default App;
