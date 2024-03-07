import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { app } from "./fb";
import Home from "./Home";
import Logueo from "./Logueo";
import Create from "./Create";
import Edit from "./Edit";
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((usuarioFirebase) => {
      console.log("ya tienes sesión iniciada con:", usuarioFirebase);
      setUsuario(usuarioFirebase);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={usuario ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={usuario ? <Navigate to="/" /> : <Logueo setUsuario={setUsuario} />} />
        <Route path='/create' element={ <Create /> } />
        <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
    </Router>
  );
}

export default App;