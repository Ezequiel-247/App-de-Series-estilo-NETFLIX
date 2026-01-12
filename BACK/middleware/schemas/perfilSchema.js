const Joi = require('joi');

const perfilSchema = Joi.object({
    nombre_perfil: Joi.string().min(2).max(16).required(),
    avatarId: Joi.number().integer().required()
});

module.exports = perfilSchema;