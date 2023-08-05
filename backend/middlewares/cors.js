const allowedCors = [
  'https://web.portfolio.nomoreparties.co',
  'localhost:3000',
];

// const allowedHeaders = [
//   'Content-Type',
//   'Origin',
//   'Accept',
//   'Authorization',
//   'Access-Control-Request-Method',
//   'Access-Control-Request-Headers'
// ];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими методами
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.status(200).end();
  }
  return next();
};
