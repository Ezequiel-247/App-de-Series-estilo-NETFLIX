const perfilSchema = require("./schemas/perfilSchema");

const validarPerfil = (req, res, next) => {
    const { error } = perfilSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: 'Datos inválidos',
            detalle: error.details[0].message
        })
    }
    next()
};

module.exports = validarPerfil;