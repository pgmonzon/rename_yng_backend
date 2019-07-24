const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoginSchema = new Schema({
  usuarioId: { type: Schema.ObjectId },
  usuario: { type: String, required: true },
  nombre: { type: String, required: false },
  apellido: { type: String, required: false },
  token: { type: String }
});

module.exports = mongoose.model('Login', LoginSchema);
