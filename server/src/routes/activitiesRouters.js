const { Router } = require("express");
// Creamos una instancia de Router.
const activitiesRouters = Router();

const { getActivitiesHandler, createActivitiesHandler, getAllActivitiesHandler } = require("../handlers/activitiesHandlers");

//activitiesRouters.get("/", getActivitiesHandler);
activitiesRouters.post("/", createActivitiesHandler);
activitiesRouters.get("/", getAllActivitiesHandler);

module.exports = activitiesRouters;
