require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./db/models')
const usuarioRoutes = require("./routes/usuarioRouter");
const perfilRoutes = require("./routes/perfilRouter");
const contenidoRoutes = require("./routes/contenidoRouter");
const generoRoutes = require("./routes/generosRouter");
const avatarRoutes = require('./routes/avatarsRouter');
const contenidoSeeder = require('./db/seeders/02-contenido'); // Importamos datos para el portfolio

// --- SWAGGER CONFIGURACIÓN ---
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Netflix Clone API',
            version: '1.0.0',
            description: 'API para plataforma de streaming tipo Netflix',
        },
        servers: [
            {
                url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Busca anotaciones en todos los archivos de la carpeta routes
};

app.use(express.json()) 
app.use(cors());

app.use('/usuario', usuarioRoutes);
app.use('/perfil', perfilRoutes);
app.use('/contenido', contenidoRoutes);
app.use('/genero', generoRoutes);
app.use('/api/avatars', avatarRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// --- RUTA DOCUMENTACIÓN ---
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=>{
    console.log(`Aplicación corriendo en el puerto: ${PORT}`)

    try {
        // Usamos force: false para intentar mantener datos, pero si Render reinicia, se recrean las tablas.
        await db.sequelize.sync({ force: false });
        console.log("Base de datos sincronizada correctamente");

        // --- LÓGICA PORTFOLIO: AUTO-CARGA DE DATOS ---
        // Si la base de datos está vacía (tras un reinicio de Render), cargamos el contenido automáticamente.
        const cantidadContenidos = await db.Contenido.count();
        if (cantidadContenidos === 0) {
            console.log("Base de datos vacía. Cargando películas y series para el Portfolio...");
            const queryInterface = db.sequelize.getQueryInterface();
            await contenidoSeeder.up(queryInterface, db.Sequelize);
            console.log("¡Datos cargados! La app está lista para interactuar.");
        }
    } catch (error) {
        console.error("Error al sincronizar la base de datos:", error);
    }
});
