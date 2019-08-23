const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermisoSchema = new Schema({
  permiso: { type: String, unique: true, required: true },
  descripcion: { type: String, required: false },
  metodo: { type: String, required: true},
  url: { type: String, required: true},
  activo: { type: Boolean, requires: true},
  borrado: { type: Boolean, required: false}
});
//PermisoSchema.index({ permiso: 1 });

module.exports = mongoose.model('Permiso', PermisoSchema);
