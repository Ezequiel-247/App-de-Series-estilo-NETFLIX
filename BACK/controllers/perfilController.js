const { Perfil, Usuario, Avatar, Contenido } = require("../db/models");

// Crear un perfil para un usuario
const crearPerfil = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { nombre_perfil, avatarId  } = req.body;

        // Validar usuario y límite de perfiles
        await puedeCrearPerfilConId(usuarioId);

        // Evitar perfiles duplicados
        await evitarPerfilDuplicado(usuarioId, nombre_perfil)
        
        // Validar que el avatar exista
        await validarAvatar(avatarId )

        // Crear nuevo perfil
        const perfil = await Perfil.create({ nombre_perfil, avatarId , usuarioId });
        res.status(201).json(perfil);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los perfiles de un usuario
const verPerfiles = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const perfiles = await Perfil.findAll({ 
            where: { usuarioId },
            include: [{ model: Avatar, as: 'avatar' }] 
        });

        // Agregar la URL base a la imagen del avatar para que el frontend pueda cargarla
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const perfilesConUrl = perfiles.map(perfil => {
            const p = perfil.toJSON();
            if (p.avatar && p.avatar.url) {
                if (!p.avatar.url.startsWith('http')) {
                    // Aseguramos que haya una barra separadora y la carpeta images
                    let urlPath = p.avatar.url.startsWith('/') ? p.avatar.url : `/${p.avatar.url}`;
                    if (!urlPath.startsWith('/images/')) urlPath = `/images${urlPath}`;
                    p.avatar.url = `${baseUrl}${urlPath}`;
                }
            }
            return p;
        });
        
        res.json(perfilesConUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const verPerfil = async (req,res) => {
    try{
        const {id} = req.params
        const perfil = await existePerfil(id)
        res.json(perfil)
    } catch(error){
        if (siElPerfilNoExiste(error)){
            res.status(404).json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
};

const eliminarPerfil = async (req,res) => {
    try{
        const { id } = req.params
        const perfil = await existePerfil(id)
        await perfil.destroy()
        res.json({ message:'perfil eliminado'})
    } catch(error){
        if (siElPerfilNoExiste(error)){
            res.status(404).json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
};

//SUBTAREAS

const existePerfil = async (id) => {
    const perfil = await Perfil.findByPk(id, {
        include: [
            { model: Avatar, as: 'avatar' } // Incluye el avatar asociado
        ]
    });

    if (!perfil) {
        throw new Error("Perfil no encontrado");
    }

    return perfil;
};


const siElPerfilNoExiste = (error)=> {
    return error.message === "Perfil no encontrado"
}

async function puedeCrearPerfilConId(usuarioId) {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) throw new Error("Usuario no encontrado");

    const cantidadPerfiles = await Perfil.count({ where: { usuarioId } });
    if (cantidadPerfiles >= 3) throw new Error("No puede tener más de 3 perfiles");

    return true;
}

const evitarPerfilDuplicado = async(usuarioId, nombre_perfil) => {

    const perfilExistente = await Perfil.findOne({
            where: { usuarioId, nombre_perfil }
        });
        if (perfilExistente) {
            throw new Error("Ya existe un perfil con ese nombre");
        }
};

const validarAvatar = async(avatarId) =>{
    const avatar = await Avatar.findByPk(avatarId);
        if (!avatar){
            throw new Error("Avatar no encontrado");
        };
}

// --- MÉTODOS PARA MI LISTA (FAVORITOS) ---

const agregarContenidoLista = async (req, res) => {
    try {
        const { perfilId } = req.params;
        const { contenidoId } = req.body;

        const perfil = await Perfil.findByPk(perfilId);
        const contenido = await Contenido.findByPk(contenidoId);

        if (!perfil || !contenido) throw new Error("Perfil o Contenido no encontrado");

        // Método mágico de Sequelize (asumiendo relación BelongsToMany)
        await perfil.addContenido(contenido);
        
        res.json({ message: "Agregado a mi lista exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarContenidoLista = async (req, res) => {
    try {
        const { perfilId, contenidoId } = req.params;
        
        const perfil = await Perfil.findByPk(perfilId);
        const contenido = await Contenido.findByPk(contenidoId);

        if (!perfil || !contenido) throw new Error("Datos inválidos");

        await perfil.removeContenido(contenido);
        
        res.json({ message: "Eliminado de mi lista" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verLista = async (req, res) => {
    try {
        const { perfilId } = req.params;
        const perfil = await Perfil.findByPk(perfilId, {
            include: [{
                model: Contenido,
                as: 'contenidos', // Debe coincidir con el 'as' definido en el modelo Perfil
                through: { attributes: [] } // Esto evita que traiga los datos de la tabla intermedia
            }]
        });

        if (!perfil) return res.status(404).json({ error: "Perfil no encontrado" });
        
        res.json(perfil.contenidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearPerfil,
    verPerfiles,
    verPerfil,
    eliminarPerfil,
    agregarContenidoLista,
    eliminarContenidoLista,
    verLista
};