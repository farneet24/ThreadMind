import './App.css';
import './index.css';
import TextForm from './components/TextForm';
import About from './components/About';
import Navigationbar from './components/Navigationbar'
import React, { useState } from 'react';
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#111111';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    <>
    <Router>
    <Navigationbar title="ThreadMind" mode={mode} toggleMode={toggleMode} key={new Date()} />
    <Alert alert={alert}/>

    <div className="container my-3">
    <Routes>
          <Route exact path="/" element = {<TextForm showAlert={showAlert} heading="ThreadMind - Know the Mood, Catch the Tone." mode={mode}/>}></Route>
          <Route exact path="/about" element = {<About mode={mode} />}></Route>
          <Route exact path="/contact" element = {<Contact mode={mode}/>}></Route>
    </Routes>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Footer mode={mode}/>
    </Router>
    </> 
  );
}

export default App;