import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alerts from './components/Alerts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



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
  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Enabled", "success");
    }
    else {
      setMode('dark');
      document.body.style.backgroundColor = '#0B0C10';
      showAlert("Dark Mode Enabled", "success");
    }

  }
  const toggle1 = () => {
    
    if (mode === 'light' || mode === 'dark') { 
      setMode('dark2');
      document.body.style.backgroundColor = '#4c408e';
      showAlert("Light Mode Enabled", "success");
    }

    else if (mode === 'dark2') {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Enabled", "success");
    }
    
  }

  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} toggle1={toggle1} />
        <Alerts alert={alert} />
        <div className="container my-3" >
          <Routes>
            <Route exact path="/about" element={<About mode={mode} />} />
          </Routes>
          <Routes>
            <Route exact path="/" element={<TextForm heading="Word Analyzer" mode={mode} showAlert={showAlert} toggle1={toggle1} />
            } />
          </Routes>

        </div>
      </Router>
    </>
  );
}

export default App;
