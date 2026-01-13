const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');
const verifyToken = require('../middleware/auth');

router.get('/', contenidoController.verContenidos); // Soporta filtros: ?tipo=serie&esPopular=true
router.get('/:id', contenidoController.verContenido);

router.post('/', verifyToken, contenidoController.crearContenido);
router.put('/:id', verifyToken, contenidoController.actualizarContenido);
router.delete('/:id', verifyToken, contenidoController.eliminarContenido);

module.exports = router;