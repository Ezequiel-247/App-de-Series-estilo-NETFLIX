const { where } = require("sequelize");
const { Usuario } = require("../db/models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const crearUsuario = async (req, res) => {
    try{
        const { nombre, email, contraseña } = req.body;
        const hashedPassword = await bcrypt.hash(contraseña, 10); // 10 salt rounds
        const usuario = await Usuario.create({
            nombre,
            email,
            contraseña: hashedPassword
        });
        res.status(201).json(usuario);
    } catch(error) {
        res.status(400).json({ error: error.message });
    };
};

const verUsuarios = async (req, res) =>{
    try{
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['contraseña'] }
        })
        res.json(usuarios)
    } catch(error){
        res.status(500).json({ error: error.message })
    };
};

const eliminarUsuario = async (req,res) => {
    try{
        const { id } = req.params
        const usuario = await existeUsuario(id)
        await usuario.destroy()
        res.json({ message:'usuario eliminado'})
    } catch(error){
        if (siElUsuarioNoExiste(error)){
            res.status(404).json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
};

const existeUsuario = async (id) =>{
    const usuario = await Usuario.findByPk(id)
    if(!usuario) {
        throw new Error("Usuario no encontrado")
    }
    return usuario
};

const siElUsuarioNoExiste = (error)=> {
    return error.message === "Usuario no encontrado"
}

const loginUsuario = async (req, res) => {
    try {
        const { identificador, contraseña } = req.body; // identificador puede ser email o nombre
        const usuario = await Usuario.findOne({ 
            where: {
                [Op.or]: [
                    { email: identificador },
                    { nombre: identificador }
                ]
            }
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const usuarioSinPassword = usuario.toJSON();
        delete usuarioSinPassword.contraseña;

        res.json({ message: "Login exitoso", usuario: usuarioSinPassword });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    crearUsuario,
    verUsuarios,
    eliminarUsuario,
    existeUsuario,
    loginUsuario
};