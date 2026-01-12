const {Router} = require('express');
const validarGenero = require('../middleware/validarGenero');
const router = Router();
const generoController = require('../controllers/generoController');

router.post('/', validarGenero, generoController.crearGenero);
router.get('/', generoController.verGeneros);
router.get('/:id', generoController.verGenero);
router.get('/:id/peliculas', generoController.verContenidosPorGenero)
router.delete('/:id', generoController.eliminarGenero);

module.exports = router;
