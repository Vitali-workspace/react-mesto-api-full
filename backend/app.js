const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const authentication = require('./routes/authentication');
const requestCors = require('./middlewares/requestCors');
const auth = require('./middlewares/auth');
const PageNotFoundError = require('./errors/PageNotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');


const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.use(requestCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// тестовая функция для падения приложения
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', authentication);
app.use(auth);
app.use(routerUsers);
app.use(routerCards);

app.use((req, res, next) => {
  next(new PageNotFoundError('Запрошенные данные не найдены'));
});

app.use(errorLogger);

// обработка ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(
    { message: statusCode === 500 ? 'На сервере произошла ошибка' : message },
  );
  next();
});

app.listen(PORT, () => {
  console.log(`App работает в порте ${PORT}`);
});
