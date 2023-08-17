const { Router } = require("express");

const countriesRouters = Router(); // Creamos una instancia de Router

const { getCountriesHandler, detailCountriesHandler, createCountryHandler } = require("../handlers/countriesHandlers")

countriesRouters.get("/", getCountriesHandler);

countriesRouters.get("/:id", detailCountriesHandler);

countriesRouters.post("/", createCountryHandler);


module.exports = countriesRouters; // Exportamos el router configurado
