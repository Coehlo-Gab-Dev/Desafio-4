import mongoose from 'mongoose';

const EstabelecimentoSchema = new mongoose.Schema({
  // Identificação (obrigatória)
  idCnes: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{7}$/,
    index: true
  },
  nome: {
    type: String,
    required: true,
    trim: true,
    index: 'text'
  },
  tipo: {
    type: String,
    required: true,
    enum: [
      'UPA', 
      'HOSPITAL', 
      'UBS', 
      'PS',       // Posto de Saúde
      'CENTRO_SAUDE',
      'FARMACIA_POPULAR'  // Novo tipo
    ],
    index: true
  },

  // Localização (GeoJSON + detalhes)
  localizacao: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      required: true,
      index: '2dsphere'
    },
    enderecoCompleto: String,
    municipio: {
      type: String,
      required: true
    },
    bairro: String,
    cep: String
  },

  // Contato e Funcionamento
  contato: {
    telefone: String,
    email: String,
    site: String,
    horarioAtendimento: {
      diasUteis: String,
      fimDeSemana: String,
      feriados: String
    }
  },

  // Serviços e Infraestrutura (condicionais por tipo)
  servicos: [{
    nome: String,       // Ex: "Pronto Atendimento", "Vacinação"
    disponivel: Boolean,
    detalhes: String
  }],
  leitos: {
    total: Number,
    uti: Number,
    pediatricos: Number
  },
  acessibilidade: {
    cadeirante: Boolean,
    linguasSinais: [String]  // Ex: ["Libras"]
  },

  // Metadados
  fonteDados: {
    type: String,
    enum: ['CNES', 'API_HOSPITAIS', 'API_UBS', 'API_FARMACIAS', 'MANUAL'],
    required: true
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

// Índices compostos (otimização)
EstabelecimentoSchema.index({ "localizacao.municipio": 1, tipo: 1 });  // Busca por município + tipo
EstabelecimentoSchema.index({ tipo: 1, "servicos.nome": 1 });           // Filtro por serviço

export default mongoose.model('EstabelecimentoSaude', EstabelecimentoSchema);