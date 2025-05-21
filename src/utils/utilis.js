export const normalizarMunicipio = (nome) => 
    nome.toUpperCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/Ç/g, 'C');    