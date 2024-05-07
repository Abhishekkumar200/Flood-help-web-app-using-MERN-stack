import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Alert from './components/Alert';
import HelpState from './context/helps/HelpState';

function App() {
  const [alert, setAlert] = useState(null);
  const handleAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(()=>{
      setAlert(null);
    }, 2000);
  };
  return (
      <>
      <HelpState handleAlert={handleAlert}>
      <BrowserRouter>
      <Navbar />
      <Alert alert={alert} />
      <div className='container'>
      <Routes>
        <Route exact path="/" element={<Home handleAlert={handleAlert}/>} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login handleAlert={handleAlert}/>} />
        <Route exact path="/signup" element={<Signup handleAlert={handleAlert}/>} />
      </Routes>
      </div>
      </BrowserRouter>
      </HelpState>
      </>
  );
}

export default App;
