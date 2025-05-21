import { createClient } from 'redis';

// Configuração robusta do cliente Redis
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379', // Prefira 127.0.0.1 em vez de localhost
  socket: {
    reconnectStrategy: (retries) => {
      // Tentar reconectar até 5 vezes com intervalo exponencial
      if (retries > 5) {
        console.log('Número máximo de tentativas de reconexão alcançado');
        return new Error('Max retries reached');
      }
      return Math.min(retries * 100, 5000); // Intervalo entre tentativas
    },
    connectTimeout: 5000 // Timeout de conexão de 5 segundos
  }
});

// Tratamento de erros avançado
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
  
  // Para erros específicos de conexão
  if (err.code === 'ECONNREFUSED') {
    console.error('Não foi possível conectar ao servidor Redis');
    // Aqui você pode adicionar lógica de fallback ou notificação
  }
});

// Conexão com tratamento de erro explícito
(async () => {
  try {
    await redisClient.connect();
    console.log('Conectado ao Redis com sucesso');
    
    // Teste a conexão
    const pingResponse = await redisClient.ping();
    console.log('Ping Redis:', pingResponse);
  } catch (err) {
    console.error('Falha ao conectar ao Redis:', err);
    // Process.exit(1) se o Redis for crítico para sua aplicação
  }
})();

// Exporta o cliente e uma função para verificar a conexão
export const getRedisClient = () => redisClient;

export const checkRedisConnection = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    return await redisClient.ping() === 'PONG';
  } catch (err) {
    console.error('Verificação de conexão Redis falhou:', err);
    return false;
  }
};

export default redisClient;