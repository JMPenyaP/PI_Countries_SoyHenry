const { Country, Activity, Country_Activities } = require("../db");
const { Op } = require("sequelize");
//const axios = require("axios");

//! Crear un nuevo País
const createCountry = async (id, name, flag, continent, capital, subregion, area, population) => {
    return await Country.create({ id, name, flag, continent, capital, subregion, area, population });
};

//! Obtener un País por ID
const getCountryById = async (id) => {
    try {
        const dbCountry = await Country.findOne({
            where: { id },
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: ["CountryId", "ActivityId"] }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        if (dbCountry) {
            return dbCountry;
        } else {
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

    /*     const apiCountryResponse = (await axios.get("http://localhost:5000/countries/")).data;
        const apiCountry = cleanerApiInfo(apiCountryResponse);
        return [...dbCountry, ...apiCountry]; */

    return dbCountry;
};

//! Obtener un País por Nombre
const getCountryByName = async (name) => {
    const dbCountry = await Country.findAll({ where: { name: name } });
    return dbCountry;
};

//! Obtener Países con al menos una Actividad
const getAllCountriesWithActivities = async () => {
    const countriesWithActivities = await Country.findAll({
        include: [
            {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: [] }
            }
        ],
        where: {
            "$Activities.id$": {
                [Op.not]: null
            }
        }
    });

    return countriesWithActivities;
};

//! Obtener Países con una Actividad especifica
const getCountriesWithActivityByName = async (activityName) => {
    const countriesWithSpecificActivity = await Country.findAll({
        include: [
            {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: ["CountryId", "ActivityId"] },
                where: {
                    name: activityName
                }
            }
        ]
    });

    return countriesWithSpecificActivity;
};


module.exports = {
    createCountry,
    getCountryById,
    getAllCountries,
    getCountryByName,
    getAllCountriesWithActivities,
    getCountriesWithActivityByName,
};