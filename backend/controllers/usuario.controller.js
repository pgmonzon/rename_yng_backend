const Usuario = require('../models/usuario');
const usuarioCtrl = {};
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config/config');


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
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Acceso denegadowwwwwww'
    });
  })
  if (usuario) {
    const payload = {
      usuario : usuario.usuario
    };
    const signOptions = {
      subject: req.body.usuario,
      audience: req.hostname,
      expiresIn: config.expiraEn,
      algorithm: config.algoritmo
    };

    const token = jwt.sign(payload, fs.readFileSync(config.pathKeys+'/private.key', 'utf8'), signOptions);
    res.status(200).json({
      success: true,
      message: 'Token',
      token: token
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Acceso denegado'
    });
  }
}

module.exports = usuarioCtrl;
