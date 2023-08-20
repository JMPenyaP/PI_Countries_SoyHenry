const { Activity } = require("../db"); // importamos modelo
const { op } = require('sequelize');

//! Crear Actividad
const createActivity = async (nombre, dificultad, duracion, temporada, countries) => {

    const newActivity = await Activity.create({ nombre, dificultad, duracion, temporada });

    const countryActivity = await newActivity.addCountry(countries);

    return countryActivity;
};

//! Obtener todos las Actividades
const getAllActivities = async () => {
    const allActivities = await Activity.findAll();

    return allActivities;
};

module.exports = { createActivity, getAllActivities };

/*//? Verificar la Actividad existe
const isRepeatActivity = await Activity.findOne({
    where: {
        nombre: nombre,
        dificultad: dificultad,
        duracion: duracion,
        temporada: temporada,
    }
});
console.log("============> isRepeatActivity:", isRepeatActivity);
if (!isRepeatActivity) {
    const newActivity = await Activity.create({ nombre, dificultad, duracion, temporada });

    const countryActivity = await newActivity.addCountry(searchCountryIds);
    console.log("======> que hay aquí: ", countryActivity);
    return countryActivity;
} else {
    const countryActivity = await isRepeatActivity.addCountry(searchCountryIds);
    return countryActivity;
};*/
