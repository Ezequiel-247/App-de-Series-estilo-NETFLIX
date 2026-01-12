'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfil extends Model {
    static associate(models) {
      
      // Relación con Usuario
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      });

      // Relación N:N con Pelicula
      this.belongsToMany(models.Contenido, {
        through: models.PerfilContenido,
        as: 'contenidos',
        foreignKey: 'perfilId',
        otherKey: 'contenidoId'
      });

      // Relación con Avatar
      this.belongsTo(models.Avatar, { 
        foreignKey: 'avatarId', 
        as: 'avatar' 
      });
    }
  }

  Perfil.init({
    nombre_perfil: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatarId: {  // clave foránea hacia Avatar
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usuarioId: {  
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Perfil',
    tableName: 'Perfils'
  });
  return Perfil;
};
