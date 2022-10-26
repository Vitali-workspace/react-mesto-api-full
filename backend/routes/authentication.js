const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const regUrl = require('../utils/validationLink');


router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().invalid(null, '').required().email(),
    password: Joi.string().invalid(null, '').required(),
  }),
}), login);


router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regUrl),
    email: Joi.string().invalid(null, '').required().email(),
    password: Joi.string().invalid(null, '').required(),
  }),
}), createUser);

module.exports = router;
