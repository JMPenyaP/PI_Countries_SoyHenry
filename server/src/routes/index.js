const { Router } = require("express");
const countriesRouters = require("./countriesRouters");
const activitiesRouters = require("./activitiesRouters");

const router = Router(); // Creamos una instancia de Router

// Creamos la redirección al router correspondiente
router.use("/countries", countriesRouters);
router.use("/activities", activitiesRouters);

module.exports = router; // Exportamos el router configurado
