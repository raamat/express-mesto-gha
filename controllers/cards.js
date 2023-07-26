const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.cardDelete = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        next({ message: 'Нет карточки с указанным id' });
      }
      if (card.ownwer.toString() !== req.user._id) {
        next({ message: 'Запрещено удалять чужие карточки' });
      }

      return Card.deleteOne(card)
        .then(() => {
          res.send({ message: 'Карточка успешно удалена' });
        });
    })
    .catch(next);
};
