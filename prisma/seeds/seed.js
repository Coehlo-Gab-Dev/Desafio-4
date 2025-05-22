// prisma/seeds/seed.js
console.log("--- Executando prisma/seeds/seed.js ---");

import { PrismaClient, TipoEstabelecimentoSaude, FonteDados } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// --- DADOS E FUNÇÕES UTILITÁRIAS ---

const CODIGOS_MUNICIPIOS_MA = { // !!!!! COMPLETE COM TODOS OS 217 MUNICÍPIOS !!!!!
    'ACAILANDIA': 2100055, 'AFONSO CUNHA': 2100105, 'AGUA DOCE DO MARANHAO': 2100154,
    'ALCANTARA': 2100204, 'ALDEIAS ALTAS': 2100303, 'ALTO ALEGRE DO MARANHAO': 2100402,
    'ALTO ALEGRE DO PINDARE': 2100477, 'ALTO PARNAIBA': 2100501, 'AMAPA DO MARANHAO': 2100550,
    'AMARANTE DO MARANHAO': 2100600, 'ANAJATUBA': 2100709, 'ANAPURUS': 2100808,
    'ARARI': 2101004, 'AXIXA': 2101103, 'BACABAL': 2101202, 'BALSAS': 2101400,
    'BURITI': 2102200, 'BURITI BRAVO': 2102309, 'BURITICUPU': 2102325,
    'CANTANHEDE': 2102705, 'CAROLINA': 2102804, 'CAXIAS': 2103000,
    'CENTRO NOVO DO MARANHAO': 2103174, 'CHAPADINHA': 2103208, 'CODO': 2103307,
    'COELHO NETO': 2103406, 'CURURUPU': 2103703, 'ESPERANTINOPOLIS': 2104008,
    'ESTREITO': 2104057, 'FORTALEZA DOS NOGUEIRAS': 2104107,
    'GOVERNADOR EDISON LOBAO': 2104552, 'GOVERNADOR NUNES FREIRE': 2104677,
    'GRACA ARANHA': 2104701, 'GRAJAU': 2104800, 'IGARAPE DO MEIO': 2105153,
    'IMPERATRIZ': 2105302, 'JOAO LISBOA': 2105500, 'LAGO DA PEDRA': 2105708,
    'LAGO DO JUNCO': 2105807, 'LAGO VERDE': 2105906, 'LUIS DOMINGUES': 2106201,
    'MAGALHAES DE ALMEIDA': 2106300, 'MATA ROMA': 2106409, 'MILAGRES DO MARANHAO': 2106672,
    'MIRANDA DO NORTE': 2106755, 'MORROS': 2107100, 'NOVA IORQUE': 2107308,
    'OLHO D AGUA DAS CUNHAS': 2107407, 'PARNARAMA': 2107803, 'PAULO RAMOS': 2108108,
    'PEDREIRAS': 2108207, 'PENALVA': 2108306, 'PINHEIRO': 2108603, 'PIO XII': 2108702,
    'POCAO DE PEDRAS': 2108900, 'PORTO FRANCO': 2109007, 'PRESIDENTE DUTRA': 2109106,
    'PRESIDENTE JUSCELINO': 2109205, 'RAPOSA': 2109452, 'SANTA LUZIA': 2110005,
    'SANTA LUZIA DO PARUA': 2110039, 'SAO BERNARDO': 2110609,
    'SAO FRANCISCO DO MARANHAO': 2110906, 'SAO JOAO DOS PATOS': 2111102,
    'SAO JOSE DE RIBAMAR': 2111201, 'SAO JOSE DOS BASILIOS': 2111250, 'SAO LUIS': 2111300,
    'SAO LUIS GONZAGA DO MARANHAO': 2111409, 'SAO VICENTE FERRER': 2111706,
    'TIMON': 2112209, 'TRIZIDELA DO VALE': 2112233, 'VARGEM GRANDE': 2112704,
    'VIANA': 2112803, 'VILA NOVA DOS MARTIRIOS': 2112852, 'VITORIA DO MEARIM': 2112902,
    'ZE DOCA': 2114007
    // ... Certifique-se de que todos os 217 estão aqui e os nomes estão normalizados (MAIÚSCULAS, SEM ACENTOS)
};
const CODIGO_UF_MA_NUM = 21;
const CODIGO_UF_MA_STR = String(CODIGO_UF_MA_NUM);

function getNomeMunicipioMAPorCodigoSeed(codigoIbgeInput) {
    if (!codigoIbgeInput) return null;
    const codigoNumerico = parseInt(String(codigoIbgeInput).trim(), 10);
    for (const nomeNormalizado in CODIGOS_MUNICIPIOS_MA) { // Itera sobre as chaves normalizadas
        if (CODIGOS_MUNICIPIOS_MA[nomeNormalizado] === codigoNumerico) {
            // Para exibição, pode-se querer uma versão com capitalização mista
            // Esta função como está retorna a chave (que deve ser normalizada).
            // Se você armazenou as chaves com acentos e capitalização original, ela retornará isso.
            // Para consistência, se as chaves são 'SAO LUIS', retornará 'SAO LUIS'.
            // Se quiser "São Luís", as chaves no CODIGOS_MUNICIPIOS_MA devem ser "São Luís"
            // e a normalização para busca deve ser feita separadamente.
            // A função atual é:
            // return nomeNormalizado.toLowerCase().split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1)).join(' ');
            // Vamos manter a que retorna a chave original do seu mapa, assumindo que as chaves
            // estão como você quer que o nome do município seja armazenado/exibido.
            const nomeOriginal = Object.keys(CODIGOS_MUNICIPIOS_MA).find(key => CODIGOS_MUNICIPIOS_MA[key] === codigoNumerico);
            return nomeOriginal || null;
        }
    }
    // console.warn(`[SEED] Nome do município não encontrado para o código IBGE MA: ${codigoIbgeInput}`);
    return null;
}


const TIPOS_SAUDE_VALIDOS_ENUM = Object.values(TipoEstabelecimentoSaude);
const TIPOS_UNIDADE_API_EXTERNA = [ /* ... Sua lista completa de 38 tipos (do Turno 82) ... */ ];

function mapearTipoDaApiParaInternoSeed(descricaoTipoApi, codigoTipoApi = null) {
    const strDesc = String(descricaoTipoApi || '').toUpperCase();
    const strCod = String(codigoTipoApi || '').trim();
    
    // Prioriza código se presente na nossa lista de referência
    const tipoDef = TIPOS_UNIDADE_API_EXTERNA.find(t => String(t.codigo_tipo_unidade) === strCod);
    if (tipoDef) {
        const descApiUpper = tipoDef.descricao_tipo_unidade.toUpperCase();
        if (descApiUpper.includes('HOSPITAL')) return TipoEstabelecimentoSaude.HOSPITAL;
        if (descApiUpper.includes('PRONTO ATENDIMENTO') || descApiUpper.includes('PRONTO SOCORRO')) return TipoEstabelecimentoSaude.UPA;
        if (descApiUpper.includes('UNIDADE BASICA') || (descApiUpper.includes('CENTRO DE SAUDE') && descApiUpper.includes('UNIDADE BASICA'))) return TipoEstabelecimentoSaude.UBS;
        if (descApiUpper.includes('POSTO DE SAUDE')) return TipoEstabelecimentoSaude.PS;
        if (descApiUpper.includes('CENTRO DE SAUDE') && !descApiUpper.includes('UNIDADE BASICA')) return TipoEstabelecimentoSaude.CENTRO_SAUDE;
        if (descApiUpper.includes('FARMACIA')) return TipoEstabelecimentoSaude.FARMACIA_POPULAR;
        if (descApiUpper.includes('LABORATORIO') || descApiUpper.includes('DIAGNOSE')) return TipoEstabelecimentoSaude.LABORATORIO;
        if (descApiUpper.includes('POLICLINICA')) return TipoEstabelecimentoSaude.POLICLINICA;
        if (descApiUpper.includes('UNIDADE MISTA')) return TipoEstabelecimentoSaude.UBS; // Mapeando UNIDADE MISTA para UBS
        if (descApiUpper.includes('CONSULTORIO ISOLADO')) return TipoEstabelecimentoSaude.POLICLINICA; 
        if (descApiUpper.includes('CENTRO DE ATENCAO PSICOSSOCIAL')) return TipoEstabelecimentoSaude.CENTRO_SAUDE; 
    }

    // Fallback para mapeamento por descrição
    if (strDesc.includes('HOSPITAL')) return TipoEstabelecimentoSaude.HOSPITAL;
    if (strDesc.includes('PRONTO ATENDIMENTO') || strDesc.includes('PRONTO SOCORRO') || strDesc.includes('UPA')) return TipoEstabelecimentoSaude.UPA;
    if (strDesc.includes('UNIDADE BASICA DE SAUDE') || strDesc.includes('UNIDADE B SICA') || strDesc.includes('UBS')) return TipoEstabelecimentoSaude.UBS;
    if (strDesc.includes('POSTO DE SAUDE')) return TipoEstabelecimentoSaude.PS;
    if (strDesc.includes('CENTRO DE SAUDE') && !strDesc.includes('UNIDADE BASICA')) return TipoEstabelecimentoSaude.CENTRO_SAUDE; // Para "CENTRO DE SAUDE" puro
    if (strDesc.includes('CENTRO DE SAUDE')) return TipoEstabelecimentoSaude.UBS; // Se "CENTRO DE SAUDE" com outras palavras for UBS
    if (strDesc.includes('FARMACIA')) return TipoEstabelecimentoSaude.FARMACIA_POPULAR;
    if (strDesc.includes('LABORATORIO')) return TipoEstabelecimentoSaude.LABORATORIO;
    if (strDesc.includes('POLICLINICA')) return TipoEstabelecimentoSaude.POLICLINICA;
    if (strDesc.includes('CLINICA') || strDesc.includes('CONSULTORIO') || strDesc.includes('ESPECIALIDADE')) return TipoEstabelecimentoSaude.POLICLINICA;
    
    // console.warn(`[SEED] Tipo API (desc: '${descricaoTipoApi}', cod: '${codigoTipoApi}') não mapeado. Default: UBS.`);
    return TipoEstabelecimentoSaude.UBS;
}

function formatarApiItemParaPrismaSeed(apiItem, fonteDeDados) {
    // console.log(`[SEED formatarApiItem] Processando item da fonte ${fonteDeDados}: ID CNES tentativo: ${apiItem.codigo_cnes || apiItem.cnes}`);

    let idCnesLimpo, nomeOriginalApi, tipoDaApiDesc, tipoDaApiCod,
        longitude, latitude, codigoIbgeMunicipioApi, nomeMunicipioApi, ufApi,
        logradouro, numero, complemento, bairro, cep,
        telefone, email, siteEstabelecimento, horarioFuncionamento, dataAtualizacaoExterna;

    // --- Extração de campos baseada na FONTE ---
    if (fonteDeDados === FonteDados.CNES || fonteDeDados.toString() === 'API_CDS' || fonteDeDados.toString() === 'API_UPA') { 
        // Assumindo que CDS.JSON e UPAS.JSON têm estrutura similar ao estabelecimentos.JSON
        idCnesLimpo = String(apiItem.codigo_cnes || '').trim();
        nomeOriginalApi = (apiItem.nome_fantasia || apiItem.nome_razao_social || `Estabelecimento ${idCnesLimpo}`).trim();
        tipoDaApiCod = apiItem.codigo_tipo_unidade;
        const tipoRef = TIPOS_UNIDADE_API_EXTERNA.find(t => String(t.codigo_tipo_unidade) === String(tipoDaApiCod));
        tipoDaApiDesc = tipoRef ? tipoRef.descricao_tipo_unidade : '';
        latitude = parseFloat(apiItem.latitude_estabelecimento_decimo_grau);
        longitude = parseFloat(apiItem.longitude_estabelecimento_decimo_grau);
        logradouro = apiItem.endereco_estabelecimento;
        numero = apiItem.numero_estabelecimento;
        bairro = apiItem.bairro_estabelecimento;
        codigoIbgeMunicipioApi = String(apiItem.codigo_municipio || '').trim();
        ufApi = String(apiItem.codigo_uf || '').trim(); 
        cep = apiItem.codigo_cep_estabelecimento;
        telefone = apiItem.numero_telefone_estabelecimento;
        email = apiItem.endereco_email_estabelecimento;
        horarioFuncionamento = apiItem.descricao_turno_atendimento;
        dataAtualizacaoExterna = apiItem.data_atualizacao;
        siteEstabelecimento = apiItem.no_site || apiItem.ds_site_eletronico; 
    } else if (fonteDeDados === FonteDados.API_HOSPITAIS) { 
        idCnesLimpo = String(apiItem.cnes || '').trim();
        nomeOriginalApi = (apiItem.nome_do_estabelecimento || apiItem.razao_social || `Estabelecimento ${idCnesLimpo}`).trim();
        tipoDaApiDesc = apiItem.tipo_unidade;
        tipoDaApiCod = apiItem.codigo_tipo_unidade;
        latitude = parseFloat(apiItem.latitude); 
        longitude = parseFloat(apiItem.longitude);
        logradouro = apiItem.no_logradouro;
        numero = apiItem.numero_endereco;
        complemento = apiItem.nome_complemento;
        bairro = apiItem.bairro;
        nomeMunicipioApi = apiItem.municipio; 
        ufApi = String(apiItem.uf || '').toUpperCase();
        cep = apiItem.cep;
        telefone = apiItem.numero_telefone;
        email = apiItem['e-mail']; 
        if (apiItem._leito_complementar && String(apiItem._leito_complementar).length === 6) {
             try { dataAtualizacaoExterna = new Date(String(apiItem._leito_complementar).substring(0,4) + '-' + String(apiItem._leito_complementar).substring(4,6) + '-01'); } catch(e){}
        }
    } else if (fonteDeDados === FonteDados.API_UBS) { 
        idCnesLimpo = String(apiItem.cnes || '').trim();
        nomeOriginalApi = (apiItem.nome || `Estabelecimento ${idCnesLimpo}`).trim();
        tipoDaApiCod = apiItem.codigo_tipo_unidade || '02'; 
        const tipoRef = TIPOS_UNIDADE_API_EXTERNA.find(t => String(t.codigo_tipo_unidade) === String(tipoDaApiCod));
        tipoDaApiDesc = tipoRef ? tipoRef.descricao_tipo_unidade : (String(tipoDaApiCod) === '02' ? 'CENTRO DE SAUDE/UNIDADE BASICA' : '');
        latitude = parseFloat(apiItem.latitude);
        longitude = parseFloat(apiItem.longitude);
        logradouro = apiItem.logradouro;
        numero = apiItem.numero; 
        bairro = apiItem.bairro;
        codigoIbgeMunicipioApi = String(apiItem.ibge || '').trim();
        ufApi = String(apiItem.uf || '').toUpperCase(); 
    } else {
        console.warn(`[SEED formatarApiItem] Fonte de dados '${fonteDeDados}' desconhecida ou não mapeada. Usando fallbacks mais genéricos.`);
        idCnesLimpo = String(apiItem.codigo_cnes || apiItem.cnes || '').trim(); // Tenta os mais comuns
        if (!idCnesLimpo) { return null; }
        nomeOriginalApi = (apiItem.nome_fantasia || apiItem.nome_razao_social || apiItem.nome_do_estabelecimento || apiItem.nome || `Estabelecimento ${idCnesLimpo}`).trim();
        tipoDaApiDesc = apiItem.ds_tipo_unidade || apiItem.tipo_unidade || apiItem.tipo;
        tipoDaApiCod = apiItem.co_tipo_unidade || apiItem.codigo_tipo_unidade;
        latitude = parseFloat(apiItem.latitude_estabelecimento_decimo_grau || apiItem.latitude || apiItem.nu_latitude);
        longitude = parseFloat(apiItem.longitude_estabelecimento_decimo_grau || apiItem.longitude || apiItem.nu_longitude);
        logradouro = apiItem.endereco_estabelecimento || apiItem.no_logradouro || apiItem.logradouro;
        numero = apiItem.numero_estabelecimento || apiItem.numero_endereco || apiItem.numero;
        complemento = apiItem.nome_complemento || apiItem.ds_complemento;
        bairro = apiItem.bairro_estabelecimento || apiItem.bairro;
        // Para nomeMunicipioApi e codigoIbgeMunicipioApi, a lógica de fallback precisaria de mais contexto ou ser genérica
        nomeMunicipioApi = apiItem.municipio || apiItem.no_municipio;
        codigoIbgeMunicipioApi = String(apiItem.codigo_municipio || apiItem.co_municipio_ibge || apiItem.ibge || '').trim();
        ufApi = String(apiItem.codigo_uf || apiItem.uf || apiItem.sg_uf || '').toUpperCase();
        cep = apiItem.codigo_cep_estabelecimento || apiItem.cep || apiItem.co_cep;
        telefone = apiItem.numero_telefone_estabelecimento || apiItem.numero_telefone || apiItem.nu_telefone;
        email = apiItem.endereco_email_estabelecimento || apiItem['e-mail'] || apiItem.email;
        horarioFuncionamento = apiItem.descricao_turno_atendimento || apiItem.ds_horario_funcionamento;
        dataAtualizacaoExterna = apiItem.data_atualizacao || (apiItem._leito_complementar && String(apiItem._leito_complementar).length === 6 ? new Date(String(apiItem._leito_complementar).substring(0,4) + '-' + String(apiItem._leito_complementar).substring(4,6) + '-01') : undefined);
        siteEstabelecimento = apiItem.no_site || apiItem.ds_site_eletronico || apiItem.site;
    }

    if (!idCnesLimpo) {
        console.warn(`[SEED formatarApiItem] CNES não pôde ser extraído para o item da fonte ${fonteDeDados}. Nome: ${nomeOriginalApi}`);
        return null; 
    }
    
    // Normalizações e conversões comuns
    if (typeof longitude === 'string' && longitude.includes(',')) longitude = parseFloat(longitude.replace(/\./g, '').replace(',', '.'));
    if (typeof latitude === 'string' && latitude.includes(',')) latitude = parseFloat(latitude.replace(/\./g, '').replace(',', '.'));
    const coordenadasJSON = (!isNaN(longitude) && !isNaN(latitude) && (longitude !== 0 || latitude !== 0))
        ? { type: "Point", coordinates: [longitude, latitude] } : null;

    const tipoInternoFinal = mapearTipoDaApiParaInternoSeed(tipoDaApiDesc, String(tipoDaApiCod || '').trim()) || TipoEstabelecimentoSaude.UBS;
    
    const nomeMunicipioFinal = nomeMunicipioApi || getNomeMunicipioMAPorCodigoSeed(parseInt(codigoIbgeMunicipioApi, 10)) || 'Não Informado';
    let siglaUfFinal = String(ufApi || CODIGO_UF_MA_STR).toUpperCase();
    if (/^\d+$/.test(siglaUfFinal)) { 
        if (siglaUfFinal === CODIGO_UF_MA_STR) siglaUfFinal = 'MA';
        else {
            // console.warn(`[SEED] Código UF numérico (${siglaUfFinal}) para CNES ${idCnesLimpo} não é do Maranhão e não foi mapeado para sigla.`);
        }
    }
    siglaUfFinal = siglaUfFinal.substring(0, 2);

    const localizacao = {
        logradouro: String(logradouro || 'Não informado').trim(),
        numero: String(numero || '').trim() || undefined,
        complemento: String(complemento || '').trim() || undefined,
        bairro: String(bairro || 'Não informado').trim(),
        municipio: nomeMunicipioFinal,
        uf: siglaUfFinal,
        // cep: String(cep || '').replace(/\D/g, '') || undefined, // Removido conforme sua alteração no schema
        coordenadas: coordenadasJSON,
        codigoIbge: codigoIbgeMunicipioApi || undefined 
    };
    // Remove 'cep' se você o removeu do schema do tipo Localizacao
    if (localizacao.hasOwnProperty('cep') && !cep) delete localizacao.cep;

    Object.keys(localizacao).forEach(key => localizacao[key] === undefined && delete localizacao[key]);
    if (localizacao.coordenadas === null && localizacao.hasOwnProperty('coordenadas')) delete localizacao.coordenadas;

    const contato = {
        telefone: String(telefone || '').replace(/\D/g, '').trim() || undefined,
        email: (email || '').trim().toLowerCase() || undefined,
        site: siteEstabelecimento || undefined,
        redesSociais: (apiItem.redes_sociais && Array.isArray(apiItem.redes_sociais)) ? apiItem.redes_sociais : []
    };
    Object.keys(contato).forEach(key => {
        if (key !== 'redesSociais' && contato[key] === undefined) {
            delete contato[key];
        }
    });

    // --- Mapeamento para Leitos ---
    let leitos = null;
    if (fonteDeDados === FonteDados.API_HOSPITAIS && apiItem.hasOwnProperty('leitos_existentes')) {
        const total = parseInt(apiItem.leitos_existentes, 10);
        if (!isNaN(total) && total >= 0) {
            leitos = {
                total: total,
                uti: parseInt(apiItem.uti_total_existente, 10) || 0,
                pediatricos: parseInt(apiItem.uti_pediatrico_existente, 10) || 0,
                covid: parseInt(apiItem.uti_covid_existente, 10) || 0, 
            };
        }
    }

    // --- Mapeamento para Serviços ---
    let servicos = [];
    if (fonteDeDados === FonteDados.CNES || fonteDeDados.toString() === 'API_CDS' || fonteDeDados.toString() === 'API_UPA') { // Aplicar para CNES, CDS, UPA
        if (apiItem.estabelecimento_possui_servico_apoio === 1 || String(apiItem.estabelecimento_possui_servico_apoio).toUpperCase() === 'S') {
            servicos.push({ nome: "SERVIÇO DE APOIO DIAGNÓSTICO E TERAPIA", disponivel: true });
        }
        // !! INSPECIONE SEU JSON `estabelecimentos.JSON` / `CDS.JSON` / `UPAS.JSON` completo para uma lista mais detalhada !!
    }
    
    // --- Mapeamento para Acessibilidade ---
    let acessibilidade = null;
    if (fonteDeDados === FonteDados.CNES || fonteDeDados.toString() === 'API_CDS' || fonteDeDados.toString() === 'API_UPA') { 
        // !! INSPECIONE SEU JSON COMPLETO para os nomes REAIS dos campos de acessibilidade !!
        if (apiItem.hasOwnProperty('st_acessibilidade_fisica') || apiItem.hasOwnProperty('st_presenca_interprete_libras')) {
            acessibilidade = {
                cadeirante: (String(apiItem.st_acessibilidade_fisica).toUpperCase() === 'S' || String(apiItem.st_acessibilidade_fisica) === '1'),
                deficienciaVisual: (String(apiItem.st_sinalizacao_visual_tatil).toUpperCase() === 'S' || String(apiItem.st_sinalizacao_visual_tatil) === '1'),
                deficienciaAuditiva: (String(apiItem.st_sinalizacao_auditiva).toUpperCase() === 'S' || String(apiItem.st_sinalizacao_auditiva) === '1'),
                linguasSinais: (String(apiItem.st_presenca_interprete_libras).toUpperCase() === 'S' || String(apiItem.st_presenca_interprete_libras) === '1') ? ['LIBRAS'] : [],
            };
        }
    }
    
    const dataToUpsert = {
        idCnes: idCnesLimpo,
        nome: nomeOriginalApi,
        tipo: tipoInternoFinal,
        localizacao,
        contato,
        servicos: servicos.length > 0 ? servicos : [], 
        ...(leitos && { leitos }),
        ...(acessibilidade && { acessibilidade }),
        horarioFuncionamento: horarioFuncionamento || undefined,
        fonteDados: fonteDeDados,
        dataAtualizacao: dataAtualizacaoExterna ? new Date(dataAtualizacaoExterna) : new Date()
    };
    
    Object.keys(dataToUpsert).forEach(key => dataToUpsert[key] === undefined && delete dataToUpsert[key]);
    if (dataToUpsert.localizacao && Object.keys(dataToUpsert.localizacao).length === 0) delete dataToUpsert.localizacao;
    // Não precisa mais deletar 'contato' se ele for só {redesSociais: []} pois o campo é obrigatório
    // if (dataToUpsert.servicos && dataToUpsert.servicos.length === 0) delete dataToUpsert.servicos; // Opcional

    return dataToUpsert;
}

async function processJsonFile(filePath, fonteDeDados) {
    console.log(`📄 Processando arquivo JSON: ${filePath} para fonte ${fonteDeDados}`);
    let jsonData;
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Arquivo não encontrado: ${filePath}. Pulando este arquivo.`);
            return [];
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        jsonData = JSON.parse(fileContent);
    } catch (error) {
        console.error(`❌ Erro ao ler ou parsear o arquivo JSON ${filePath}:`, error.message);
        return [];
    }

    let estabelecimentosArray = [];
    if (Array.isArray(jsonData)) {
        estabelecimentosArray = jsonData;
    } else if (typeof jsonData === 'object' && jsonData !== null) {
        if (Array.isArray(jsonData.estabelecimentos)) estabelecimentosArray = jsonData.estabelecimentos;
        else if (Array.isArray(jsonData.hospitais_leitos)) estabelecimentosArray = jsonData.hospitais_leitos;
        else if (Array.isArray(jsonData.ubs)) estabelecimentosArray = jsonData.ubs;
        else if (Array.isArray(jsonData.dados)) estabelecimentosArray = jsonData.dados;
        else {
            console.warn(`⚠️ Não foi possível encontrar um array de estabelecimentos no arquivo ${filePath}. Chaves principais: ${Object.keys(jsonData).join(', ')}`);
        }
    }

    if (!estabelecimentosArray || estabelecimentosArray.length === 0) {
        console.info(`ℹ️ Nenhum estabelecimento encontrado dentro do JSON ${filePath} após extração do array principal.`);
        return [];
    }
    
    const dadosDoMaranhao = estabelecimentosArray.filter(item => {
        // A lógica de filtro de UF precisa ser robusta para diferentes formatos de campo UF
        let ufItem = String(item.codigo_uf || item.uf || '').trim(); // 'codigo_uf' (CNES), 'uf' (Hosp, UBS)
        if (/^\d+$/.test(ufItem)) { // Se for numérico
            return ufItem === CODIGO_UF_MA_STR;
        }
        return ufItem.toUpperCase() === 'MA';
    });
    console.info(`🔎 Encontrados ${estabelecimentosArray.length} registros brutos, ${dadosDoMaranhao.length} são do Maranhão em ${filePath}. Formatando...`);
    
    if(dadosDoMaranhao.length === 0 && estabelecimentosArray.length > 0) {
        console.warn(`[SEED] Nenhum registro do Maranhão encontrado em ${filePath}, apesar de haver ${estabelecimentosArray.length} registros no arquivo. Verifique o campo UF e o filtro.`);
    }

    const formattedData = dadosDoMaranhao.map(item => formatarApiItemParaPrismaSeed(item, fonteDeDados)).filter(item => item !== null);
    console.info(`✨ ${formattedData.length} registros do Maranhão formatados com sucesso de ${filePath}.`);
    return formattedData;
}

async function seedEstabelecimentosSaude() {
    console.log('🌱 Iniciando seed de Estabelecimentos de Saúde...');
    let todosOsDadosFormatadosColetados = [];

    // Adicionando os novos arquivos CDS.JSON e UPAS.JSON
    const caminhosDosArquivos = [
        { filePath: path.resolve(__dirname, '..', '..', 'data', 'estabelecimentos.JSON'), fonte: FonteDados.CNES },
        { filePath: path.resolve(__dirname, '..', '..', 'data', 'hospitais-e-leitos.JSON'), fonte: FonteDados.API_HOSPITAIS },
        { filePath: path.resolve(__dirname, '..', '..', 'data', 'unidade-basicas-de-saude.JSON'), fonte: FonteDados.API_UBS },
        { filePath: path.resolve(__dirname, '..', '..', 'data', 'CDS.JSON'), fonte: FonteDados.CNES }, // Assumindo que CDS vem do CNES
        { filePath: path.resolve(__dirname, '..', '..', 'data', 'UPAS.JSON'), fonte: FonteDados.CNES }, // Assumindo que UPAS vem do CNES
    ];

    for (const infoArquivo of caminhosDosArquivos) {
        const dadosDoArquivo = await processJsonFile(infoArquivo.filePath, infoArquivo.fonte);
        if (dadosDoArquivo.length > 0) {
            todosOsDadosFormatadosColetados.push(...dadosDoArquivo);
        }
    }
    
    if (todosOsDadosFormatadosColetados.length === 0) {
        console.warn('⚠️ Nenhum estabelecimento válido para o upsert em lote após processar todos os arquivos.');
        return { count: 0 };
    }

    const dadosUnicosMap = new Map();
    todosOsDadosFormatadosColetados.forEach(data => {
        if (data && data.idCnes) {
            dadosUnicosMap.set(data.idCnes, data); 
        } else {
            console.warn("[SEED] Item formatado sem idCnes durante a desduplicação, não pode ser inserido:", data);
        }
    });
    
    const dadosFinaisParaUpsert = Array.from(dadosUnicosMap.values());

    if (dadosFinaisParaUpsert.length === 0) {
        console.warn('⚠️ Nenhum estabelecimento único válido para o upsert após desduplicação.');
        return { count: 0 };
    }
    
    const operacoesUpsertPrisma = dadosFinaisParaUpsert
        .map(data => {
            if (!data || !data.idCnes) return null;
            const { localizacao, contato, leitos, acessibilidade, servicos, ...camposPrincipais } = data;
            
            const createPayload = { ...camposPrincipais };
            const updatePayload = { ...camposPrincipais };

            // Correção para `localizacao` e `contato` (obrigatórios)
            createPayload.localizacao = localizacao || {}; 
            updatePayload.localizacao = { set: localizacao || {} };
            
            createPayload.contato = contato || { redesSociais: [] }; 
            updatePayload.contato = { set: contato || { redesSociais: [] } };

            if (leitos) { createPayload.leitos = leitos; updatePayload.leitos = { set: leitos }; }
            else if (data.hasOwnProperty('leitos') && leitos === null) { updatePayload.leitos = null; }

            if (acessibilidade) { createPayload.acessibilidade = acessibilidade; updatePayload.acessibilidade = { set: acessibilidade }; }
            else if (data.hasOwnProperty('acessibilidade') && acessibilidade === null) { updatePayload.acessibilidade = null;}

            createPayload.servicos = (servicos && Array.isArray(servicos)) ? servicos : []; 
            updatePayload.servicos = { set: (servicos && Array.isArray(servicos)) ? servicos : [] };
            
            return prisma.estabelecimentoSaude.upsert({
                where: { idCnes: data.idCnes }, 
                create: createPayload,
                update: updatePayload,
            });
        }).filter(op => op !== null);


    if (operacoesUpsertPrisma.length === 0) {
        console.warn('⚠️ Nenhuma operação de upsert válida foi criada.');
        return { count: 0 };
    }

    console.log(`⏳ Realizando upsert em lote de ${operacoesUpsertPrisma.length} estabelecimentos únicos...`);
    
    try {
        const batchSize = 50; 
        let operacoesRealizadasCount = 0;
        for (let i = 0; i < operacoesUpsertPrisma.length; i += batchSize) {
            const batchOps = operacoesUpsertPrisma.slice(i, i + batchSize);
            console.log(`   Processando lote ${Math.floor(i/batchSize) + 1} com ${batchOps.length} operações...`);
            const resultadosBatch = await prisma.$transaction(batchOps);
            operacoesRealizadasCount += resultadosBatch.length; 
            console.log(`   Lote concluído, ${resultadosBatch.length} operações no lote.`);
        }
        console.log(`✅ Total de ${operacoesRealizadasCount} estabelecimentos de saúde criados/atualizados.`);
        return { count: operacoesRealizadasCount };
    } catch (e) {
        console.error('❌ Erro durante o $transaction do seed de EstabelecimentoSaude:', e);
        const loteComErroIndex = Math.floor(operacoesRealizadasCount / batchSize);
        const itensDoLoteComErro = operacoesUpsertPrisma.slice(loteComErroIndex * batchSize, (loteComErroIndex + 1) * batchSize);
        if (itensDoLoteComErro && itensDoLoteComErro.length > 0 && itensDoLoteComErro[0]) {
            console.error('Primeiro item do lote com erro (payload de criação):', JSON.stringify(itensDoLoteComErro[0].create, null, 2));
        } else {
            console.error('Não foi possível identificar o primeiro item do lote com erro.');
        }
        throw e; 
    }
}

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');
  try {
    console.warn("ℹ️ Seed para 'OrgaoPublico' e 'Saude' (serviços) está comentado. Descomente se necessário e se os modelos existirem no schema.");
  } catch(error) {
      console.warn("⚠️ Erro ao tentar popular OrgaoPublico ou Saude (no início do main). Verifique se os modelos e campos 'where' são válidos:", error.message);
  }
  
  await seedEstabelecimentosSaude();

  console.log('🎉 Seed finalizado!');
}

main()
    .catch(e => {
        console.error("❌ Erro fatal no processo de seed:", e.message); 
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });