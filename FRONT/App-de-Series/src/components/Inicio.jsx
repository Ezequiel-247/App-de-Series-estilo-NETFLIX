import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../style/Inicio.css"; 
import Footer from "./Footer";
import NavBar from "./NavBar";

const Inicio = () => {
    const [contenido, setContenido] = useState([]);
    const [destacada, setDestacada] = useState(null);
    const [miLista, setMiLista] = useState([]);
    const [mostrarIntro, setMostrarIntro] = useState(true);
    const [mostrarTrailer, setMostrarTrailer] = useState(false);
    const [perfilNombre, setPerfilNombre] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Referencias para los carruseles
    const listaRef = useRef(null);
    const peliculasRef = useRef(null);
    const seriesRef = useRef(null);

    // Obtener término de búsqueda de la URL
    const query = new URLSearchParams(location.search);
    const busqueda = query.get("q");

    // Limpiar destacada cuando se busca algo para tener una vista limpia
    useEffect(() => {
        if (busqueda) {
            setDestacada(null);
            setMostrarTrailer(false);
        }
    }, [busqueda]);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("Inicio montado. Verificando perfil...");
        const perfilStorage = localStorage.getItem("perfilSeleccionado");

        // Protección: Si no hay perfil seleccionado, redirigir a la selección de perfiles
        if (!perfilStorage) {
            navigate("/perfil");
            return;
        }
        
        const perfil = JSON.parse(perfilStorage);
        setPerfilNombre(perfil.nombre);

        // Temporizador para la animación de bienvenida (3 segundos)
        const timer = setTimeout(() => {
            setMostrarIntro(false);
        }, 3000);

        const fetchContenido = async () => {
            try {
                const response = await fetch("http://localhost:3000/contenido");
                if (response.ok) {
                    const data = await response.json();
                    const arrayData = Array.isArray(data) ? data : [];
                    setContenido(arrayData);
                    
                    // Seleccionar una película aleatoria al inicio
                    if (arrayData.length > 0 && !busqueda) {
                        const random = arrayData[Math.floor(Math.random() * arrayData.length)];
                        setDestacada(random);
                    }
                }
            } catch (error) {
                console.error("Error fetching contenido:", error);
            }
        };

        const fetchMiLista = async () => {
            try {
                const response = await fetch(`http://localhost:3000/perfil/${perfil.id}/lista`);
                if (response.ok) {
                    const data = await response.json();
                    setMiLista(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Error fetching mi lista:", error);
            }
        };

        fetchContenido();
        fetchMiLista();
        return () => clearTimeout(timer);
    }, []);

    const peliculas = contenido.filter(item => item.tipo === "pelicula");
    const series = contenido.filter(item => item.tipo === "serie");

    const agregarAMiLista = async () => {
        // Recuperamos el objeto del perfil guardado en localStorage
        const perfilStorage = localStorage.getItem("perfilSeleccionado");
        let perfilId = null;

        if (perfilStorage) {
            const perfil = JSON.parse(perfilStorage);
            perfilId = perfil.id;
        }
        
        if (!destacada || !perfilId) {
            alert("Debes seleccionar un perfil primero.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/perfil/${perfilId}/lista`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contenidoId: destacada.id })
            });
            
            if (response.ok) {
                alert("¡Agregado a Mi Lista!");
                if (!miLista.some(item => item.id === destacada.id)) {
                    setMiLista([...miLista, destacada]);
                }
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error al agregar a la lista:", error);
        }
    };

    // Filtrar contenido si hay búsqueda
    const resultadosBusqueda = busqueda 
        ? contenido.filter(item => item.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        : [];

    const handleSeleccionBusqueda = (item) => {
        setDestacada(item);
        navigate("/inicio"); // Limpiar la búsqueda de la URL para salir del modo búsqueda
        window.scrollTo({ top: 0, behavior: "smooth" }); // Ir al banner con la película seleccionada
    };

    // Función para convertir URL de YouTube normal a Embed
    const getEmbedUrl = (url) => {
        if (!url) return "";
        if (url.includes("youtube.com/watch?v=")) {
            const videoId = url.split("v=")[1].split("&")[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        return url;
    };

    // Función para asegurar que la URL de la imagen sea absoluta
    const getImageUrl = (imagen) => {
        if (!imagen) return "";
        if (imagen.startsWith("http")) return imagen;
        // Si es relativa, agregar dominio del backend
        let url = imagen.startsWith("/") ? imagen : `/${imagen}`;
        if (!url.startsWith("/images/")) url = `/images${url}`;
        return `http://localhost:3000${url}`;
    };

    // Función para scrollear los carruseles
    const handleScroll = (ref, direction) => {
        if (ref.current) {
            const { current } = ref;
            const scrollAmount = window.innerWidth - 100; // Desplaza casi el ancho de la pantalla
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Componente Banner reutilizable para poder cambiarlo de lugar
    const Banner = (
        <aside 
            id="banner-destacado"
            className="background--banner" 
            style={{ 
                backgroundImage: destacada ? `url(${getImageUrl(destacada.imagen)})` : "none"
            }}
        >
            <div className="banner">
                <div className="imagotipo">
                    <div className="imagotipo--info">
                        {destacada && (
                            <>
                                {!busqueda && (
                                    <>
                                        <h1 className="titulo-destacada">{destacada.nombre}</h1>
                                        <p className="descripcion-destacada">{destacada.descripcion}</p>
                                    </>
                                )}
                                <div className="botones-banner">
                                    <button className="boton-play" onClick={() => setMostrarTrailer(true)}>⏵ Reproducir</button>
                                    <button className="boton-info">ⓘ Más Información</button>
                                </div>
                                <button className="boton-lista" onClick={agregarAMiLista}>+ Mi Lista</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <div className="inicio-page">
            <NavBar />
            
            {mostrarIntro && (
                <div className="intro-overlay">
                    <h1 className="intro-texto">Bienvenido/A {perfilNombre}</h1>
                </div>
            )}

            {/* Modal del Trailer */}
            {mostrarTrailer && destacada?.trailerUrl && (
                <div className="trailer-overlay" onClick={() => setMostrarTrailer(false)}>
                    <div className="trailer-container">
                        <button className="close-trailer" onClick={() => setMostrarTrailer(false)}>✕</button>
                        <iframe 
                            src={getEmbedUrl(destacada.trailerUrl)} 
                            title={destacada.nombre} 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {busqueda ? (
                <>
                    {/* Si hay búsqueda: Resultados PRIMERO */}
                    <main className="catalogos" style={{ paddingTop: "80px", minHeight: "auto" }}>
                        <section className="catalogos--peliculas">
                        <h1>Resultados para: "{busqueda}"</h1>
                        <div className="resultados-grid">
                            {resultadosBusqueda.length > 0 ? resultadosBusqueda.map((item) => (
                                <div key={item.id} className="pelicula" onClick={() => handleSeleccionBusqueda(item)}>
                                    <img src={getImageUrl(item.imagen)} alt={item.nombre} title={item.nombre} />
                                </div>
                            )) : (
                                <p style={{ padding: "20px", fontSize: "1.2rem" }}>No se encontraron títulos con ese nombre.</p>
                            )}
                        </div>
                        </section>
                    </main>
                    {/* Banner DESPUÉS para acciones */}
                    {Banner}
                </>
            ) : (
                <>
                    {/* Si NO hay búsqueda: Banner PRIMERO */}
                    {Banner}
                    <main className="catalogos">
                        {miLista.length > 0 && (
                            <section className="catalogos--peliculas">
                                <h1>Mi Lista</h1>
                                <div className="slider-wrapper">
                                    <button className="slider-arrow left" onClick={() => handleScroll(listaRef, 'left')}>‹</button>
                                    <div className="peliculas" id="milista" ref={listaRef}>
                                        {miLista.map((item) => (
                                            <div 
                                                key={item.id || item.nombre} 
                                                className="pelicula"
                                                onClick={() => setDestacada(item)}
                                            >
                                                <img src={getImageUrl(item.imagen)} alt={item.nombre} title={item.nombre} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="slider-arrow right" onClick={() => handleScroll(listaRef, 'right')}>›</button>
                                </div>
                            </section>
                        )}
                        <section className="catalogos--peliculas">
                            <h1>Películas</h1>
                            <div className="slider-wrapper">
                                <button className="slider-arrow left" onClick={() => handleScroll(peliculasRef, 'left')}>‹</button>
                                <div className="peliculas" id="peliculas" ref={peliculasRef}>
                                    {peliculas.length > 0 ? peliculas.map((item) => (
                                        <div 
                                            key={item.id || item.nombre} 
                                            className="pelicula" 
                                            onClick={() => setDestacada(item)}
                                        >
                                            <img src={getImageUrl(item.imagen)} alt={item.nombre} title={item.nombre} />
                                        </div>
                                    )) : <p style={{padding: "10px"}}>No hay películas disponibles.</p>}
                                </div>
                                <button className="slider-arrow right" onClick={() => handleScroll(peliculasRef, 'right')}>›</button>
                            </div>
                        </section>
                        <section className="catalogos--peliculas">
                            <h1>Series</h1>
                            <div className="slider-wrapper">
                                <button className="slider-arrow left" onClick={() => handleScroll(seriesRef, 'left')}>‹</button>
                                <div className="peliculas" id="series" ref={seriesRef}>
                                    {series.length > 0 ? series.map((item) => (
                                        <div 
                                            key={item.id || item.nombre} 
                                            className="pelicula"
                                            onClick={() => setDestacada(item)}
                                        >
                                            <img src={getImageUrl(item.imagen)} alt={item.nombre} title={item.nombre} />
                                        </div>
                                    )) : <p style={{padding: "10px"}}>No hay series disponibles.</p>}
                                </div>
                                <button className="slider-arrow right" onClick={() => handleScroll(seriesRef, 'right')}>›</button>
                            </div>
                        </section>
                    </main>
                </>
            )}
            <Footer />
        </div>
    );
};

export default Inicio;