const {
  validateCreate,
  validatePut,
  validateDelete,
} = require("../middlewares/usuarios.validator");
const { validarJWT } = require("../middlewares/jwt.validator");
const { AdminRol, tieneRol } = require("../middlewares/validar.roles");
