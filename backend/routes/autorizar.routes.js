const express = require('express');
const routerAutorizar = express.Router();

const usuario = require('../controllers/usuario.controller');

routerAutorizar.post('/', usuario.loginUsuario);

module.exports = routerAutorizar;
