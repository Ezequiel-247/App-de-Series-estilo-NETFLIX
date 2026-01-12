'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) crear tabla nueva con FK hacia 'Perfils'
    await queryInterface.createTable('PerfilContenidos_new', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      perfilId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Perfils',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      contenidoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contenidos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 2) copiar datos desde la tabla antigua
    await queryInterface.sequelize.query(
      "INSERT INTO `PerfilContenidos_new` (id, perfilId, contenidoId, createdAt, updatedAt) SELECT id, perfilId, contenidoId, createdAt, updatedAt FROM `PerfilContenidos`;"
    );

    // 3) eliminar la tabla antigua y renombrar la nueva
    await queryInterface.dropTable('PerfilContenidos');
    await queryInterface.renameTable('PerfilContenidos_new', 'PerfilContenidos');
  },

  async down(queryInterface, Sequelize) {
    // Revertir: recrear la tabla con la referencia antigua a 'Perfiles'
    await queryInterface.createTable('PerfilContenidos_old', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      perfilId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Perfiles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      contenidoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contenidos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.sequelize.query(
      "INSERT INTO `PerfilContenidos_old` (id, perfilId, contenidoId, createdAt, updatedAt) SELECT id, perfilId, contenidoId, createdAt, updatedAt FROM `PerfilContenidos`;"
    );

    await queryInterface.dropTable('PerfilContenidos');
    await queryInterface.renameTable('PerfilContenidos_old', 'PerfilContenidos');
  }
};