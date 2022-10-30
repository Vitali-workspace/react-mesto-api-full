const allowedCors = [
  'https://mestoproject.vitali.nomoredomains.icu',
  'https://api.mestoproject.vitali.nomoredomains.icu',
  'http://mestoproject.vitali.nomoredomains.icu',
  'http://api.mestoproject.vitali.nomoredomains.icu',
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'localhost:3000',
];

module.exports = function (req, res, next) {
  const { origin } = req.headers;
  // обрабатываем простой cors запрос
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  // обрабатываем предварительный cors запрос
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
    return;
  }

  next();
}; 
