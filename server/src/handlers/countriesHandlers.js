const { createCountry, getCountryById, getAllCountries, getCountryByName } = require("../controllers/countriesController");

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
    const { id, nombre, bandera, continente, capital, subregion, area, poblacion } = req.body;
    try {
        const response = await createCountry(id, nombre, bandera, continente, capital, subregion, area, poblacion)
        res.status(200).json(response) // estamos devolviendo un objeto
    }
    catch (error) {
        res.status(400).json({ error: error.message }) // El error que me de la conexión
    }
};

module.exports = {
    getCountriesHandler,
    detailCountriesHandler,
    createCountryHandler,
};