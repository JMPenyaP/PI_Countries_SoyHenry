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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            /*get() {
                const formattedHours = `${this.duracion} horas`;
                return formattedHours;
            },*/
        },
        season: {
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
            allowNull: false,
        },
    },
        { timestamps: false }
    );
};