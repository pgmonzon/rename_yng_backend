const Permiso = require('../models/permiso');
const permisoCtrl = {};
const msj = require('../_helpers/mensajes');
const eH = require('../_helpers/error');

permisoCtrl.createPermiso = async (req, res) => {
  try {
    const permiso = new Permiso({
      permiso: req.body.permiso,
      descripcion: req.body.descripcion,
      metodo: req.body.metodo,
      url: req.body.url,
      activo: req.body.activo,
      borrado: false
    });
    await permiso
      .save()
      .catch(error => {
        if (error.name === 'MongoError' && error.code === 11000) {
          eH.throwError(400, 'BadRequest', 'Sorry ya existe') ()
        } else {
          eH.throwError(error.status, error.type)(error)
        }
      })
      msj.sendSuccess(req, res, 'permisos', 'Creaste el permiso')(permiso)
  } catch (error) {
    msj.sendError(req, res, 'errorPermisos')(error)
  }
}

module.exports = permisoCtrl;
