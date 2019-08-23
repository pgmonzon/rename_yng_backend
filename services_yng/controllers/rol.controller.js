const Rol = require('../models/rol');
const rolCtrl = {};

rolCtrl.getRoles = async (req, res) => {
  const roles = await Rol.find()
  res.json(roles);
}

rolCtrl.createRol = async (req, res) => {
  const rol = new  Rol({
    rol: req.body.rol,
    estado: req.body.estado
  });
  await rol.save();
  console.log(rol);
  res.json({
    'status': 'Rol creado'
  });
}

rolCtrl.getRol = async (req, res) => {
  const rol = await Rol.findById(req.params.id);
  res.json(rol);
}

rolCtrl.editRol = async (req, res) => {
  const { id } = req.params;
  const rol = {
    rol: req.body.rol,
    estado: req.body.estado
  }
  await Rol.findOneAndUpdate(id, {$set: rol}, {new: true});
  res.json({status: 'Rol Actualizado'});
}

rolCtrl.deleteRol = async (req, res) => {
  await Rol.findOneAndDelete(req.params.id);
  res.json({status: 'Rol Borrado'});
}

module.exports = rolCtrl;
