import mongoose from 'mongoose';

const ServicoPublicoSchema = new mongoose.Schema({
  codigoServico: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{2}-[0-9]{4}$/
  },
  nome: {
    type: String,
    required: true,
    index: 'text',
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 500
  },
  categoria: {
    type: String,
    enum: ['assistencia_social', 'saude', 'educacao', 'trabalho', 'habitação', 'outros'],
    required: true
  },
  publicoAlvo: {
    type: String,
    required: true
  },
  requisitos: [{
    titulo: String,
    descricao: String,
    documentos: [String]
  }],
  comoAcessar: {
    online: {
      url: String,
      descricao: String
    },
    presencial: {
      locais: [{
        tipo: String,
        endereco: String,
        horario: String
      }]
    },
    telefone: String
  },
  beneficios: [{
    tipo: String,
    valor: String,
    periodicidade: String
  }],
  atualizadoEm: {
    type: Date,
    default: Date.now,
    index: true
  },
  esferaGoverno: {
    type: String,
    enum: ['federal', 'estadual', 'municipal'],
    required: true
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  autoIndex: process.env.NODE_ENV !== 'production'
});

export default mongoose.model('ServicoPublico', ServicoPublicoSchema);