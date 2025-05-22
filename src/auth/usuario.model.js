import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true }, // Campo "login" conforme doc
  senha: { type: String, required: true }
});

// Método para comparar senhas
usuarioSchema.methods.compararSenha = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

export default mongoose.model('Usuario', usuarioSchema);