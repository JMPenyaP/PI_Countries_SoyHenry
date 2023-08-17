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
            type: DataTypes.TIME,
            allowNull: false,
            get() { // Método ara formatear el valor de duración "2 horas"
                const hours = this.getDataValue("duracion");
                const formattedHours = hours ? `${hours} horas` : null;
                return formattedHours;
            },
        },
        temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false,
        },
    },
        { timestamps: false }
    );
};