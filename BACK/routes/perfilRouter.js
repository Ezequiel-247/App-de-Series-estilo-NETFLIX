const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

// Rutas de gestión de perfiles
router.post('/usuario/:usuarioId', perfilController.crearPerfil);
router.get('/usuario/:usuarioId', perfilController.verPerfiles);
router.get('/:id', perfilController.verPerfil);
router.delete('/:id', perfilController.eliminarPerfil);

// Rutas de "Mi Lista" (Favoritos)
router.post('/:perfilId/lista', perfilController.agregarContenidoLista);
router.delete('/:perfilId/lista/:contenidoId', perfilController.eliminarContenidoLista);
router.get('/:perfilId/lista', perfilController.verLista);

module.exports = router;