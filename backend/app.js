require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler, celebrateError } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');

const routers = require('./routes');

const { PORT, DB_URL } = process.env;
const app = express();

// app.use(cors());
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://web.portfolio.nomoreparties.co'], credentials: true, maxAge: 30 }));

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
