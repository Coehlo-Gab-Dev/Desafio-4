import mongoose from 'mongoose';

const EscolaSchema = new mongoose.Schema({
  codigoInep: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{8}$/
  },
  nome: {
    type: String,
    required: true,
    index: 'text',
    trim: true
  },
  nivel: {
    type: String,
    enum: ['infantil', 'fundamental', 'medio', 'profissionalizante', 'eja'],
    required: true
  },
  endereco: {
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cep: { type: String, match: /^[0-9]{5}-?[0-9]{3}$/ },
    cidade: { type: String, required: true },
    uf: { type: String, required: true, enum: ['MA'] }
  },
  contato: {
    telefone: { type: String, match: /^(\+?55)?\s?(\(?[0-9]{2}\)?)?\s?([0-9]{4,5})-?([0-9]{4})$/ },
    email: { type: String, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
  },
  matriculas: {
    total: { type: Number, min: 0 },
    porSerie: Map
  },
  infraestrutura: {
    acessivel: Boolean,
    laboratorios: Number,
    quadras: Number,
    biblioteca: Boolean
  },
  atualizadoEm: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true,
  autoIndex: process.env.NODE_ENV !== 'production'
});

export default mongoose.model('Escola', EscolaSchema);