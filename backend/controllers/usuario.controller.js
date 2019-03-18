const Usuario = require('../models/usuario');
const usuarioCtrl = {};
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config/config');
const msj = require('../_helpers/mensajes');
const eH = require('../_helpers/error');

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
  try {
    // req.params.id cuando tiene que mandar el id
    if (!req.body.usuario || !req.body.clave) eH.throwError(400, 'BadRequest', 'Che, no mandaste el usuario o la clave') ()
    const usuario = await Usuario
      .findOne({'usuario': req.body.usuario, 'clave': req.body.clave})
      .then(
        eH.throwIf(r => !r, 403, 'Forbidden', 'Es una fiesta privada'),
        eH.throwError(500, 'InternalServerError')
      )

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
    msj.sendSuccess(res, 'Bueeenas')({token})
  } catch (error) {
    msj.sendError(res)(error)
  }
}

module.exports = usuarioCtrl;
