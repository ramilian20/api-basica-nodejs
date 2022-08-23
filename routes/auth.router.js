const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { validateLogin } = require("../middlewares/auth.login.validator");
const router = Router();

router.post("/login", validateLogin, login);

module.exports = router;
