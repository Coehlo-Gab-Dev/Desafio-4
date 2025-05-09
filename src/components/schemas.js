// components/schemas.js
export const Organizacao = {
    type: 'object',
    properties: {
      metadata: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          origem: { type: 'string' },
          dataColeta: { type: 'string', format: 'date-time' }
        }
      },
      organizacao: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          titulo: { type: 'string' },
          descricao: { type: 'string' },
          esfera: { type: 'string', enum: ['federal', 'estadual', 'municipal', 'privada', 'outros'] },
          localizacao: {
            type: 'object',
            properties: {
              uf: { type: 'string', maxLength: 2 },
              municipio: { type: 'string' }
            }
          }
        }
      },
      metricas: {
        type: 'object',
        properties: {
          conjuntosDados: { type: 'integer' },
          seguidores: { type: 'integer' },
          atualizacao: { type: 'string', format: 'date-time' }
        }
      },
      recursos: {
        type: 'object',
        properties: {
          imagem: { type: 'string', format: 'uri' },
          link: { type: 'string', format: 'uri' }
        }
      }
    }
  };
  
  export const Metadata = {
    type: 'object',
    properties: {
      apiVersion: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
      pagination: {
        type: 'object',
        properties: {
          currentPage: { type: 'integer' },
          itemsPerPage: { type: 'integer' },
          totalItems: { type: 'integer' }
        }
      },
      source: { type: 'string' }
    }
  };