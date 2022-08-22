const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");

const usuariosGet = async (req, res = response) => {
  const query = { estado: true };
  const { limite = 5, desde = 0 } = req.query;

  const [totalRegistros, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({ totalRegistros, usuarios });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, contraseña, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, contraseña, rol });

  //encriptar contraseña
  const salt = bcrypt.genSaltSync(10);
  usuario.contraseña = bcrypt.hashSync(contraseña, salt);

  //guardar bd

  await usuario.save();
  res.json(usuario);
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, contraseña, correo, google, ...resto } = req.body;

  //validar contra base de datos
  if (contraseña) {
    //encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    resto.contraseña = bcrypt.hashSync(contraseña, salt);
  }

  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
  console.log(usuarioDB);

  res.json(usuarioDB);
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
