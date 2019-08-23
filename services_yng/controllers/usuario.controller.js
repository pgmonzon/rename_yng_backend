const Usuario = require('../models/usuario');
const usuarioCtrl = {};
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config/config');
const msj = require('../_helpers/mensajes');
const eH = require('../_helpers/error');
const bcrypt = require('bcrypt');

usuarioCtrl.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find()
  res.json(usuarios);
}

usuarioCtrl.createUsuario = async (req, res) => {
  const usuario = new  Usuario({
    usuario: req.body.usuario,
    clave: bcrypt.hashSync(req.body.clave, config.saltRounds)
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
      .findOne({'usuario': req.body.usuario})
      .then(
        eH.throwIf(r => !r, 403, 'Forbidden', 'Es una fiesta privada'),
        eH.throwError(500, 'InternalServerError')
      )
    if (!bcrypt.compareSync(req.body.clave, usuario.clave)) eH.throwError(403, 'Forbidden', 'No hay mas lugar') ()

    const payload = {
      id: usuario._id,
      usuario : usuario.usuario
    };
    const signOptions = {
      subject: req.body.usuario,
      audience: req.hostname,
      expiresIn: config.expiraEn,
      algorithm: config.algoritmo
    };
    const token = jwt.sign(payload, fs.readFileSync(config.pathKeys+'/private.key', 'utf8'), signOptions);
    process.env['USR_LOGUEADO'] = usuario.usuario;
    process.env['ID_LOGUEADO'] = usuario._id;

    msj.sendSuccess(req, res, 'login', 'Bueeenas')({token})
  } catch (error) {
    msj.sendError(req, res, 'errorLogin')(error)
  }
}

module.exports = usuarioCtrl;
