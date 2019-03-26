const express = require('express');
const routerPermiso = express.Router();

const permiso = require('../controllers/permiso.controller');

//routerPermiso.get('/', permiso.getPermisos);
routerPermiso.post('/', permiso.createPermiso);
//routerPermiso.get('/:id', permiso.getPermiso);
//routerPermiso.put('/:id', permiso.editPermiso);
//routerPermiso.delete('/:id', permiso.deletePermiso);

module.exports = routerPermiso;
