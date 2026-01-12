const { Router } = require('express');
const router = Router();
const avatarController = require('../controllers/avatarsController');

router.get('/', avatarController.verAvatares);

module.exports = router;
