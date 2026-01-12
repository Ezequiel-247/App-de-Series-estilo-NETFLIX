import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
import Footer from "./Footer";

const Home = () => {
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);
    const preguntasFrecuentes = [
        {
        pregunta: "¿Qué es este clon de Netflix?",
        respuesta:
            "Es un proyecto personal desarrollado en React con el objetivo de practicar frontend y simular la experiencia de Netflix. La aplicación consume una API propia que diseñé desde cero utilizando Node.js para el backend, con una base de datos SQLite modelada en JavaScript. Implementé rutas, controladores y endpoints REST que permiten manejar el catálogo de películas y series, usuarios y autenticación básica. De esta forma pude trabajar tanto en el diseño de la interfaz como en la integración con una API real construida por mí, aplicando conceptos de fullstack development.",
        },
        {
        pregunta: "¿Cuánto cuesta?",
        respuesta: "Nada. Este proyecto es solo de práctica. Es totalmente gratuito 😉.",
        },
        {
        pregunta: "¿Dónde puedo verlo?",
        respuesta: "Funciona en cualquier navegador moderno. Es una app web responsiva.",
        },
        {
        pregunta: "¿Puedo registrarme?",
        respuesta: "Sí, hay un formulario de login/registro simulado conectado a un backend (API).",
        },
    ];

    const renderizarPreguntasFrecuentes = () =>
        preguntasFrecuentes.map((preguntaFrecuente, indicePregunta) => {
        
        const idRespuesta = `faq-respuesta-${indicePregunta}`;
        const estaAbierta = preguntaSeleccionada === indicePregunta;

        return (
            <div key={indicePregunta} className="faq-item">
            {/* Botón de la pregunta */}

            <button
                className="faq-question"
                aria-expanded={estaAbierta}
                aria-controls={idRespuesta}
                onClick= {() =>
                    setPreguntaSeleccionada(estaAbierta ? null : indicePregunta)
                }
            >
                {preguntaFrecuente.pregunta}
                <span>{estaAbierta ? "-" : "+"}</span>
            </button>

            {/* Mostrar la respuesta si está abierta */}
            {estaAbierta && (
                <p id={idRespuesta} className="faq-answer fade-in-answer">
                {preguntaFrecuente.respuesta}
                </p>
            )}
            </div>
        );
        });

    return (
        <div>
        {/* HERO */}
        <section className="hero">
            <div className="overlay">
            <h1>Películas y series ilimitadas y mucho más</h1>
            <h2>Disfruta donde quieras. Cancela cuando quieras.</h2>
            <p>
                ¿Quieres ver algo ya? Ingresa tu email para crear o reiniciar tu
                membresía.
            </p>
            <div className="email-form">
                <Link
                to="/register"
                className="btn btn-iniciar"
                aria-label="Comenzar registro"
                >
                Comenzar
                </Link>
            </div>
            </div>
        </section>

        {/* Detalles del proyecto */}
        <section className="faq">
            <h2>Detalles del proyecto</h2>
            <div className="faq-list">{renderizarPreguntasFrecuentes()}</div>
        </section>

        <Footer />
        </div>
    );
};

export default Home;
