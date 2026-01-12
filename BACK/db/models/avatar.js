'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Avatar extends Model {
        static associate(models) {
        // Relación 1:N con Perfil
        this.hasMany(models.Perfil, { 
            foreignKey: 'avatarId', 
            as: 'perfiles' 
        });
        }
    }

    Avatar.init({
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        url: {
        type: DataTypes.STRING,
        allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Avatar',
    });

    return Avatar;
};
