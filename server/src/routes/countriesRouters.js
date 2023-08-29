const { Router } = require("express");

const countriesRouters = Router(); // Creamos una instancia de Router

const { getCountriesHandler, detailCountriesHandler, createCountryHandler, getAllCountriesWhitActivitiesHandler, getCountriesWithActivitiesHandler } = require("../handlers/countriesHandlers");

countriesRouters.get("/", getCountriesHandler);
countriesRouters.get("/activities", getCountriesWithActivitiesHandler);
countriesRouters.post("/", createCountryHandler);
countriesRouters.get("/:id", detailCountriesHandler);

module.exports = countriesRouters; // Exportamos el router configurado
