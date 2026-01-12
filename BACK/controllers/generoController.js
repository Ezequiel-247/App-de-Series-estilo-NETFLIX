const { Genero } = require("../db/models");

const crearGenero = async (req,res)=>{
    try{
        const genero = await Genero.create(req.body)
        res.status(201).json(genero)
    } catch(error){
        res.status(400).json({ error: error.message })
    };
};

const verGeneros = async (req,res) => {
    try{
        const generos = await Genero.findAll()
        res.json(generos)
    } catch(error){
        res.status(500).json({ error: error.message })
    };
};

const verGenero = async (req,res) => {
    try{
        const id = req.params.id
        const genero = await existeGenero(id)
        res.json(genero)
    } catch(error) {
        res.status(500).json({ error: error.message })
    };
};

const eliminarGenero = async (req,res) => {
    try{
        const id = req.params.id
        const genero = await existeGenero(id)
        await genero.destroy()
        res.json({ mensaje: 'genero eliminado' });
    } catch(error){
        res.status(500).json({ error: error.message })
    };
};

const verContenidosPorGenero = async(req,res) => {
    try{
        const id = req.params.id
        const genero = await existeGenero(id)
        const contenidos = await genero.getContenidos()
        res.json(contenidos)
    } catch(error){
        res.status(500).json({ error: error.message })
    };
};

const existeGenero = async (id) => {
    const genero = await Genero.findByPk(id);
    if (!genero) throw new Error("Genero no encontrado");
    return genero;
};

module.exports = {
    crearGenero,
    verGeneros,
    verGenero,
    eliminarGenero,
    verContenidosPorGenero
};