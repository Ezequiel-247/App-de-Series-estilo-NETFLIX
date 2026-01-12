const { Avatar } = require('../db/models');

const verAvatares = async (req, res) => {
    try {
        const avatares = await Avatar.findAll();
        // Prepend full URL para React
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const avataresConUrl = avatares.map(av => {
            // Validación de seguridad: si no tiene URL, devolver el objeto tal cual para no romper el map
            if (!av.url) return av;

            // Si es una URL externa (http...), la dejamos igual
            if (av.url.startsWith('http')) return av;

            // Si es local, aseguramos que empiece con /images/
            let urlPath = av.url.startsWith('/') ? av.url : `/${av.url}`;
            if (!urlPath.startsWith('/images/')) urlPath = `/images${urlPath}`;
            
            return { ...av.dataValues, url: `${baseUrl}${urlPath}` };
        });
        res.json(avataresConUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { verAvatares };
