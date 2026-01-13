const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Se requiere un token.' });
    }

    try {
        // Si el token viene como "Bearer xxxxx", limpiamos el prefijo
        const tokenLimpio = token.replace("Bearer ", "");
        const verified = jwt.verify(tokenLimpio, process.env.JWT_SECRET || 'secreto_super_seguro');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token no válido o expirado.' });
    }
};

module.exports = verifyToken;
