import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100,  // Limite de 100 requisições por IP
    message: 'Muitas requisições, por favor tente novamente mais tarde.',
});

export default limiter;
