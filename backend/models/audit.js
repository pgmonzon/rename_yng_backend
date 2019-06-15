const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuditSchema = new Schema({
  fecha: { type: Date, default: Date.now, required: false },
  usuario_id: { type: Schema.ObjectId, required: true},
  usuario: { type: String, required: true },
  ip: { type: String, required: false},
  metodo: { type: String, required: true },
  direccion: { type: String, required: true },
  success: { type: Boolean, requires: false },
  message: { type: String, requires: false },
  data: { type: [], required: false },
  coleccion: { type: String, required: false}
});

module.exports = mongoose.model('Audit', AuditSchema);
