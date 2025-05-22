// src/utils/apiDataFormatter.js
import { TipoEstabelecimentoSaude, FonteDados } from '@prisma/client';
import { getNomeMunicipioMAPorCodigo, CODIGO_UF_MA } from './ibgeCodes.js'; // Ajuste o caminho se necessário
import { logger } from './logger.js'; // Opcional, para logs dentro do formatter

// Constante com os valores do Enum para validação interna
const TIPOS_SAUDE_VALIDOS_ENUM = Object.values(TipoEstabelecimentoSaude);

/**
 * Normaliza uma string de tipo de estabelecimento para um valor do Enum TipoEstabelecimentoSaude.
 * @param {string} tipoFrontend - O tipo como string (ex: "HOSPITAL", "UPA", "Centro de Saude").
 * @returns {TipoEstabelecimentoSaude | null} O valor do Enum ou null se não reconhecido.
 */
export function normalizarTipoInterno(tipoFrontend) {
    if (!tipoFrontend || typeof tipoFrontend !== 'string') return null;
    const tipoUpper = tipoFrontend.trim().toUpperCase().replace(/-/g, '_').replace(/ /g, '_');

    if (TIPOS_SAUDE_VALIDOS_ENUM.includes(tipoUpper)) {
        return tipoUpper; // Já é um valor válido do Enum
    }
    // Mapeamentos adicionais de sinônimos comuns
    switch (tipoUpper) {
        case 'CENTRO_DE_SAUDE':
            return TipoEstabelecimentoSaude.CENTRO_SAUDE;
        case 'POSTO_DE_SAUDE':
            return TipoEstabelecimentoSaude.PS;
        // Adicione outros sinônimos que seu frontend ou outras fontes possam usar
        default:
            logger.warn(`[API_FORMATTER] Tipo frontend '${tipoFrontend}' (normalizado: ${tipoUpper}) não reconhecido para Enum.`);
            return null;
    }
}

/**
 * Mapeia a descrição ou código do tipo de unidade da API externa para o Enum TipoEstabelecimentoSaude.
 * @param {string} descricaoTipoApi - A descrição textual do tipo vinda da API.
 * @param {string} [codigoTipoApi=null] - O código numérico do tipo vindo da API.
 * @returns {TipoEstabelecimentoSaude} Um valor do Enum TipoEstabelecimentoSaude (default para UBS se não mapeado).
 */
export function mapearTipoDaApiParaInterno(descricaoTipoApi, codigoTipoApi = null) {
    const strDesc = String(descricaoTipoApi || '').toUpperCase();
    const strCod = String(codigoTipoApi || '').trim();

    // Mapeamento Priorizando Códigos (mais precisos se os códigos forem estáveis e conhecidos da sua lista)
    // Baseado na lista que você forneceu (TIPOS_UNIDADE_API_EXTERNA_REFERENCIA)
    switch (strCod) {
        case '05': case '07': case '62': return TipoEstabelecimentoSaude.HOSPITAL;
        case '73': case '20': case '21': return TipoEstabelecimentoSaude.UPA;
        case '02':
            if (strDesc.includes('CENTRO DE SAUDE') && !strDesc.includes('UNIDADE BASICA')) return TipoEstabelecimentoSaude.CENTRO_SAUDE;
            return TipoEstabelecimentoSaude.UBS;
        case '01': return TipoEstabelecimentoSaude.PS;
        case '15': return TipoEstabelecimentoSaude.UBS; // UNIDADE MISTA geralmente assimilada a UBS
        case '04': return TipoEstabelecimentoSaude.POLICLINICA;
        case '43': return TipoEstabelecimentoSaude.FARMACIA_POPULAR; // API: FARMACIA
        case '39': case '80': case '67': return TipoEstabelecimentoSaude.LABORATORIO; // SADT e Laboratórios
        case '22': return TipoEstabelecimentoSaude.POLICLINICA; // CONSULTORIO ISOLADO -> POLICLINICA
        case '70': // CENTRO DE ATENCAO PSICOSSOCIAL (CAPS)
            // Se você não tem um tipo CAPS no seu Enum, mapeie para o mais próximo ou adicione CAPS ao Enum.
            return TipoEstabelecimentoSaude.CENTRO_SAUDE; 
        // Adicione mais mapeamentos diretos por código se necessário
    }

    // Fallback para mapeamento por descrição se o código não foi decisivo
    if (strDesc.includes('HOSPITAL')) return TipoEstabelecimentoSaude.HOSPITAL;
    if (strDesc.includes('PRONTO ATENDIMENTO') || strDesc.includes('PRONTO SOCORRO') || strDesc.includes('UPA')) return TipoEstabelecimentoSaude.UPA;
    if (strDesc.includes('UNIDADE BASICA') || strDesc.includes('UBS')) return TipoEstabelecimentoSaude.UBS;
    if (strDesc.includes('POSTO DE SAUDE')) return TipoEstabelecimentoSaude.PS;
    if (strDesc.includes('CENTRO DE SAUDE')) return TipoEstabelecimentoSaude.CENTRO_SAUDE;
    if (strDesc.includes('FARMACIA')) return TipoEstabelecimentoSaude.FARMACIA_POPULAR;
    if (strDesc.includes('LABORATORIO')) return TipoEstabelecimentoSaude.LABORATORIO;
    if (strDesc.includes('POLICLINICA')) return TipoEstabelecimentoSaude.POLICLINICA;
    if (strDesc.includes('CLINICA') || strDesc.includes('CONSULTORIO') || strDesc.includes('ESPECIALIDADE')) return TipoEstabelecimentoSaude.POLICLINICA;
    
    logger.warn(`[API_FORMATTER] Tipo da API externa (desc: '${descricaoTipoApi}', cod: '${codigoTipoApi}') não mapeado. Usando default UBS.`);
    return TipoEstabelecimentoSaude.UBS; // Default final
}

/**
 * Formata um item de estabelecimento vindo de uma API externa para o schema Prisma EstabelecimentoSaude.
 * !!! VOCÊ PRECISA AJUSTAR OS NOMES DOS CAMPOS `apiItem.campo_xyz` PARA CORRESPONDER ÀS SUAS APIs !!!
 * @param {object} apiItem - O objeto de dados bruto da API externa.
 * @param {TipoEstabelecimentoSaude | null} [tipoOriginalFiltro=null] - O tipo que o usuário usou na busca (se houver).
 * @param {FonteDados} fonteApiExterna - O Enum FonteDados que identifica a origem da API.
 * @returns {object | null} Objeto formatado para o Prisma ou null se o item for inválido.
 */
export function formatarApiItemParaPrisma(apiItem, tipoOriginalFiltro = null, fonteApiExterna) {
    // Log para ajudar a identificar os campos corretos do apiItem durante a depuração
    // if (Math.random() < 0.1) { // Loga uma amostra para não poluir muito
    //     logger.debug(`[API_FORMATTER] Amostra de apiItem para ${fonteApiExterna}:`, JSON.stringify(apiItem, null, 2)?.substring(0,1000));
    // }

    // --- CNES ID (Campo Chave) ---
    // VERIFIQUE O NOME EXATO DO CAMPO CNES NOS SEUS DADOS JSON!
    // Exemplos: co_cnes (CNES legados), cnes (APIs mais novas), codigo_cnes, id_unidade, etc.
    const idCnesLimpo = String(
        apiItem.cnes || // Muitas APIs do DataSUS usam 'cnes' diretamente
        apiItem.co_cnes || 
        apiItem.codigo_cnes ||
        apiItem.id_unidade ||
        apiItem.codigoNacionalEstabelecimentoSaude ||
        ''
    ).trim();

    if (!idCnesLimpo) {
        logger.warn(`[API_FORMATTER] Item da API (${fonteApiExterna}) sem CNES válido, pulando. Nome Fantasia (se houver): ${apiItem.no_fantasia || apiItem.nome_fantasia || apiItem.nome_do_estabelecimento || 'N/A'}`);
        return null;
    }

    // --- Nome ---
    const nomeOriginalApi = (
        apiItem.nome_fantasia ||
        apiItem.no_fantasia ||    // Comum no CNES
        apiItem.nome_do_estabelecimento || // Comum na API Hospitais/Leitos
        apiItem.nome ||            // Comum na API UBS
        apiItem.nomeFantasiaEstabelecimento ||
        `Estabelecimento ${idCnesLimpo}`
    ).trim();

    // --- Tipo ---
    const tipoDaApiDesc = apiItem.tipo_unidade || apiItem.ds_tipo_unidade; // Comum em Hospitais/Leitos e CNES
    const tipoDaApiCod = apiItem.codigo_tipo_unidade || apiItem.co_tipo_unidade;  // Comum em Hospitais/Leitos e CNES
    const tipoInternoFinal = mapearTipoDaApiParaInterno(tipoDaApiDesc, String(tipoDaApiCod || '').trim()) || tipoOriginalFiltro || TipoEstabelecimentoSaude.UBS;


    // --- Localização ---
    let longitude = parseFloat(apiItem.longitude || apiItem.nu_longitude || apiItem.longitude_estabelecimento_decimo_grau);
    let latitude = parseFloat(apiItem.latitude || apiItem.nu_latitude || apiItem.latitude_estabelecimento_decimo_grau);

    // Tratamento para coordenadas com vírgula decimal
    ['longitude', 'nu_longitude', 'longitude_estabelecimento_decimo_grau'].forEach(key => {
        if (typeof apiItem[key] === 'string' && apiItem[key].includes(',')) longitude = parseFloat(apiItem[key].replace(/\./g, '').replace(',', '.'));
    });
    ['latitude', 'nu_latitude', 'latitude_estabelecimento_decimo_grau'].forEach(key => {
        if (typeof apiItem[key] === 'string' && apiItem[key].includes(',')) latitude = parseFloat(apiItem[key].replace(/\./g, '').replace(',', '.'));
    });
    
    const coordenadasJSON = (!isNaN(longitude) && !isNaN(latitude) && (longitude !== 0 || latitude !== 0))
        ? { type: "Point", coordinates: [longitude, latitude] } : null;

    const codigoIbgeMunicipioApi = String(apiItem.codigo_municipio || apiItem.co_municipio_ibge || apiItem.ibge || '').trim();
    const nomeMunicipioApi = apiItem.municipio || apiItem.no_municipio || getNomeMunicipioMAPorCodigo(parseInt(codigoIbgeMunicipioApi, 10)) || 'Não Informado';
    const ufApi = (apiItem.uf || apiItem.sg_uf || String(codigoIbgeMunicipioApi).substring(0, 2) || String(CODIGO_UF_MA).substring(0,2) ).toUpperCase();

    const localizacaoFormatada = {
        logradouro: (apiItem.endereco_estabelecimento || apiItem.no_logradouro || apiItem.logradouro || 'Não informado').trim(),
        numero: String(apiItem.numero_estabelecimento || apiItem.numero_endereco || apiItem.numero || '').trim() || undefined,
        complemento: String(apiItem.nome_complemento || apiItem.complemento || apiItem.ds_complemento || '').trim() || undefined,
        bairro: (apiItem.bairro_estabelecimento || apiItem.bairro || 'Não informado').trim(),
        municipio: nomeMunicipioApi,
        uf: ufApi.substring(0, 2), // Garante 2 caracteres
        cep: String(apiItem.codigo_cep_estabelecimento || apiItem.cep || apiItem.co_cep || '').replace(/\D/g, '') || undefined,
        coordenadas: coordenadasJSON,
        ...(codigoIbgeMunicipioApi && { codigoIbge: codigoIbgeMunicipioApi })
    };
    Object.keys(localizacaoFormatada).forEach(key => localizacaoFormatada[key] === undefined && delete localizacaoFormatada[key]);
    if (localizacaoFormatada.coordenadas === null && localizacaoFormatada.hasOwnProperty('coordenadas')) delete localizacaoFormatada.coordenadas;


    // --- Contato ---
    const contatoFormatado = {
        telefone: String(apiItem.numero_telefone_estabelecimento || apiItem.numero_telefone || apiItem.nu_telefone || '').replace(/\D/g, '').trim() || undefined,
        email: (apiItem.endereco_email_estabelecimento || apiItem['e-mail'] || apiItem.email || '').trim().toLowerCase() || undefined,
        site: apiItem.ds_site_eletronico || apiItem.site || undefined, // VERIFIQUE SE A API FORNECE ESTE CAMPO
        redesSociais: [] // Geralmente não fornecido por APIs DataSUS
    };
    Object.keys(contatoFormatado).forEach(key => contatoFormatado[key] === undefined && delete contatoFormatado[key]);
    if (contatoFormatado.redesSociais?.length === 0) delete contatoFormatado.redesSociais;

    // --- Serviços (Servico[]) ---
    // !IMPLEMENTAR/VERIFICAR! Baseado na estrutura real da API CNES ou outras.
    // A API CNES pode ter um array `servicos` ou `servicosClassificacao` com objetos
    // cada um com `codigoServico` e `descricaoServicoClassificacao`.
    let servicosFormatados = [];
    const servicosApi = apiItem.servicos || apiItem.servicosClassificacao || apiItem.servicos_especializados; // Tente diferentes nomes de campo
    if (Array.isArray(servicosApi)) {
        servicosFormatados = servicosApi.map(serv => {
            const nomeServico = String(serv.descricaoServicoClassificacao || serv.ds_servico_classificacao || serv.nome || 'Serviço não especificado').trim();
            // A API geralmente não informa 'disponivel' ou 'descricao' detalhada por serviço no endpoint principal de estabelecimentos
            return { nome: nomeServico, disponivel: true, descricao: undefined };
        }).filter(s => s.nome && s.nome !== 'Serviço não especificado');
    }

    // --- Leitos (Leitos?) ---
    // !IMPLEMENTAR/VERIFICAR! Baseado na API "hospitais-e-leitos" ou dados detalhados do CNES.
    // Seu JSON `hospitais-e-leitos.JSON` tem: "leitos_existentes", "uti_total_existente", "uti_adulto_existente", "uti_pediatrico_existente", "uti_neonatal_existente"
    let leitosFormatados = null;
    const total = parseInt(apiItem.leitos_existentes, 10); // Do hospitais-e-leitos.JSON
    if (!isNaN(total) && total >= 0) {
        leitosFormatados = {
            total: total,
            uti: parseInt(apiItem.uti_total_existente, 10) || 0,
            // O schema Prisma tem `pediatricos` e `covid`. O JSON hospitais-e-leitos tem `uti_pediatrico_existente`.
            // Você precisa decidir como mapear. Ex: uti_pediatrico_existente -> pediatricos. Covid não está no JSON de exemplo.
            pediatricos: parseInt(apiItem.uti_pediatrico_existente, 10) || 0,
            covid: 0, // Assumindo 0 se não houver campo específico na API para leitos COVID.
        };
    }

    // --- Acessibilidade (Acessibilidade?) ---
    // !IMPLEMENTAR/VERIFICAR! Baseado em campos como `st_acessibilidade_fisica` (S/N) do CNES.
    let acessibilidadeFormatada = null;
    // Exemplo: se a API CNES tiver campos como os abaixo (VERIFIQUE OS NOMES REAIS)
    if (apiItem.hasOwnProperty('st_acessibilidade_fisica') || apiItem.hasOwnProperty('st_presenca_interprete_libras')) {
        acessibilidadeFormatada = {
            cadeirante: (String(apiItem.st_acessibilidade_fisica).toUpperCase() === 'S'),
            deficienciaVisual: (String(apiItem.st_sinalizacao_visual_tatil).toUpperCase() === 'S'), // Suposição de campo
            deficienciaAuditiva: (String(apiItem.st_sinalizacao_auditiva).toUpperCase() === 'S'), // Suposição de campo
            linguasSinais: (String(apiItem.st_presenca_interprete_libras).toUpperCase() === 'S') ? ['LIBRAS'] : [],
        };
    }

    // --- Objeto Final para o Prisma ---
    const dataToUpsert = {
        idCnes: idCnesLimpo,
        nome: nomeOriginalApi,
        tipo: tipoInternoFinal, // Já é um valor do Enum
        localizacao: localizacaoFormatada,
        contato: (Object.keys(contatoFormatado).length > 0 && !(contatoFormatado.telefone === undefined && contatoFormatado.email === undefined && contatoFormatado.site === undefined)) ? contatoFormatado : undefined,
        servicos: servicosFormatados.length > 0 ? servicosFormatados : undefined,
        ...(leitosFormatados && { leitos: leitosFormatados }),
        ...(acessibilidadeFormatada && { acessibilidade: acessibilidadeFormatada }),
        horarioFuncionamento: apiItem.descricao_turno_atendimento || apiItem.ds_horario_funcionamento || apiItem.horarioFuncionamento || undefined,
        fonteDados: Object.values(FonteDados).includes(fonteApiExterna) ? fonteApiExterna : FonteDados.MANUAL, // Garante valor do Enum
        dataAtualizacao: apiItem.data_atualizacao ? new Date(apiItem.data_atualizacao) : new Date()
    };
    
    // Limpeza final de campos opcionais que ficaram undefined
    Object.keys(dataToUpsert).forEach(key => dataToUpsert[key] === undefined && delete dataToUpsert[key]);
    if (dataToUpsert.localizacao && Object.keys(dataToUpsert.localizacao).length === 0) delete dataToUpsert.localizacao;
    if (dataToUpsert.contato && Object.keys(dataToUpsert.contato).length === 0) delete dataToUpsert.contato;
    if (dataToUpsert.servicos && dataToUpsert.servicos.length === 0) delete dataToUpsert.servicos;

    return dataToUpsert;
}