'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Agregamos la columna 'trailerUrl' a la tabla 'Contenidos'
    // NOTA: Si tu tabla en la base de datos todavía se llama 'Peliculas', cambia 'Contenidos' por 'Peliculas'
    await queryInterface.addColumn('Contenidos', 'trailerUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // En caso de revertir la migración, eliminamos la columna
    await queryInterface.removeColumn('Contenidos', 'trailerUrl');
  }
};
