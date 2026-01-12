const {Router} = require('express');
const validarUsuario = require('../middleware/validarUsuario');
const validarPerfil = require('../middleware/validarPerfil'); 
const router = Router();
const {verPerfiles ,crearPerfil} = require("../controllers/perfilController")
const usuarioController = require('../controllers/usuarioController');

router.post('/',validarUsuario, usuarioController.crearUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/',usuarioController.verUsuarios);
router.get('/:usuarioId/perfiles', verPerfiles);
router.post('/:usuarioId/perfiles', validarPerfil, crearPerfil);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;


