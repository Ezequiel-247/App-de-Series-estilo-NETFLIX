'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PerfilContenido extends Model {
    static associate(models) {
    }
  }
  PerfilContenido.init({
    perfilId: DataTypes.INTEGER,
    contenidoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PerfilContenido',
    tableName: 'PerfilContenidos' // evita pluralización incorrecta
  });
  return PerfilContenido;
};