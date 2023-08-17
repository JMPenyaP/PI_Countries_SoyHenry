const { Router } = require("express");
// Creamos una instancia de Router.
const activitiesRouters = Router();

const { getActivitiesHandler, createActivitiesHandler } = require("../handlers/activitiesHandlers")

activitiesRouters.get("/", getActivitiesHandler);

activitiesRouters.post("/", createActivitiesHandler);
// Exportamos el router configurado.
module.exports = activitiesRouters;
