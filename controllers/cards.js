const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка в работе сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка в введенных данных' });
      }
      res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
    });
};

module.exports.cardDelete = (req, res, next) => {
  const { id } = req.params;

  return Card.findById(id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет карточки с указанным id' });
      }
      if (card.ownwer.toString() !== req.user._id) {
        next({ message: 'Запрещено удалять чужие карточки' });
      }

      return Card.deleteOne(card)
        .then(() => {
          res.status(200).send({ message: 'Карточка успешно удалена' });
        });
    })
    .catch(next);
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет карточки с указанным id' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка в введенных данных' });
      }
      res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет карточки с указанным id' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка в введенных данных' });
      }
      res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
    });
};
