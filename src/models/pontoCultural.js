import mongoose from 'mongoose';

const PontoCulturalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true,
    index: 'text'
  },
  tipo: {
    type: String,
    enum: ['museu', 'teatro', 'biblioteca', 'centro_cultural', 'galeria'],
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  endereco: {
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cep: String
  },
  acessibilidade: Boolean,
  horarioFuncionamento: String,
  atualizadoEm: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { 
  timestamps: true,
  autoIndex: process.env.NODE_ENV !== 'production'
});

export default mongoose.model('PontoCultural', PontoCulturalSchema);