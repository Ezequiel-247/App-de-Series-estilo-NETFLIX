import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "../style/Perfil.css";

// URL base
const API_URL = import.meta.env.MODE === 'production'
    ? 'https://app-de-series-estilo-netflix.onrender.com'
    : 'http://localhost:3000';

const Perfil = () => {
    const { user } = useContext(UserContext);
    const [perfiles, setPerfiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
        navigate("/login");
        return;
        }

        const fetchPerfiles = async () => {
        try {
            const res = await fetch(`${API_URL}/usuario/${user.id}/perfiles`);
            const data = await res.json();
            const perfilesArray = Array.isArray(data) ? data : data.perfiles || [];
            setPerfiles(perfilesArray);
        } catch (err) {
            console.error(err);
        }
        };

        fetchPerfiles();
    }, [user, navigate]);

    const eliminarPerfil = async (id) => {
        try {
        const res = await fetch(`${API_URL}/perfil/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setPerfiles(perfiles.filter((p) => p.id !== id));
        } else {
            const data = await res.json();
            console.error(data.error);
        }
        } catch (err) {
        console.error(err);
        }
    };

    const irAPeliculas = (perfilId) => {
        const perfil = perfiles.find((p) => p.id === perfilId);
        if (perfil) {
            localStorage.setItem("perfilSeleccionado", JSON.stringify({
                id: perfil.id,
                nombre: perfil.nombre_perfil,
                avatar: perfil.avatar ? perfil.avatar.url : ""
            }));
        }
        navigate("/inicio");
    };

    if (!user) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="page-container">
        <div className="formulario-container">
            <div className="formulario">
            <h1>Bienvenido/a, {user.nombre}</h1>
            <div className="perfil-lista">
                {perfiles.map((perfil) => (
                <div key={perfil.id} className="perfil-item">
                    <button
                        onClick={() => irAPeliculas(perfil.id)}
                        className="perfil-btn"
                        aria-label={`Entrar como ${perfil.nombre_perfil}`}
                    >
                        <img
                        src={perfil.avatar?.url || "https://via.placeholder.com/100"}
                        alt=""
                        className="perfil-avatar"
                        />
                        <p className="perfil-nombre">{perfil.nombre_perfil}</p>
                    </button>
                    <button onClick={() => eliminarPerfil(perfil.id)} className="btn-eliminar">Eliminar</button>
                </div>
                ))}

                {perfiles.length < 3 && (
                <Link
                    to="/perfil/nuevo"
                    className="perfil-agregar"
                >
                    <span className="plus-icon">+</span>
                </Link>
                )}
            </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Perfil;
