const { DataTypes } = require('sequelize');
// Función para capitalizar palabras del Atributo Nombre
function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Country", {
    id: {
      type: DataTypes.STRING, // (3)Define el tipo de dato como una cadena de longitud 3
      primaryKey: true, // Define como primary key
      allowNull: false, // No permite valores nulos
      /*validate: {
        is: /^[A-Za-z]{3}$/ // Expresión regular para tres letras (mayúsculas o minúsculas)
      }*/
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bandera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poblacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
    { timestamps: false },
    {
      hooks: {
        beforeValidate: (instance) => {
          if (instance.id) {
            instance.id = instance.id.toUpperCase(); // Convierte a mayúsculas antes de validar
          }
        },
        beforeCreate: (instance) => {
          instance.nombre = capitalizeWords(instance.nombre);
        },
        beforeUpdate: (instance) => {
          instance.nombre = capitalizeWords(instance.nombre);
        },
      }
    },
  );
};