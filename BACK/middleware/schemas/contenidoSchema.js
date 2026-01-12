const Joi = require('joi');

const contenidoSchema = Joi.object({
    nombre: Joi.string().min(2).max(50).required(),
    tipo: Joi.string().valid('pelicula', 'serie').required(),
    esFavorita: Joi.boolean().default(false),
    esPopular: Joi.boolean().default(false),
    fecha_estreno: Joi.date().optional(),
    imagen: Joi.string().uri().optional(), // URL opcional para la imagen
    trailerUrl: Joi.string().uri().optional(), // URL del trailer de YouTube
    generoId: Joi.number().integer().required() // referencia al genero
});

module.exports = contenidoSchema;