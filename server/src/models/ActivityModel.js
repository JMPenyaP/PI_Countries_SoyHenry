const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // Defino el modelo
    sequelize.define("Activity", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificultad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            /*get() {
                const formattedHours = `${this.duracion} horas`;
                return formattedHours;
            },*/
        },
        temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false,
        },
    },
        { timestamps: false }
    );
};