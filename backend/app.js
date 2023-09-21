require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

const { regexLink, MONGODB_URL } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require("./errors/not-found-error");

const { PORT = 3000 } = process.env;

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://mestokd.students.nomoredomainsrocks.ru',
      'http://mestokd.students.nomoredomainsrocks.ru',
    ],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regexLink),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(auth);

app.use(routerUsers);
app.use(routerCards);

app.use('*', (req, res, next) => {
  return next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);


app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
