const express = require('express');
const app = express();
const Audit = require('../models/audit');
const msj = {};

msj.sendSuccess = (req, res, coleccion, message) => data => {
  const success = true;
  if (!data) data = ({})
  audit(req, success, message, data, coleccion);
  res.status(200).json({success: success, message, data});
}

msj.sendError = (req, res, coleccion, status, message) => data => {
  const success = false;
  const mensaje = message || data.message;
  audit(req, success, mensaje, data, coleccion);
  res.status(status || data.status).json({
    success: success,
    message: mensaje,
    data
  });
}

async function audit(req, success, message, data, coleccion) {
  const audit = new Audit({
    usuario_id: process.env.ID_LOGUEADO,
    usuario: process.env.USR_LOGUEADO,
    ip: req.ip,
    metodo: req.method,
    direccion: req.originalUrl,
    success: success,
    message: message,
    data: data,
    coleccion: coleccion
  });
  await audit
    .save()
}

module.exports = msj;
