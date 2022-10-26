const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const PageNotFoundError = require('../errors/PageNotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { tokenSecret = 'dev-secret-key' } = process.env;


module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};


module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((id) => {
      if (!id) {
        next(new PageNotFoundError('Запрошенный id не найден'));
        return;
      }
      res.send({ data: id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('ошибка в запросе'));
      } else {
        next(err);
      }
    });
};


module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((newUser) => {
          const { _id } = newUser;
          res.send({ name, about, avatar, email, _id });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('этот email уже существует'));
            return;
          }

          if (err.name === 'ValidationError') {
            next(new BadRequestError('ошибка в запросе'));
          } else {
            next(err);
          }
        });
    }).catch(next);
};


module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('ошибка в запросе'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('не удалось получить данные'));
      } else {
        next(err);
      }
    });
};


module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => {
      res.send({ data: newAvatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('ошибка в запросе'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('не удалось получить данные'));
      } else {
        next(err);
      }
    });
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, tokenSecret, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
      res.send({ token });
    }).catch(next);
};


module.exports.getMyUser = (req, res, next) => {
  const myId = req.user._id;

  User.findById(myId)
    .then((user) => {
      if (!user) {
        next(new PageNotFoundError('Запрошенный пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};
