const axios = require("axios"); // Importamos la biblioteca Axios, que se utiliza para hacer solicitudes HTTP desde Node.js.
const server = require("./src/server"); // Importamos el módulo "server"
const { conn, Country } = require('./src/db.js'); // Importamos el objeto "conn". Esto está relacionado con la conexión a la base de datos.
const { cleanerApiInfo } = require("./src/utils/index");

const API = "http://localhost:5000/countries";
const PORT = 3001;

// Sincronizamos la base de datos. "sync" es un método de Sequelize que se utiliza para crear tablas según los modelos definidos.
// La opción "{ force: true }" indica que la sincronización eliminará y volverá a crear las tablas en cada ejecución.
conn.sync({ force: false }).then(async () => {
  try {
    server.listen(PORT, async () => { // Iniciamos el servidor para que escuche en el puerto definido
      try {
        const countriesFromAPI = await Country.findAll();
        if (!countriesFromAPI.length) {
          const response = await axios.get(API);
          const cleanResponse = cleanerApiInfo(response.data);
          await Country.bulkCreate(cleanResponse);

          /*const { data } = await axios.get(API);
          const cleanApiInfo = data.map((info) => ({
            id: info.cca3,
            name: info.name.common,
            flag: info.flags.svg,
            continent: info.continents[0],
            capital: info.capital ? info.capital[0] : 'Capital doesnt exist',
            subregion: info.subregion ? info.subregion : 'Subregion doesnt exist',
            area: info.area,
            population: info.population,
          }));
          await Country.bulkCreate(cleanApiInfo)*/
        }
      } catch (error) {
        console.error("Error while fetching and processing API data:", error);
      }
    });
  } catch (error) {
    console.error("Error while starting the server:", error);
  }
})
  .catch(error => {
    console.error("Error while syncing the database:", error);
  });
