const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  usuario: { type: String, required: true },
  clave: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
