const { response } = require("express");

const usuariosGet = (req, res = response) => {
  res.json({
    msg: "get api - controller",
  });
};

const usuariosPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "post api - controller",
    body,
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
