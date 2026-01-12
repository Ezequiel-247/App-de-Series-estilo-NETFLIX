'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episodio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Episodio.belongsTo(models.Contenido, {
        foreignKey: 'contenidoId'
      });
    }
  }
  Episodio.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    videoUrl: DataTypes.STRING,
    numero_temporada: DataTypes.INTEGER,
    numero_episodio: DataTypes.INTEGER,
    contenidoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Episodio'
  });
  return Episodio;
};