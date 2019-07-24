const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  usuario: { type: String, required: true },
  clave: { type: String, required: true },
  nombre: { type: String, required: false },
  apellido: { type: String, required: false }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
