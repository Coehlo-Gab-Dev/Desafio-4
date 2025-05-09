export function transformGovBrData(rawData) {
    if (!rawData) return [];
    
    // Converte os dados brutos da API para nosso formato padrão
    const dataset = Array.isArray(rawData) ? rawData : 
                   rawData.data ? rawData.data : 
                   rawData.resultados ? rawData.resultados : 
                   [rawData];
  
    return dataset.map(item => ({
      nome: item.nome || item.name || '',
      titulo: item.titulo || item.title || 'Sem título',
      descricao: item.descricao || item.description || '',
      urlImagem: item.urlImagem || item.imageUrl || '',
      esfera: normalizeEsfera(item.organizacaoEsfera || item.esfera),
      uf: item.organizacaoUF || item.uf || '',
      municipio: item.organizacaoMunicipio || item.municipio || '',
      totalConjuntosDados: parseInt(item.qtdConjuntosDados) || 0,
      totalSeguidores: parseInt(item.qtdSeguidores) || 0,
      ultimaAtualizacao: parseDate(item.ultimaAtualizacao)
    }));
  }
  
  function normalizeEsfera(esfera) {
    const esferasValidas = ['federal', 'estadual', 'municipal', 'privada'];
    const esferaNormalizada = esfera?.toLowerCase().trim();
    return esferasValidas.includes(esferaNormalizada) 
      ? esferaNormalizada 
      : 'outros';
  }
  
  function parseDate(dateString) {
    if (!dateString) return new Date();
    try {
      return new Date(dateString);
    } catch {
      return new Date();
    }
  }