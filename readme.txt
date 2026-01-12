PROYECTO: CLON DE NETFLIX (App de Series)
=========================================

DESCRIPCIÓN
-----------
Este es un proyecto Full Stack desarrollado como práctica personal para simular la experiencia de usuario de Netflix. La aplicación permite el registro de usuarios, gestión de múltiples perfiles, exploración de catálogo de películas y series, reproducción de trailers y gestión de una lista de favoritos ("Mi Lista").

AUTOR
-----
Eduardo Ezequiel Ortiz

TECNOLOGÍAS UTILIZADAS
----------------------
Frontend:
- React.js (Hooks: useState, useEffect, useContext, useRef)
- React Router DOM (Navegación SPA)
- CSS3 (Diseño Responsivo, Flexbox, Grid, Animaciones)
- Fetch API (Consumo de datos)

Backend:
- Node.js
- Express.js (Servidor REST API)
- Sequelize (ORM)
- SQLite (Base de datos relacional)

CARACTERÍSTICAS PRINCIPALES
---------------------------
1. Autenticación:
   - Registro de nuevos usuarios.
   - Inicio de sesión (Login).
   - Persistencia de sesión.

2. Gestión de Perfiles:
   - Creación de hasta 3 perfiles por usuario.
   - Selección de avatares predefinidos desde el servidor.
   - Eliminación de perfiles.

3. Exploración de Contenido:
   - Banner principal dinámico con contenido destacado aleatorio.
   - Carruseles de desplazamiento horizontal para "Películas", "Series" y "Mi Lista".
   - Reproducción de trailers (integración con YouTube).
   - Buscador en tiempo real por título.

4. Mi Lista:
   - Funcionalidad para agregar y quitar contenido de favoritos.
   - Persistencia en base de datos (Relación N:M).

5. Diseño Responsivo:
   - Adaptable a dispositivos móviles y escritorio.
   - Menú de navegación lateral (tipo App nativa) en móviles.
   - Animaciones de interfaz (Intro de bienvenida, Hover en tarjetas, Transiciones de menú).

