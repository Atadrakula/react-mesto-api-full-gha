require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  process.env.PORT = '3001';
  process.env.NODE_ENV = 'development';
  process.env.JWT_SECRET = 'dev-secret';
  process.env.DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
}

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const { errorHandler, celebrateError } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routers = require('./routes');

const { PORT, DB_URL } = process.env;
const app = express();

app.use(cors);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Пришел запрос: ${req.method} ${req.url}`);
  next();
});
app.use(express.json());

app.use(requestLogger);

app.use(routers);

app.use(errorLogger);

app.use(celebrateError);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
