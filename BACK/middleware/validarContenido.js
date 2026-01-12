const contenidoSchema = require("./schemas/contenidoSchema");

const validarContenido = (req, res, next) => {
    const { error } = contenidoSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: 'Datos inválidos',
            detalle: error.details[0].message
        })
    }
    next()
};

module.exports = validarContenido;