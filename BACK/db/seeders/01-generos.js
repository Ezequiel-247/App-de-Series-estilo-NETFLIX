'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        // Insertamos los géneros con los IDs específicos que usa la semilla de contenido
        await queryInterface.bulkInsert('Generos', [
        {
            id: 1,
            nombre: 'Acción / Ciencia Ficción',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            nombre: 'Drama / Comedia',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            nombre: 'Animación / Familia',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ], { ignoreDuplicates: true });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Generos', null, {});
    }
};