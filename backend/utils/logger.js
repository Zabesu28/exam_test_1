const pino = require('pino');

// En dev → logs jolis en couleur
// En prod (Render, Docker, etc.) → JSON pur pour parsing facile (ELK, Datadog, etc.)
const logger = pino({
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        }
      : undefined, // en prod → JSON brut (meilleur perf)
});

module.exports = logger;