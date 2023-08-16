const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Ошибка в введеных данных'));
      }
      next(err);
    });
};

module.exports.cardDelete = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Нет карточки с указанным id'));
      }
      if (String(card.owner) !== req.user._id) {
        return next(new ForbiddenError('Запрещено удалять чужие карточки'));
      }

      return Card.deleteOne(card).then(() => {
        res.status(200).send({ message: 'Карточка успешно удалена' });
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return next(new BadRequestError('Ошибка в введеных данных'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Нет карточки с указанным id'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return next(new BadRequestError('Ошибка в введеных данных'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Нет карточки с указанным id'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return next(new BadRequestError('Ошибка в введеных данных'));
      }
      next(err);
    });
};
