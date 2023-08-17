const { createActivity } = require("../controllers/activitiesController");

//! Crear Actividad
const createActivitiesHandler = async (req, res) => {
    const { nombre, dificultad, duracion, temporada, countryIds } = req.body;
    try {
        const newActivity = await createActivity(nombre, dificultad, duracion, temporada, countryIds);
        res.status(200).json({ success: true, data: newActivity });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Error al crear nueva Actividad. " + error.message });
    };
};

//! Obtener las Actividades
const getActivitiesHandler = (req, res) => {
    res.status(200).send("Aquí están las actividades turísticas");
};

module.exports = {
    getActivitiesHandler,
    createActivitiesHandler
};