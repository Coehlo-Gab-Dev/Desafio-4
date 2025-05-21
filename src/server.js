import { connectMongoose } from './config/database.js';
import app from './app.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3000;

// Configuração de shutdown gracioso
const shutdown = async (signal) => {
  logger.info(`Recebido sinal ${signal}. Iniciando shutdown gracioso...`);
  
  try {
    // Adicione aqui qualquer limpeza necessária
    process.exit(0);
  } catch (error) {
    logger.error('Erro durante shutdown:', error);
    process.exit(1);
  }
};

// Conexão com o banco e inicialização do servidor
const startServer = async () => {
  try {
    await connectMongoose();
    
    const server = app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`);
      logger.info(`Modo: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Documentação: http://localhost:${PORT}/api-docs`);
    });

    // Tratamento de sinais para shutdown gracioso
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    
    // Tratamento de erros não capturados
    process.on('uncaughtException', (error) => {
      logger.error('Exceção não capturada:', error);
      shutdown('UNCAUGHT_EXCEPTION');
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Rejeição não tratada em:', promise, 'Motivo:', reason);
      shutdown('UNHANDLED_REJECTION');
    });

    return server;
  } catch (error) {
    logger.error('Falha ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Inicialização do servidor
startServer().catch(error => {
  logger.error('Erro crítico durante inicialização:', error);
  process.exit(1);
});