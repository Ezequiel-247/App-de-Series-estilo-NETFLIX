import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "../style/Login.css"

// Definimos la URL base
const API_URL = import.meta.env.MODE === 'production'
  ? 'https://app-de-series-estilo-netflix.onrender.com'
  : 'http://localhost:3000';

const Login = () => {
    const { login } = useContext(UserContext);
    const [identificador, setIdentificador] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const [recordarme, setRecordarme] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identificador || !contraseña) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/usuario/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identificador, contraseña }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Error en el servidor");
                return;
            }

            login(data.usuario);

            if (recordarme) localStorage.setItem("user", JSON.stringify(data.usuario));

            const perfilesRes = await fetch(
                `${API_URL}/usuario/${data.usuario.id}/perfiles`
            );
            const perfilesData = await perfilesRes.json();

            const perfiles = Array.isArray(perfilesData)
                ? perfilesData
                : perfilesData.perfiles || [];

            if (perfiles.length === 0) {
                navigate("/perfil/nuevo");
            } else {
                navigate("/perfil");
            }
        } catch (err) {
            console.error(err);
            setError("Error en el servidor");
        }
    };

    return (
        <div className="page-container">
            <div className="formulario-container">
                <form className="formulario" onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div className="username">
                        <input
                            type="text"
                            id="usuario"
                            required
                            value={identificador}
                            onChange={(e) => setIdentificador(e.target.value)}
                            placeholder=" "
                        />
                        <label htmlFor="usuario">Usuario</label>
                    </div>

                    <div className="username">
                        <input
                            type="password"
                            id="password"
                            required
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            placeholder=" "
                        />
                        <label htmlFor="password">Contraseña</label>
                    </div>

                    <div className="input">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={recordarme}
                            onChange={(e) => setRecordarme(e.target.checked)}
                        />
                        <p>Recordarme</p>
                    </div>

                    <input type="submit" value="Ingresar" />

                    <div className="registrarse">
                        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                    </div>

                    {error && <div className="error">{error}</div>}
                </form>
            </div>

            {/* Footer abajo */}
            <Footer />
        </div>
    );
};

export default Login;
