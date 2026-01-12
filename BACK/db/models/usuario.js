'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Relacion 1 a N con tabla Perfil
      this.hasMany(models.Perfil,{
        foreignKey: 'usuarioId',
        as: 'perfiles',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Usuario'
  });
  return Usuario;
};