const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const PageNotFoundError = require('../errors/PageNotFoundError');
const BadRequestError = require('../errors/BadRequestError');


module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};


module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('ошибка в запросе'));
      } else {
        next(err);
      }
    });
};


module.exports.deleteCardOnId = (req, res, next) => {
  const id = req.params.cardId;
  const owner = req.user._id;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        next(new PageNotFoundError('Запрошенный id не найден'));
        return;
      }

      if (owner === card.owner.toString()) {
        Card.findByIdAndRemove(id)
          .then((item) => res.send(item))
          .catch(next);
        return;
      }

      next(new ForbiddenError('Нет прав на удаление карточки'));
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('ошибка в запросе'));
      } else {
        next(err);
      }
    });
};


module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        return next(new PageNotFoundError('Карточка не найдена'));
      }
      return res.send({ data: like });
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('ошибка в запросе'));
      } else {
        next(err);
      }
    });
};


module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        return next(new PageNotFoundError('Карточка не найдена'));
      }
      return res.send({ data: like });
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('ошибка в запросе'));
      } else {
        next(err);
      }
    });
};
