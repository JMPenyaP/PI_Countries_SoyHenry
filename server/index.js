const axios = require("axios"); // Importamos la biblioteca Axios, que se utiliza para hacer solicitudes HTTP desde Node.js.
const server = require("./src/server"); // Importamos el módulo "server"
const { conn, Country } = require('./src/db.js'); // Importamos el objeto "conn". Esto está relacionado con la conexión a la base de datos.
const API = "http://localhost:5000/countries";
const { cleanerApiInfo } = require("./src/utils/index");
const PORT = 3001;

// Sincronizamos la base de datos. "sync" es un método de Sequelize que se utiliza para crear tablas según los modelos definidos.
// La opción "{ force: true }" indica que la sincronización eliminará y volverá a crear las tablas en cada ejecución.
conn.sync({ force: true }).then(() => {
  // Iniciamos el servidor para que escuche en el puerto definido.
  server.listen(PORT, async () => {
    const countriesFromAPI = await Country.findAll(API);
    if (!countriesFromAPI.length) {
      const response = await axios.get(API);
      const cleanResponse = cleanerApiInfo(response.data);
      await Country.bulkCreate(cleanResponse);
      console.log(allCountries);
    }
  });
}).catch(error => { console.error(error); });
