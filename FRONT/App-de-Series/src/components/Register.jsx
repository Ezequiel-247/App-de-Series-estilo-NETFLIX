import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import { UserContext } from "../context/UserContext";
import "../style/Login.css"

// URL base: Si estamos en producción usa Render, si no, localhost
const API_URL = import.meta.env.MODE === 'production'
  ? 'https://app-de-series-estilo-netflix.onrender.com'
  : 'http://localhost:3000';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext); // Contexto para guardar usuario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre || !email || !contraseña) {
        setError("Todos los campos son obligatorios");
        return;
        }

        try {
        const res = await fetch(`${API_URL}/usuario`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, contraseña }),
        });

        const data = await res.json();

        if (res.status !== 201) {
            setError(data.error || "Error en el registro");
            return;
        }

        // Si rediriges a login, no hace falta loguearlo en el contexto aquí.
        // login(data);

        // Redirigir al login para que ingrese sus credenciales
        navigate("/login");
        } catch (err) {
        console.error(err);
        setError("Error del servidor");
        }
    };

    return (
        <div className="page-container">
        <div className="formulario-container">
            <div className="formulario">
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <div className="username">
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder=" "
                />
                <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="username">
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder=" "
                />
                <label htmlFor="email">Email</label>
                </div>
                <div className="username">
                <input
                    type="password"
                    id="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                    placeholder=" "
                />
                <label htmlFor="password">Contraseña</label>
                </div>
                <input type="submit" value="Crear cuenta" />
                {error && <p className="error">{error}</p>}
            </form>
            <div className="registrarse">
                <p>¿Ya tienes cuenta?</p>
                <Link to="/login">Inicia sesión</Link>
            </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Register;
