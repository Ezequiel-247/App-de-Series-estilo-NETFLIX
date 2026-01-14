import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Nav.css";
import "../style/Inicio.css";

import netflixLogo from "../multimedia/netflix.png";
import lupa from "../multimedia/lupa.svg";
import campana from "../multimedia/campana.png";
const userDefault = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(userDefault);
    const [scrolled, setScrolled] = useState(false);
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [menuAbierto, setMenuAbierto] = useState(false);

    const isGuest = ["/", "/login", "/register"].includes(location.pathname);
    const isHidden = ["/perfil", "/perfil/nuevo"].includes(location.pathname);

    useEffect(() => {
        if (!isGuest) {
            const perfilGuardado = localStorage.getItem("perfilSeleccionado");
            if (perfilGuardado) {
                try {
                    const perfil = JSON.parse(perfilGuardado);
                    if (perfil.avatar) setAvatar(perfil.avatar);
                } catch (error) {
                    console.error("Error leyendo localStorage:", error);
                }
            }
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isGuest, location]);

    // Sincronizar el input de búsqueda con la URL (para limpiarlo si se navega fuera de la búsqueda)
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const q = query.get("q");
        setBusqueda(q || "");
    }, [location.search]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleSearch = (e) => {
        const valor = e.target.value;
        setBusqueda(valor);
        if (valor.length > 0) {
            navigate(`/inicio?q=${valor}`);
        } else {
            navigate('/inicio');
        }
    };

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    if (isHidden) return null;

    if (isGuest) {
        return (
            <nav aria-label="Navegación principal" className="nav-guest">
                <button className="mobile-menu-toggle" onClick={toggleMenu}>
                    {menuAbierto ? "✕" : "☰"}
                </button>

                <div 
                    className={`menu-overlay ${menuAbierto ? 'active' : ''}`} 
                    onClick={() => setMenuAbierto(false)}
                ></div>

                <div className="logo">
                    <Link to="/">
                        <img src={netflixLogo} alt="Netflix Logo" />
                    </Link>
                </div>
                <ul className={`nav-links ${menuAbierto ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
                    <li><Link to="/login" onClick={() => setMenuAbierto(false)}>Login</Link></li>
                    <li><Link to="/register" onClick={() => setMenuAbierto(false)}>Registrarse</Link></li>
                </ul>
                <div className="idioma">
                    <label htmlFor="select-idioma" className="sr-only">Seleccionar idioma</label>
                    <select id="select-idioma" defaultValue="es">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </nav>
        );
    }

    return (
        <div className={`menu ${scrolled ? "scrolled" : ""}`} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, transition: 'background 0.3s ease-in-out', backgroundColor: scrolled ? '#141414' : 'transparent' }}>
            <button className="mobile-menu-toggle" onClick={toggleMenu}>
                {menuAbierto ? "✕" : "☰"}
            </button>

            <div 
                className={`menu-overlay ${menuAbierto ? 'active' : ''}`} 
                onClick={() => setMenuAbierto(false)}
            ></div>

            <nav style={{ display: 'flex', alignItems: 'center' }}>
                <div className="logo" style={{ marginRight: '20px' }}>
                    <Link to="/inicio" onClick={scrollToTop}>
                        <img src={netflixLogo} alt="Logo Netflix" title="Logo Netflix" />
                    </Link>
                </div>
                <ul className={`navegacion navegacion--izq nav-links ${menuAbierto ? 'active' : ''}`}>
                    <li><Link to="/inicio" onClick={() => { scrollToTop(); setMenuAbierto(false); }}>Inicio</Link></li>
                    <li><a href="#series" onClick={() => setMenuAbierto(false)}>Series</a></li>
                    <li><a href="#peliculas" onClick={() => setMenuAbierto(false)}>Películas</a></li>
                    <li><a href="#milista" onClick={() => setMenuAbierto(false)}>Mi Lista</a></li>
                </ul>
            </nav>
            <nav>
                <ul className="navegacion navegacion-der">
                    <li className={`buscador ${mostrarBusqueda ? "activo" : ""}`}>
                        <img 
                            src={lupa} 
                            alt="Buscar" 
                            onClick={() => setMostrarBusqueda(!mostrarBusqueda)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Títulos, gente, géneros" 
                            value={busqueda}
                            onChange={handleSearch}
                        />
                    </li>
                    <li><a href="#"><img style={{width: "40px"}} src={campana} alt="Campana" /></a></li>
                    <li className="usuario">
                        <Link to="/perfil">
                            <img 
                                src={avatar} 
                                alt="Usuario" 
                                style={{ borderRadius: "4px", objectFit: "cover", width: "40px", height: "40px" }}
                            />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;