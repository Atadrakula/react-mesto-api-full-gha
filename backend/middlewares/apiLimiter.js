const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // лимит: 100 запросов/IP
  message: 'Слишком много запросов с этого IP, пожалуйста, попробуйте снова через 15 минут.',
});
