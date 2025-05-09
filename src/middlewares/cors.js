import cors from 'cors';

export default cors({
  origin: 'http://localhost:3000',  // Porta onde seu frontend está
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
