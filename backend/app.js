const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

const { regexLink } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors({ origin: 'http://mestokd.students.nomoredomainsrocks.ru' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regexLink),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(auth);

app.use(routerUsers);
app.use(routerCards);

app.use(errorLogger);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Страница не найдена' });
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
