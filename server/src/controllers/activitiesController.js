const { Activity } = require("../db"); // importamos modelo

//! Crear Actividad
const createActivity = async (nombre, dificultad, duracion, temporada, countryIds) => {
    const newActivity = await Activity.create({ nombre, dificultad, duracion, temporada });

    await newActivity.setCountries(countryIds); // Asociación

    return newActivity;
};

module.exports = { createActivity };
