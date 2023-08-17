// Importamos la biblioteca Axios, que se utiliza para hacer solicitudes HTTP desde Node.js.
const axios = require("axios");

// Importamos el módulo "server" desde el archivo "./src/server". Esto probablemente sea el punto de entrada de nuestro servidor.
const server = require("./src/server");

// Importamos el objeto "conn" desde el archivo "./src/db.js". Esto está relacionado con la conexión a la base de datos.
const { conn } = require('./src/db.js');

// Definimos el número de puerto en el que se ejecutará nuestro servidor.
const PORT = 3001;

// Sincronizamos la base de datos. "sync" es un método de Sequelize que se utiliza para crear tablas según los modelos definidos.
// La opción "{ force: true }" indica que la sincronización eliminará y volverá a crear las tablas en cada ejecución.
conn.sync({ force: true }).then(() => {
  // Iniciamos el servidor para que escuche en el puerto definido.
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => {
  // En caso de que ocurra un error durante la sincronización de la base de datos o al iniciar el servidor, lo registramos en la consola.
  console.error(error);
});
