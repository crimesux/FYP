import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './service/index';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import UserComponent from './components/UserComponent';
import Home from './components';
import Login from './components/login';
import Vote from './components/vote';

function App() {
  return (
    <div className="App">
    <Router>
    <Navbar />
    <Routes>
    <Route exact path='/'  element={<Home />} />
    <Route  path='/login' element={<Login />} />
    <Route  path='/vote' element={<Vote />} />
    <Route  path='/UserComponent' element={<UserComponent />} />
    </Routes>
    </Router>
    
    </div>
  );
}

export default App;
