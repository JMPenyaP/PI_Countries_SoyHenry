// Importamos la biblioteca Express, que se utiliza para crear aplicaciones web y APIs en Node.js.
const express = require("express");
// Importamos el módulo de rutas desde el archivo "./routes".
const router = require("./routes/index");
// Importamos la biblioteca Morgan, que se utiliza para registrar solicitudes HTTP en la consola con diversos formatos.
const morgan = require("morgan");
// Importamos la biblioteca Cors, que se utiliza para habilitar el intercambio de recursos entre diferentes dominios.
const cors = require("cors");
// Creamos una instancia de la aplicación Express.
const server = express();
//===MIDDLEWARES
// Usamos el middleware Morgan con el formato "dev" para registrar las solicitudes en la consola.
server.use(morgan("dev"));
// Configuramos Express para analizar las solicitudes entrantes con formato JSON.
server.use(express.json());
// Habilitamos el middleware Cors para permitir solicitudes de diferentes dominios.
server.use(cors());
//======
// Usamos el módulo de rutas importado para manejar las rutas y las solicitudes en la aplicación.
server.use(router);
// Exportamos la instancia de la aplicación configurada con todos los middlewares y rutas.
module.exports = server;
