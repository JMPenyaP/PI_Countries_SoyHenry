const { createCountry, getCountryById, getAllCountries, getCountryByName, getAllCountriesWithActivities, getCountriesWithActivityByName } = require("../controllers/countriesController");

//! Obtener detalle de un País por Nombre / todos los Países
const getCountriesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const countryByName = await getCountryByName(name);
            res.status(200).json(countryByName);
        } else {
            const response = await getAllCountries();
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    };

};

//! Obtener detalles de un País por ID
const detailCountriesHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getCountryById(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//! Crear un nuevo País
const createCountryHandler = async (req, res) => {
    const { id, name, flag, continent, capital, subregion, area, population } = req.body;
    try {
        const response = await createCountry(id, name, flag, continent, capital, subregion, area, population)
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({ error: error.message }) // El error que me de la conexión
    }
};

//! Obtener todos los países con actividades
const getCountriesWithActivitiesHandler = async (req, res) => {
    const { activityName } = req.query;
    try {
        if (activityName) {
            const countryActivityByName = await getCountriesWithActivityByName(activityName);
            res.status(200).json(countryActivityByName);
        } else {
            const response = await getAllCountriesWithActivities();
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getCountriesHandler,
    detailCountriesHandler,
    createCountryHandler,
    getCountriesWithActivitiesHandler,
};