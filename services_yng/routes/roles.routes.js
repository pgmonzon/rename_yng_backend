const express = require('express');
const routerRol = express.Router();

const rol = require('../controllers/rol.controller');

routerRol.get('/', rol.getRoles);
routerRol.post('/', rol.createRol);
routerRol.get('/:id', rol.getRol);
routerRol.put('/:id', rol.editRol);
routerRol.delete('/:id', rol.deleteRol);

module.exports = routerRol;
