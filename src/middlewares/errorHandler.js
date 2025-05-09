export default (err, req, res, next) => {
    console.error(err.stack);  // Log do erro
    res.status(err.status || 500).json({
    message: err.message || 'Erro interno do servidor',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,  // Exibe o stacktrace apenas em ambiente de desenvolvimento
    });  };
