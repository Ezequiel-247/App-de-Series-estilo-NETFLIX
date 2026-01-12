const generoSchema = require("./schemas/generoSchema");

const validarGenero = (req, res, next) => {
    const { error } = generoSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: 'Datos inválidos',
            detalle: error.details[0].message
        })
    }
    next()
};

module.exports = validarGenero;