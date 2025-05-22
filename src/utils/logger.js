// src/utils/logger.js
import winston from 'winston';
import fs from 'fs'; // Movido para o topo
import path from 'path'; // Adicionado para caminhos de log mais robustos

// Para __dirname em ES modules, se necessário para construir caminhos absolutos para logs
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const logsDir = path.resolve(__dirname, '..', '..', 'logs'); // Exemplo: ../../logs a partir de src/utils

const logsDir = 'logs'; // Caminho relativo à raiz do projeto

const { combine, timestamp, printf, errors, json, colorize, simple } = winston.format;

// Formato do log para console e arquivos
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Criar a pasta de logs se não existir
if (!fs.existsSync(logsDir)) {
  try {
    fs.mkdirSync(logsDir, { recursive: true }); // recursive: true para criar diretórios pais se necessário
  } catch (e) {
    console.error("Falha ao criar diretório de logs:", e);
    // Considerar lançar o erro ou ter um fallback se o logging em arquivo for crítico
  }
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Formato de timestamp mais legível
    errors({ stack: true }), // Para logar o stack trace dos erros
    json() // Formato JSON para arquivos de log (bom para processamento)
  ),
  defaultMeta: { service: 'api-governo-integrado' }, // Meta default para todos os logs
  transports: [
    new winston.transports.File({ 
        filename: path.join(logsDir, 'error.log'), 
        level: 'error',
        format: combine(logFormat) // Formato mais legível para arquivos também
    }),
    new winston.transports.File({ 
        filename: path.join(logsDir, 'combined.log'),
        format: combine(logFormat) 
    })
  ],
  exceptionHandlers: [ // Captura exceções não tratadas
    new winston.transports.File({ filename: path.join(logsDir, 'exceptions.log') })
  ],
  rejectionHandlers: [ // Captura rejeições de Promises não tratadas
    new winston.transports.File({ filename: path.join(logsDir, 'rejections.log') })
  ]
});

// Se não estiver em produção, adicionar log no console com formato mais simples e colorido
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: 'HH:mm:ss' }),
      printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
      })
    ),
    level: 'debug', // Logar mais em desenvolvimento
  }));
} else {
    // Em produção, o console pode ter um formato mais simples ou ser removido
    // se os logs em arquivo forem suficientes.
     logger.add(new winston.transports.Console({
        format: combine(
            colorize(),
            simple()
        ),
        level: 'info',
    }));
}


// Definição do stream para o Morgan usar
// O Morgan espera um objeto com um método `write`
export const stream = {
  write: (message) => {
    // Usa o nível 'http' do Winston (ou 'info' se 'http' não estiver configurado nos levels)
    // O Morgan já remove o newline no final da string da mensagem.
    logger.http(message.trim()); 
  },
};