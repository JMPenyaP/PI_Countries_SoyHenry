const axios = require("axios");
const { Country, Activity } = require("../db");
const { cleanerApiInfo } = require("../utils/index");

//! Crear un nuevo País
const createCountry = async (id, nombre, bandera, continente, capital, subregion, area, poblacion) => {
    return await Country.create({ id, nombre, bandera, continente, capital, subregion, area, poblacion });
};

//! Obtener un País por ID
const getCountryById = async (id) => {
    try {
        const dbCountry = await Country.findOne({
            where: { id },
            include: {
                model: Activity,
                attributes: ["nombre", "dificultad"],
                through: { attributes: ["CountryId", "ActivityId"] }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        }); // Buscamos en la DDBB

        if (dbCountry) { // Si se encuentra en la DDBB, retornar ese país
            return dbCountry;
        }

        // Si no se encuentra en la DDBB, buscar en la API local
        const apiUrl = `http://localhost:5000/countries/?cca3=${id}`; // CCA3 ISO 3166-1 alpha3
        const response = await axios.get(apiUrl);
        const cleanResponse = cleanerApiInfo(response.data);

        if (cleanResponse) { // Si se encuentra en la API, retornar ese país
            return cleanResponse;
        } else { // Si no se encuentra ni en la DDBB ni en la API, retornar un mensaje de error
            throw new Error("País no encontrado");
        }
    }
    catch (error) {
        throw new Error("Error al obtener el país: " + error.message);
    }
};

//! Obtener todos los Países
const getAllCountries = async () => {
    const dbCountry = await Country.findAll();

    const apiCountryResponse = (await axios.get("http://localhost:5000/countries/")).data;
    const apiCountry = cleanerApiInfo(apiCountryResponse);

    return [...dbCountry, ...apiCountry];
};

//! Obtener un País por Nombre
const getCountryByName = async (name) => {
    const apiCountryResponse = (await axios.get("http://localhost:5000/countries/")).data;
    const apiCountry = cleanerApiInfo(apiCountryResponse);

    const countryFilter = apiCountry.filter((country) => country.nombre === name);

    const dbCountry = await Country.findAll({ where: { nombre: name } });

    return [...countryFilter, ...dbCountry];
};

module.exports = {
    createCountry,
    getCountryById,
    getAllCountries,
    getCountryByName
};