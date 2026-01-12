const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');

router.get('/', contenidoController.verContenidos); // Soporta filtros: ?tipo=serie&esPopular=true
router.post('/', contenidoController.crearContenido);
router.get('/:id', contenidoController.verContenido);
router.put('/:id', contenidoController.actualizarContenido);
router.delete('/:id', contenidoController.eliminarContenido);

module.exports = router;