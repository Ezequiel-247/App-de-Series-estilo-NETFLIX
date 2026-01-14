import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../style/CrearPerfil.css";

//  URL base
const API_URL = import.meta.env.MODE === 'production'
  ? 'https://app-de-series-estilo-netflix.onrender.com'
  : 'http://localhost:3000';

const CrearPerfil = () => {
    const { user } = useContext(UserContext);
    const [nombre, setNombre] = useState("");
    const [avatarId, setAvatarId] = useState(null);
    const [avatares, setAvatares] = useState([]);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvatares = async () => {
        try {
            const res = await fetch(`${API_URL}/api/avatars`);
            const data = await res.json();
            setAvatares(data);
        } catch (err) {
            console.error(err);
        }
        };
        fetchAvatares();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cargando) return; // Evita doble envío

        if (nombre.trim().length < 3 || nombre.trim().length > 15) {
            alert("El nombre del perfil debe tener entre 3 y 15 caracteres.");
            return;
        }

        if (!avatarId) {
        alert("Debes seleccionar un avatar");
        return;
        }

        setCargando(true); // Bloquea el botón
        try {
        const res = await fetch(`${API_URL}/usuario/${user.id}/perfiles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre_perfil: nombre, avatarId }),
        });

        if (res.ok) {
            const data = await res.json();
            console.log("Perfil creado exitosamente:", data); // Para verificar en consola
            const avatarSeleccionado = avatares.find((a) => a.id === avatarId);

            // Guardar perfil activo en localStorage
            localStorage.setItem(
            "perfilSeleccionado",
            JSON.stringify({
                id: data.id,
                nombre: data.nombre_perfil,
                avatar: avatarSeleccionado ? avatarSeleccionado.url : "",
            })
            );
            navigate("/inicio"); // Redirige automáticamente
        } else {
            const data = await res.json();
            console.error(data.error);
            
            // Manejo específico de errores comunes
            if (data.error && data.error.includes("SQLITE_BUSY")) {
                alert("⚠️ ERROR CRÍTICO: La base de datos está bloqueada.\n\nSOLUCIÓN: Cierra cualquier programa que esté abriendo 'database.sqlite' (como DB Browser) y REINICIA el servidor backend.");
            } else if (data.error && (data.error.includes("Validation error") || data.error.includes("perfil con ese nombre"))) {
                alert("⚠️ El perfil ya existe. Intenta con otro nombre o vuelve atrás para seleccionarlo.");
            } else {
                alert("Error al crear perfil: " + (data.error || "Error desconocido"));
            }
            setCargando(false); // Desbloquea si hubo error
        }
        } catch (err) {
        console.error(err);
        setCargando(false); // Desbloquea si hubo error de red
        }
    };

    if (!user) return <p>Cargando usuario...</p>;

    return (
        <div className="page-container">
        <div className="formulario-container">
            <div className="formulario">
            <h1>Crear nuevo perfil</h1>

            <form onSubmit={handleSubmit}>
                <div className="username">
                <input
                    type="text"
                    id="nombrePerfil"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder=" "
                />
                <label htmlFor="nombrePerfil">Nombre del perfil</label>
                </div>

                <div className="avatar-selection">
                <label>Selecciona un avatar:</label>
                <div className="avatar-grid">
                    {avatares.map((av) => (
                    <button
                        key={av.id}
                        type="button"
                        onClick={() => setAvatarId(av.id)}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                    >
                        <img
                            src={av.url}
                            alt={av.nombre}
                            className={avatarId === av.id ? "selected" : ""}
                        />
                    </button>
                    ))}
                </div>
                </div>

                <input 
                    type="submit" 
                    value={cargando ? "Creando..." : "Crear"} 
                    disabled={cargando}
                    style={{ opacity: cargando ? 0.7 : 1, cursor: cargando ? 'wait' : 'pointer' }}
                />
            </form>
            </div>
        </div>
        </div>
    );
};

export default CrearPerfil;
