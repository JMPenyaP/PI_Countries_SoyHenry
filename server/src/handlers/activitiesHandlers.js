const { createActivity, getAllActivities } = require("../controllers/activitiesController");

//! Crear Actividad
const createActivitiesHandler = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        const newActivity = await createActivity(name, difficulty, duration, season, countries);
        res.status(200).json({ success: true, data: newActivity });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Error al crear nueva Actividad. " + error.message });
    };
};

//! Obtener las Actividades
const getActivitiesHandler = async (req, res) => {
    try {
        const allActivities = await getAllActivities();
        res.status(200).json({ success: true, data: allActivities });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "No se encontraron Actividades. " + error.message });
    }
};

module.exports = {
    getActivitiesHandler,
    createActivitiesHandler
};