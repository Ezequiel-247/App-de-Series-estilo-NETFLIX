'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contenido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      //Relacion 1 a N con tabla Genero
      this.belongsTo(models.Genero,{
        foreignKey: 'generoId',
        as: 'Genero'
      });

      //Relacion N a N con tabla perfil
      this.belongsToMany(models.Perfil,{
        through: models.PerfilContenido, //tabla intermedia renombrada
        as: 'perfiles',
        foreignKey: 'contenidoId',
        otherKey: 'perfilId'
      });

      // Relacion 1 a N con Episodios (Solo si es serie)
      this.hasMany(models.Episodio, {
        foreignKey: 'contenidoId',
        as: 'episodios'
      });
    }
  }
  Contenido.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true, // opcional
    },
    tipo: {
      type: DataTypes.STRING, // 'pelicula' o 'serie'
      allowNull: true // o false si quieres obligar a definirlo
    },
    esPopular: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fecha_estreno: {
      type: DataTypes.DATE,
      allowNull: true
    },
    trailerUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Link al video de YouTube
    },
    generoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    esFavorita: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Contenido'
  });
  return Contenido;
};