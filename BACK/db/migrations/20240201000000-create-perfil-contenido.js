'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PerfilContenidos', {
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PerfilContenidos');
    }
};