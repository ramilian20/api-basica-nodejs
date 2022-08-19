const { Router } = require("express");
const {
  validateCreate,
  validatePut,
} = require("../validators/usuarios.validator");
const router = Router();
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/users.controller");

router.get("/", usuariosGet);
router.post("/", validateCreate, usuariosPost);
router.put("/:id", validatePut, usuariosPut);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
