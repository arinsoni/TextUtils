import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alerts from './components/Alerts';
import React, { Component } from 'react';


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  // Dark and Light Mode
  const [mode, setMode] = useState('light');

  const [clr, setClr] = useState('lightgrey');
  const [abtHeadClr, setAbtHeadClr] = useState('coral')

  
  

  const toggleMode = () => {
    if (mode === 'dark') {

      setMode('light');
      setClr('lightgrey');
      setAbtHeadClr('coral');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Enabled", "success");
    }


    else {
      setMode('dark');
      setClr('black');
      setAbtHeadClr('gray');

      document.body.style.backgroundColor = '#333333';
      showAlert("Dark Mode Enabled", "success");
    }

  }
  const toggle1 = () => {
    
    if (mode === 'light' || mode === 'dark') {
      
      setMode('dark2');
      setClr('#00224e');
      setAbtHeadClr('cyan');
      document.body.style.backgroundColor = '#4c408e';
      showAlert("Light Mode Enabled", "success");
    }

    else if (mode === 'dark2') {
      setMode('light');
      setClr('lightgrey');
      setAbtHeadClr('coral');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Enabled", "success");
    }
    
  }



  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} clr={clr} toggle1={toggle1} />
        <Alerts alert={alert} />
        <div className="container my-3" >
          <Routes>
            <Route exact path="/about" element={<About mode={mode} abtHeadClr={abtHeadClr} />} />
          </Routes>
          <Routes>
            <Route exact path="/" element={<TextForm heading="Word Analyzer" mode={mode} showAlert={showAlert} clr={clr} toggle1={toggle1} />
            } />
          </Routes>

        </div>
      </Router>
    </>
  );
}

export default App;
