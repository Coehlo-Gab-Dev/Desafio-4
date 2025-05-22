import { logger } from '../utils/logger.js';
import { validationResult } from 'express-validator'; // <<< ADICIONADO: Import para express-validator

// Constantes de código de erro (você pode centralizá-las se preferir)
const CODIGO_ERRO_VALIDACAO = 'ERRO_VALIDACAO';
const CODIGO_ERRO_INTERNO = 'INTERNAL_SERVER_ERROR'; // Mantendo o padrão do seu código

// Middleware principal de tratamento de erros
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isProduction = process.env.NODE_ENV === 'production';
    const isOperationalError = err.isOperational || false;

    // Log detalhado do erro
    logger.error({
        message: err.message,
        ...(!isProduction && { stack: err.stack, fullError: err }),
        request: {
            method: req.method,
            url: req.originalUrl,
            params: req.params,
            query: req.query,
            body: Object.keys(req.body).length > 0 ? req.body : undefined,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        },
        statusCode,
        timestamp: new Date().toISOString(),
        requestId: req.id || null // Adicionado requestId ao log principal do erro
    });

    // Resposta formatada
    const errorResponse = {
        success: false,
        error: {
            code: err.code || CODIGO_ERRO_INTERNO,
            message: isProduction && !isOperationalError
                ? 'Ocorreu um erro inesperado no servidor.'
                : err.message,
            // Detalhes e stack apenas em ambiente de não produção para segurança
            ...(!isProduction && {
                details: err.details,
                stack: err.stack, // Stack pode ser muito verboso, considere remover se não for útil
                type: err.name
            })
        },
        metadata: {
            timestamp: new Date().toISOString(),
            requestId: req.id || null,
            path: req.originalUrl,
            ...(err.metadata && { ...err.metadata })
        }
    };

    // Para erros não operacionais em produção, pode ser uma boa prática encerrar
    // o processo para evitar comportamento indefinido (se configurado para isso).
    // No seu código original, você já tinha essa lógica.
    if (!isOperationalError && isProduction && statusCode >= 500) {
        // Considere se 'process.exit(1)' é a estratégia desejada para todos os erros 500 não operacionais.
        // Em algumas arquiteturas, permite-se que o orquestrador de contêineres reinicie o processo.
        logger.fatal('Erro fatal não operacional detectado em produção. O processo pode ser reiniciado dependendo da configuração do ambiente.', { errorName: err.name });
        // process.exit(1); // Removido para evitar paradas abruptas, a menos que seja uma política estrita.
    }

    res.status(statusCode).json(errorResponse);
};

// Validação flexível de localização (MA + municípios) - Mantida
const validarLocalizacao = (req, res, next) => {
    const { municipio, estado } = req.query;

    if (!municipio && !estado) {
        req.validatedParams = { estado: 'MA', municipio: null };
        return next();
    }

    if (estado && estado.toUpperCase() !== 'MA') {
        const err = new Error('Somente o estado do Maranhão (MA) é suportado.');
        err.statusCode = 400;
        err.code = CODIGO_ERRO_VALIDACAO;
        err.isOperational = true;
        // Em vez de throw, que seria pego pelo errorHandler global,
        // para erros de validação é comum responder diretamente ou chamar next(err).
        // Para consistência com checkValidationResult, responderemos diretamente:
        return res.status(err.statusCode).json({
             success: false,
             error: { code: err.code, message: err.message },
             metadata: { timestamp: new Date().toISOString(), requestId: req.id || null, path: req.originalUrl }
        });
        // Ou, se quiser usar o errorHandler global: return next(err);
    }

    let municipioNormalizado = null;
    if (municipio) {
        municipioNormalizado = municipio
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    req.validatedParams = { estado: 'MA', municipio: municipioNormalizado };
    next();
};

// Função para validar parâmetros genéricos (opcional) - Mantida
const validarParametros = (req, res, next) => {
    req.validatedParams = {
        ...req.validatedParams,
        id: req.params.id || req.query.id || null
    };
    next();
};

// Validação condicional genérica (mantida) - Mantida
const validarParametrosCondicional = (campo, obrigatorio = false) => {
    return (req, res, next) => {
        const valorCampo = req.params[campo] || req.query[campo] || req.body[campo]; // Adicionado req.body

        if (obrigatorio && (valorCampo === undefined || valorCampo === null || valorCampo === '')) {
            const err = new Error(`Parâmetro ${campo} é obrigatório.`);
            err.statusCode = 400;
            err.code = CODIGO_ERRO_VALIDACAO;
            err.isOperational = true;
            // Mesma observação de validarLocalizacao sobre responder diretamente ou next(err)
            return res.status(err.statusCode).json({
                success: false,
                error: { code: err.code, message: err.message, detalhes: { campo } },
                metadata: { timestamp: new Date().toISOString(), requestId: req.id || null, path: req.originalUrl }
            });
            // Ou: return next(err);
        }

        if (!req.validatedParams) {
          req.validatedParams = {};
        }
        req.validatedParams[campo] = valorCampo === undefined ? null : valorCampo;
        
        next();
    };
};

// Middleware para checar os resultados da validação do express-validator
export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Usando uma estrutura de resposta similar ao seu errorHandler principal
        // para consistência.
        return res.status(400).json({
            success: false,
            error: {
                code: CODIGO_ERRO_VALIDACAO,
                message: 'Um ou mais parâmetros da requisição são inválidos.',
                details: errors.array().map(err => ({
                    tipo: err.type,
                    valor: err.value, // Valor que causou o erro
                    mensagem: err.msg, // Mensagem de erro definida no validador
                    campo: err.path,   // Nome do campo que falhou na validação
                    localizacao: err.location // Onde o parâmetro foi encontrado (body, query, params)
                }))
            },
            metadata: {
                timestamp: new Date().toISOString(),
                requestId: req.id || null, // Adiciona requestId se disponível
                path: req.originalUrl
            }
        });
    }
    next(); // Se não houver erros, prossegue para o próximo middleware/controller
};


// Exportando todas as funções
export const responderErro = errorHandler; // Alias para o errorHandler principal
export { 
    validarParametros,              // Sua função original com este nome
    validarParametrosCondicional, 
    validarLocalizacao,
    // checkValidationResult       // << JÁ EXPORTADO ACIMA COM 'export const'
};
export default errorHandler; // Exporta o errorHandler como default