'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Avatars', [
        { nombre: 'Avatar 1', url: '/images/avatars/avatar_1.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 2', url: '/images/avatars/avatar_2.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 3', url: '/images/avatars/avatar_3.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 4', url: '/images/avatars/avatar_4.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 5', url: '/images/avatars/avatar_5.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 6', url: '/images/avatars/avatar_6.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 7', url: '/images/avatars/avatar_7.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 8', url: '/images/avatars/avatar_8.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 9', url: '/images/avatars/avatar_9.png', createdAt: new Date(), updatedAt: new Date() },
        { nombre: 'Avatar 10', url: '/images/avatars/avatar_10.png', createdAt: new Date(), updatedAt: new Date() }
        ], { ignoreDuplicates: true });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Avatars', null, {});
    }
};
