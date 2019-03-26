const express = require('express');
const routerJWT = express.Router();
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

routerJWT.use((req, res, next) => {
  var token = req.headers['x-access-token'];

  if (token) {
    const verifyOptions = {
      audience: req.hostname,
      expiresIn: config.expiraEn,
      algorithm: config.algoritmo
    }
    jwt.verify(token, fs.readFileSync(config.pathKeys+'/public.key', 'utf8'), verifyOptions, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'token inválido'
        });
      } else {
        process.env['USR_LOGUEADO'] = decoded.usuario;
        process.env['ID_LOGUEADO'] = decoded.id;
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'sin token'
    });
  }
});

module.exports = routerJWT;
