const { createActivity, getAllActivities, getActivityByName } = require("../controllers/activitiesController");

//! Crear Actividad
const createActivitiesHandler = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        const newActivity = await createActivity(name, difficulty, duration, season, countries);
        res.status(200).json({ success: true, data: newActivity });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al crear nueva Actividad. " + error.message });
    };
};

//! Obtener todas las Actividades
const getAllActivitiesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const activityByName = await getActivityByName(name);
            res.status(200).json(activityByName);
        } else {
            const response = await getAllActivities();
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    };

};

module.exports = {
    createActivitiesHandler,
    getAllActivitiesHandler,
};

/*
//! Obtener las Actividades
const getActivitiesHandler = async (req, res) => {
    try {
        const allActivities = await getAllActivities();
        res.status(200).json({ success: true, data: allActivities });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "No se encontraron Actividades. " + error.message });
    }
};*/