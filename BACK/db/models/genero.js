'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      //Relacion 1 a N con tabla Pelicula
      this.hasMany(models.Contenido,{
        foreignKey:'generoId',
        as: 'contenidos'
      });
    }
  }
  Genero.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Genero'
  });
  return Genero;
};