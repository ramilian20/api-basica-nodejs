const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbconexion } = require("../database/configdb");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //conexion a la base de datos
    this.conectardb();

    //midelwares de mi aplicacion
    this.midelwares();

    //rutas de mi aplicacion
    this.routes();
  }

  async conectardb() {
    await dbconexion();
  }

  //midelware
  midelwares() {
    //middleware de cors
    this.app.use(cors());

    //parseo y lectura del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor escuchando en el puerto: ", this.port);
    });
  }
}
module.exports = Server;
