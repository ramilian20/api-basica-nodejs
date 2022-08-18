const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");

const usuariosGet = (req, res = response) => {
  res.json({
    msg: "get api - controller",
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, contraseña, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, contraseña, rol });

  //validar que el nombre sea enviado

  //verificar si el correo ya existe
  const correoExiste = await Usuario.findOne({ correo });
  if (correoExiste) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }

  //encriptar contraseña
  const salt = bcrypt.genSaltSync(10);
  usuario.contraseña = bcrypt.hashSync(contraseña, salt);

  //guardar bd

  await usuario.save();
  res.json({
    usuario,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  console.log(id);
  res.json({
    msg: "put api - controller",
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json("patch api - controller");
};

const usuariosDelete = (req, res = response) => {
  res.json("delete api - controller");
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
