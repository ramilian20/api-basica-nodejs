const { check } = require("express-validator");
const { validateResult } = require("../helpers/validatehelper");
const Role = require("../models/rol.model");
const Usuario = require("../models/usuario.model");

const validateCreate = [
  check("nombre").exists().not().isEmpty(),
  check("correo").exists().isEmail(),
  check("correo").custom(async (correo = "") => {
    const correoExiste = await Usuario.findOne({ correo });
    if (correoExiste) {
      throw new Error(`El correo ${correo} ya esta registrado`);
    }
  }),

  check("contraseña").isLength({ min: 6 }),
  //check("rol").isIn(["ADMIN_ROL", "USER_ROL"]),
  check("rol").custom(async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`Èl rol ${rol} no esta registrado en la base de datos`);
    }
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateCreate,
};
