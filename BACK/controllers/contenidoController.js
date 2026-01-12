const {Contenido} = require("../db/models");

const crearContenido = async (req,res) => {
    try{
        const contenido = await Contenido.create(req.body)
        res.status(201).json(contenido)
    }catch(error){
        res.status(400).json({ error: error.message })
    };
};

const verContenidos = async (req,res)=>{
    try{
        const { tipo, esPopular } = req.query;
        const where = {};

        // Filtros dinámicos basados en la URL (ej: ?tipo=serie&esPopular=true)
        if (tipo) where.tipo = tipo;
        if (esPopular === 'true') where.esPopular = true;

        const contenidos = await Contenido.findAll({ where })
        res.json(contenidos)
    }catch(error){
        res.status(500).json({ error: error.message })
    };
};

const verContenido = async(req,res) =>{
    try{
        const id = req.params.id
        const contenido = await existeContenido(id)
        res.json(contenido)
    } catch(error){
        if (error.message === "Contenido no encontrado") {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    };
};

const eliminarContenido = async(req,res) => {
    try{
        const { id } = req.params
        const contenido = await existeContenido(id)
        await contenido.destroy()
        res.json({ mensaje: 'contenido eliminado' });
    } catch(error){
        res.status(500).json({ error: error.message });
    };
};

const actualizarContenido = async (req, res) => {
    try {
        const { id } = req.params;
        const contenido = await existeContenido(id)
        await contenido.update(req.body);
        res.json(contenido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const existeContenido = async (id) => {
    const contenido = await Contenido.findByPk(id, {
        include: ['episodios'] // Trae los episodios si es una serie
    });
    if (!contenido) throw new Error("Contenido no encontrado");
    return contenido;
};

module.exports= {
    crearContenido,
    verContenidos,
    verContenido,
    eliminarContenido,
    actualizarContenido
};