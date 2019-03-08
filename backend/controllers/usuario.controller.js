const Usuario = require('../models/usuario');
const usuarioCtrl = {};
const jwt = require('jsonwebtoken');

usuarioCtrl.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find()
  res.json(usuarios);
}

usuarioCtrl.createUsuario = async (req, res) => {
  const usuario = new  Usuario({
    usuario: req.body.usuario,
    clave: req.body.clave
  });
  await usuario.save();
  console.log(usuario);
  res.json({
    'status': 'Usuario creado'
  });
}

usuarioCtrl.getUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
}

usuarioCtrl.editUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = {
    usuario: req.body.usuario,
    clave: req.body.clave
  }
  await Usuario.findOneAndUpdate(id, {$set: usuario}, {new: true});
  res.json({status: 'Usuario Actualizado'});
}

usuarioCtrl.deleteUsuario = async (req, res) => {
  await Usuario.findOneAndDelete(req.params.id);
  res.json({status: 'Usuario Borrado'});
}

usuarioCtrl.loginUsuario = async (req, res) => {
  const usuario = await Usuario.findOne({
    'usuario': req.body.usuario,
    'clave': req.body.clave
  })
  if (usuario) {
    const token = jwt.sign({usuario}, req.app.get('superSecret'));
    res.json({
      success: true,
      message: 'Token',
      token: token
    });
  } else {
    res.json({
      success: false,
      message: 'Acceso denegado'
    });
  }
}

module.exports = usuarioCtrl;
