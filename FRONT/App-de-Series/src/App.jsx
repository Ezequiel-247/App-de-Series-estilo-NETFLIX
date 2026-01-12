import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import CrearPerfil from './components/CrearPerfil';
import Inicio from './components/Inicio';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} /> {/* Lista de perfiles */}
        <Route path="/perfil/nuevo" element={<CrearPerfil />} /> {/* Crear un nuevo perfil */}
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </>
  );
}

export default App;
