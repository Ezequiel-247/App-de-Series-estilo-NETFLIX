const Joi = require('joi');

const generoSchema = Joi.object({
    nombre: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).min(2).max(20).required()
    // Lo que hace pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/) es que el nombre solo acepte letras (sin números ni caracteres raros).
});

module.exports = generoSchema;